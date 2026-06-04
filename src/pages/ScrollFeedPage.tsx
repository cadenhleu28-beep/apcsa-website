import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, RefreshCw, Home, Sparkles, LogIn } from "lucide-react";
import { mcqBank } from "../data/mcqBank";
import type { MCQQuestion, AnswerLetter } from "../types/mcq";
import { useAuth } from "../context/AuthContext";
import {
  backfillSubUnitAttempts,
  loadAttempts,
  pickPersonalizedSession,
  recordAttempt,
  isColdStart,
} from "../lib/attempts";

const SESSION_SIZE = 15;

// ── Helpers ──────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const ALL_QUESTIONS = mcqBank.flatMap((u) => u.topics.flatMap((t) => t.questions));

function randomSession(): MCQQuestion[] {
  return shuffle(ALL_QUESTIONS).slice(0, SESSION_SIZE);
}

// Resolve to `fallback` after `ms` so a slow or unreachable backend (e.g. a
// paused free-tier database) can never leave the feed stuck on its loader.
function withTimeout<T>(p: Promise<T>, ms: number, fallback: T): Promise<T> {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (v: T) => {
      if (!settled) {
        settled = true;
        resolve(v);
      }
    };
    const id = setTimeout(() => finish(fallback), ms);
    p.then((v) => {
      clearTimeout(id);
      finish(v);
    }).catch(() => {
      clearTimeout(id);
      finish(fallback);
    });
  });
}

function splitExplanation(text: string): string[] {
  const parts = text
    .split(/(?<=[.!?])\s+(?=[A-Z"'(])/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length > 1 ? parts : [text];
}

// ── Java syntax highlighting (defensive, lightweight) ────────────────

const JAVA_KEYWORDS = new Set([
  "public",
  "private",
  "protected",
  "static",
  "final",
  "abstract",
  "void",
  "int",
  "double",
  "boolean",
  "char",
  "long",
  "float",
  "short",
  "byte",
  "String",
  "if",
  "else",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "break",
  "continue",
  "return",
  "new",
  "class",
  "interface",
  "extends",
  "implements",
  "this",
  "super",
  "true",
  "false",
  "null",
  "import",
  "package",
  "try",
  "catch",
  "finally",
  "throws",
  "throw",
]);

function highlightJava(code: string): JSX.Element[] {
  // Tokenize line by line so comments don't bleed across lines.
  const lines = code.split("\n");
  const out: JSX.Element[] = [];

  lines.forEach((line, lineIdx) => {
    const tokens: JSX.Element[] = [];
    let i = 0;
    let key = 0;
    while (i < line.length) {
      // Line comment
      if (line[i] === "/" && line[i + 1] === "/") {
        tokens.push(
          <span key={key++} className="token-comment">
            {line.slice(i)}
          </span>,
        );
        i = line.length;
        break;
      }
      // String literal
      if (line[i] === '"') {
        let j = i + 1;
        while (j < line.length && line[j] !== '"') {
          if (line[j] === "\\" && j + 1 < line.length) j += 2;
          else j++;
        }
        j = Math.min(j + 1, line.length);
        tokens.push(
          <span key={key++} className="token-string">
            {line.slice(i, j)}
          </span>,
        );
        i = j;
        continue;
      }
      // Char literal
      if (line[i] === "'") {
        let j = i + 1;
        while (j < line.length && line[j] !== "'") {
          if (line[j] === "\\" && j + 1 < line.length) j += 2;
          else j++;
        }
        j = Math.min(j + 1, line.length);
        tokens.push(
          <span key={key++} className="token-string">
            {line.slice(i, j)}
          </span>,
        );
        i = j;
        continue;
      }
      // Number
      if (/[0-9]/.test(line[i])) {
        let j = i;
        while (j < line.length && /[0-9.]/.test(line[j])) j++;
        tokens.push(
          <span key={key++} className="token-number">
            {line.slice(i, j)}
          </span>,
        );
        i = j;
        continue;
      }
      // Identifier / keyword
      if (/[A-Za-z_$]/.test(line[i])) {
        let j = i;
        while (j < line.length && /[A-Za-z0-9_$]/.test(line[j])) j++;
        const word = line.slice(i, j);
        if (JAVA_KEYWORDS.has(word)) {
          tokens.push(
            <span key={key++} className="token-keyword">
              {word}
            </span>,
          );
        } else {
          tokens.push(<span key={key++}>{word}</span>);
        }
        i = j;
        continue;
      }
      // Default: single char
      tokens.push(<span key={key++}>{line[i]}</span>);
      i++;
    }
    out.push(
      <div key={lineIdx} className="whitespace-pre">
        {tokens.length > 0 ? tokens : " "}
      </div>,
    );
  });

  return out;
}

/**
 * Parse an explanation string into prose + code segments.
 * Recognises triple-backtick fences (``` or ```java) as code blocks.
 * Falls back to a heuristic for "looks like a code chunk" lines
 * (lines with `;` and `{` or that start with java keywords). Most existing
 * explanations are plain prose so this returns a single prose segment.
 */
type Segment = { type: "prose"; text: string } | { type: "code"; text: string };

function parseExplanation(raw: string): Segment[] {
  const segments: Segment[] = [];

  // First pass: extract triple-backtick code fences.
  const fenceRegex = /```(?:java)?\n?([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const pieces: Segment[] = [];

  while ((match = fenceRegex.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      pieces.push({
        type: "prose",
        text: raw.slice(lastIndex, match.index).trim(),
      });
    }
    pieces.push({ type: "code", text: match[1].replace(/\n$/, "") });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < raw.length) {
    pieces.push({ type: "prose", text: raw.slice(lastIndex).trim() });
  }

  // Filter out empty prose pieces.
  for (const p of pieces) {
    if (p.type === "prose" && !p.text) continue;
    segments.push(p);
  }

  return segments.length > 0 ? segments : [{ type: "prose", text: raw }];
}

// ── Card component ──────────────────────────────────────────────────

interface CardState {
  question: MCQQuestion;
  selected: AnswerLetter | null;
  /** "question" or "explanation" — current horizontal view */
  view: "question" | "explanation";
}

interface CardProps {
  card: CardState;
  onSelectAnswer: (letter: AnswerLetter) => void;
  onSwitchView: (view: "question" | "explanation") => void;
}

const SWIPE_DIST = 80;
const SWIPE_VELOCITY = 500;

function Card({ card, onSelectAnswer, onSwitchView }: CardProps) {
  // Horizontal-only drag for question ↔ explanation. Vertical navigation is
  // handled by the parent's native scroll-snap container — smoother on iOS.
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-600, 0, 600], [0.7, 1, 0.7]);

  const handleHorizontalDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const dx = info.offset.x;
    const vx = info.velocity.x;
    if (
      card.view === "question" &&
      card.selected !== null &&
      (dx > SWIPE_DIST || vx > SWIPE_VELOCITY)
    ) {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 35 });
      onSwitchView("explanation");
      return;
    }
    if (
      card.view === "explanation" &&
      (dx < -SWIPE_DIST || vx < -SWIPE_VELOCITY)
    ) {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 35 });
      onSwitchView("question");
      return;
    }
    animate(x, 0, { type: "spring", stiffness: 400, damping: 35 });
  };

  return (
    <motion.div
      className="absolute inset-0"
      style={{ x, opacity, touchAction: "pan-y" }}
      drag="x"
      dragDirectionLock
      dragElastic={0.2}
      dragMomentum={false}
      onDragEnd={handleHorizontalDragEnd}
    >
      <AnimatePresence mode="wait" initial={false}>
        {card.view === "question" ? (
          <motion.div
            key="q"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0"
          >
            <QuestionView card={card} onSelectAnswer={onSelectAnswer} />
          </motion.div>
        ) : (
          <motion.div
            key="e"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0"
          >
            <ExplanationView card={card} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Question view ───────────────────────────────────────────────────

function QuestionView({
  card,
  onSelectAnswer,
}: {
  card: CardState;
  onSelectAnswer: (letter: AnswerLetter) => void;
}) {
  const { question, selected } = card;

  const answerStyle = (letter: AnswerLetter) => {
    const base =
      "w-full text-left px-4 py-3 rounded-xl border font-mono text-sm flex items-start gap-3 min-h-[48px] transition-all duration-150";
    if (!selected)
      return `${base} border-[#30363d] bg-[#161b22] active:bg-[#1c2128] sm:hover:border-rose-400/60 sm:hover:bg-[#1c2128] sm:cursor-pointer`;
    if (letter === question.answer)
      return `${base} border-[#3fb950] bg-green-900/20 text-[#3fb950]`;
    if (letter === selected)
      return `${base} border-[#ff7b72] bg-red-900/20 text-[#ff7b72]`;
    return `${base} border-[#30363d] bg-[#161b22] opacity-40`;
  };

  return (
    <div className="absolute inset-0 flex justify-center select-none">
      <div className="w-full max-w-md sm:max-w-2xl flex flex-col px-5 pt-16 pb-6 sm:pb-20">
      {/* Top — question + optional code (40% of screen) */}
      <div className="flex-[2] min-h-0 overflow-y-auto no-scrollbar">
        <h2 className="text-lg sm:text-xl font-medium text-[#e6edf3] leading-snug mb-4">
          {question.question}
        </h2>
        {question.code && (
          <pre className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 text-xs sm:text-sm font-mono text-[#e6edf3] overflow-x-auto leading-relaxed">
            <code>{highlightJava(question.code)}</code>
          </pre>
        )}
      </div>

      {/* Bottom — answer choices in thumb-reachable zone (60%) */}
      <div className="flex-[3] flex flex-col justify-end gap-2.5 relative">
        {question.options.map((opt) => (
          <button
            key={opt.letter}
            onClick={() => !selected && onSelectAnswer(opt.letter)}
            disabled={!!selected}
            className={answerStyle(opt.letter)}
          >
            <span className="font-bold shrink-0">{opt.letter}.</span>
            <span className="leading-snug">{opt.text}</span>
          </button>
        ))}

        {/* Explanation pulse hint */}
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: [0, 6, 0] }}
            transition={{
              opacity: { duration: 0.4 },
              x: { repeat: Infinity, duration: 1.4, ease: "easeInOut" },
            }}
            className="absolute -bottom-1 right-0 translate-y-full mt-3 pt-3 flex items-center gap-1 text-xs font-mono text-rose-400"
          >
            Explanation
            <ChevronRight size={14} />
          </motion.div>
        )}
      </div>
      </div>
    </div>
  );
}

// ── Explanation view ────────────────────────────────────────────────

function ExplanationView({ card }: { card: CardState }) {
  const segments = useMemo(
    () => parseExplanation(card.question.explanation),
    [card.question.explanation],
  );

  return (
    <div className="absolute inset-0 flex justify-center select-none">
      <div className="w-full max-w-md sm:max-w-2xl flex flex-col px-5 pt-16 pb-6 sm:pb-20">
      {/* Topic label only */}
      <p className="text-xs font-mono text-rose-400 uppercase tracking-widest mb-4 shrink-0">
        Unit {card.question.topicId} — {card.question.topicLabel}
      </p>

      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <div className="space-y-3">
          {segments.map((seg, i) =>
            seg.type === "code" ? (
              <pre
                key={i}
                className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 text-xs sm:text-sm font-mono text-[#e6edf3] overflow-x-auto leading-relaxed"
              >
                <code>{highlightJava(seg.text)}</code>
              </pre>
            ) : (
              <div key={i} className="space-y-2">
                {splitExplanation(seg.text).map((sentence, j) => (
                  <p
                    key={j}
                    className="text-sm sm:text-base text-[#e6edf3] leading-relaxed"
                  >
                    {sentence}
                  </p>
                ))}
              </div>
            ),
          )}
        </div>
      </div>

      <p className="text-xs font-mono text-[#6e7681] text-center pt-4 shrink-0">
        <ChevronLeft size={11} className="inline -mt-0.5" /> Swipe back to
        question
      </p>
      </div>
    </div>
  );
}

// ── Results card ────────────────────────────────────────────────────

function ResultsCard({
  correct,
  total,
  onAgain,
  onHome,
}: {
  correct: number;
  total: number;
  onAgain: () => void;
  onHome: () => void;
}) {
  const pct = Math.round((correct / total) * 100);
  const color =
    pct >= 70 ? "text-[#3fb950]" : pct >= 50 ? "text-[#ffa657]" : "text-[#ff7b72]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 flex justify-center select-none"
    >
      <div className="w-full max-w-md sm:max-w-2xl flex flex-col px-5 pt-16 pb-6 sm:pb-20">
      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-xs font-mono text-rose-400 uppercase tracking-widest mb-4">
          Session complete
        </p>
        <div className="text-7xl font-bold mb-3">
          <span className={color}>{correct}</span>
          <span className="text-[#30363d]"> / </span>
          <span className="text-[#8b949e]">{total}</span>
        </div>
        <p className="text-lg font-mono text-[#8b949e]">{pct}% correct</p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onAgain}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-rose-500 hover:bg-rose-400 active:bg-rose-600 font-semibold text-white transition-colors duration-150 min-h-[48px]"
        >
          <RefreshCw size={16} />
          Try Another 15
        </button>
        <button
          onClick={onHome}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[#30363d] bg-[#161b22] active:bg-[#1c2128] font-semibold text-[#e6edf3] transition-all duration-150 min-h-[48px]"
        >
          <Home size={16} />
          Back to Home
        </button>
      </div>
      </div>
    </motion.div>
  );
}

// ── Main page ───────────────────────────────────────────────────────

export default function ScrollFeedPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [sessionId, setSessionId] = useState(0);
  const [cards, setCards] = useState<CardState[]>([]);
  const [loading, setLoading] = useState(true);
  const [personalized, setPersonalized] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      // Safe default: a working random session even when the backend is slow,
      // unreachable, or empty. Personalization only ever upgrades this.
      let questions: MCQQuestion[] = randomSession();
      let didPersonalize = false;

      if (user) {
        try {
          const attempts = await withTimeout(
            (async () => {
              // First-load backfill (no-op after first run)
              await backfillSubUnitAttempts(user.id);
              return loadAttempts(user.id);
            })(),
            4000,
            [],
          );
          if (!isColdStart(attempts)) {
            questions = pickPersonalizedSession(attempts, SESSION_SIZE);
            didPersonalize = true;
          }
        } catch {
          // Keep the random default — never block the feed on the backend.
        }
      }

      if (cancelled) return;
      setCards(
        questions.map<CardState>((q) => ({
          question: q,
          selected: null,
          view: "question",
        })),
      );
      setPersonalized(didPersonalize);
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading, sessionId]);

  const [index, setIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Results card is the last section in the scroll stack (index === cards.length)
  const showResults = !loading && cards.length > 0 && index >= cards.length;

  // Track the currently-snapped card via IntersectionObserver so the header
  // indicator stays in sync without any scroll listeners (no jank).
  useEffect(() => {
    if (loading || !scrollRef.current || cards.length === 0) return;
    const root = scrollRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.6) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setIndex(idx);
          }
        }
      },
      { root, threshold: [0.6] },
    );
    root.querySelectorAll<HTMLElement>("[data-idx]").forEach((el) =>
      observer.observe(el),
    );
    return () => observer.disconnect();
  }, [loading, cards.length]);

  // Programmatic scroll for keyboard nav / reshuffle
  const scrollToIndex = (i: number, smooth = true) => {
    const el = scrollRef.current?.querySelector<HTMLElement>(
      `[data-idx="${i}"]`,
    );
    el?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  };

  const handleSelectAnswer = (cardIdx: number, letter: AnswerLetter) => {
    setCards((prev) => {
      if (prev[cardIdx].selected) return prev;
      const next = [...prev];
      next[cardIdx] = { ...next[cardIdx], selected: letter };
      const q = next[cardIdx].question;
      if (user) {
        recordAttempt(user.id, q.id, q.topicId, letter === q.answer, "feed");
      }
      return next;
    });
  };

  const handleSwitchView = (
    cardIdx: number,
    view: "question" | "explanation",
  ) => {
    setCards((prev) => {
      const next = [...prev];
      next[cardIdx] = { ...next[cardIdx], view };
      return next;
    });
  };

  // Keyboard navigation (desktop)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key;

      if (key === "ArrowDown") {
        e.preventDefault();
        scrollToIndex(Math.min(index + 1, cards.length));
        return;
      }
      if (key === "ArrowUp") {
        e.preventDefault();
        scrollToIndex(Math.max(index - 1, 0));
        return;
      }
      if (showResults) return;
      const currentIdx = index;
      const current = cards[currentIdx];
      if (!current) return;

      if (key === "ArrowRight") {
        if (current.view === "question" && current.selected) {
          e.preventDefault();
          setCards((prev) => {
            const next = [...prev];
            next[currentIdx] = { ...next[currentIdx], view: "explanation" };
            return next;
          });
        }
        return;
      }
      if (key === "ArrowLeft") {
        if (current.view === "explanation") {
          e.preventDefault();
          setCards((prev) => {
            const next = [...prev];
            next[currentIdx] = { ...next[currentIdx], view: "question" };
            return next;
          });
        }
        return;
      }

      // A / B / C / D answer keys
      const upper = key.toUpperCase();
      if (
        current.view === "question" &&
        !current.selected &&
        (upper === "A" || upper === "B" || upper === "C" || upper === "D")
      ) {
        e.preventDefault();
        const letter = upper as AnswerLetter;
        handleSelectAnswer(currentIdx, letter);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cards, index, showResults]);

  const handleReshuffle = () => {
    setSessionId((id) => id + 1);
    setIndex(0);
  };

  // When a fresh session loads, jump to the first card without animation
  useEffect(() => {
    if (!loading && cards.length > 0) {
      // Wait one frame so the new cards have mounted
      requestAnimationFrame(() => scrollToIndex(0, false));
    }
  }, [sessionId, loading, cards.length]);

  const correctCount = cards.filter(
    (c) => c.selected !== null && c.selected === c.question.answer,
  ).length;

  const showLoading = loading || authLoading;

  return (
    <div
      className="fixed inset-0 bg-[#0d1117] text-[#e6edf3]"
      style={{ height: "100dvh" }}
    >
      {/* Header — fixed so it stays put while user scrolls */}
      <header className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 pb-2 pt-[calc(env(safe-area-inset-top)+0.75rem)]">
        <button
          onClick={() => navigate("/")}
          aria-label="Back to home"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[#161b22]/80 backdrop-blur border border-[#30363d] text-[#e6edf3] active:bg-[#1c2128]"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Position indicator: dots on wider screens, counter on narrow */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#161b22]/80 backdrop-blur border border-[#30363d]">
          {!showResults && cards.length <= 15 ? (
            <>
              <div className="hidden sm:flex gap-1">
                {cards.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      i === index
                        ? "w-3.5 bg-rose-400"
                        : i < index
                          ? "w-1.5 bg-[#8b949e]"
                          : "w-1.5 bg-[#30363d]"
                    }`}
                  />
                ))}
              </div>
              <span className="sm:hidden text-xs font-mono text-[#e6edf3] tabular-nums">
                {index + 1} / {cards.length}
              </span>
            </>
          ) : (
            <span className="text-xs font-mono text-rose-400 tabular-nums">
              {showResults ? "Done" : `${index + 1} / ${cards.length}`}
            </span>
          )}
        </div>

        {/* Right slot: personalization badge or sign-in nudge */}
        {personalized ? (
          <div
            className="flex items-center gap-1 px-2.5 h-9 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-300"
            title="Questions picked based on what you need to practice"
          >
            <Sparkles size={12} />
            <span className="text-[10px] font-mono uppercase tracking-wide">For you</span>
          </div>
        ) : !user && !authLoading ? (
          <button
            onClick={() => navigate("/auth")}
            className="flex items-center gap-1 px-2.5 h-9 rounded-full bg-[#161b22]/80 backdrop-blur border border-[#30363d] text-[#8b949e] hover:text-[#e6edf3] hover:border-[#484f58] transition-colors"
            title="Sign in to get questions tailored to your weak spots"
          >
            <LogIn size={12} />
            <span className="text-[10px] font-mono uppercase tracking-wide">Personalize</span>
          </button>
        ) : (
          <div className="w-9 h-9" aria-hidden />
        )}
      </header>

      {/* Native scroll-snap container — every card snaps into place using
          the browser's own momentum/snap physics. This is the same approach
          TikTok / Instagram Reels use for buttery iOS scrolling. */}
      {showLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-[#6e7681] font-mono text-xs">
            <div className="w-6 h-6 rounded-full border-2 border-[#30363d] border-t-rose-400 animate-spin" />
            <span>{user ? "Picking questions for you…" : "Loading…"}</span>
          </div>
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="absolute inset-0 overflow-y-scroll no-scrollbar"
          style={{
            scrollSnapType: "y mandatory",
            scrollBehavior: "smooth",
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {cards.map((card, i) => (
            <section
              key={`card-${i}`}
              data-idx={i}
              className="relative w-full"
              style={{ height: "100dvh", scrollSnapAlign: "start" }}
            >
              <Card
                card={card}
                onSelectAnswer={(letter) => handleSelectAnswer(i, letter)}
                onSwitchView={(view) => handleSwitchView(i, view)}
              />
            </section>
          ))}
          {cards.length > 0 && (
            <section
              data-idx={cards.length}
              className="relative w-full"
              style={{ height: "100dvh", scrollSnapAlign: "start" }}
            >
              <ResultsCard
                correct={correctCount}
                total={cards.length}
                onAgain={handleReshuffle}
                onHome={() => navigate("/")}
              />
            </section>
          )}
        </div>
      )}

      {/* Desktop keyboard hints */}
      <div className="hidden sm:flex absolute bottom-3 inset-x-0 z-20 justify-center pointer-events-none">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#161b22]/80 backdrop-blur border border-[#30363d] text-[10px] font-mono text-[#6e7681]">
          <span><kbd className="px-1.5 py-0.5 rounded bg-[#21262d] text-[#e6edf3]">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-[#21262d] text-[#e6edf3]">↓</kbd> nav</span>
          <span className="text-[#30363d]">·</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-[#21262d] text-[#e6edf3]">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-[#21262d] text-[#e6edf3]">→</kbd> explain</span>
          <span className="text-[#30363d]">·</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-[#21262d] text-[#e6edf3]">A–D</kbd> answer</span>
        </div>
      </div>
    </div>
  );
}
