import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Eye, EyeOff,
  CheckCircle, XCircle, LogIn, ChevronRight,
} from "lucide-react";
import { allSubUnits, prevSubUnit, nextSubUnit } from "../data/curriculum";
import type { MCQ, ConceptCheck, CodeExample } from "../types/curriculum";
import { useAuth } from "../context/AuthContext";
import { loadAllProgress, saveSubUnitProgress } from "../lib/progress";

// ── Java syntax highlighter ────────────────────────────────────────────────────
const JAVA_KEYWORDS = new Set([
  "public","private","protected","static","final","abstract","class","interface",
  "enum","void","int","double","boolean","char","long","float","byte","short",
  "return","new","this","super","null","true","false","if","else","for","while",
  "do","break","continue","import","package","extends","implements","try","catch",
  "finally","throw","throws","instanceof","switch","case","default","synchronized",
  "volatile","transient","native","strictfp","assert","const","goto",
]);

type TokenType = "keyword" | "string" | "comment" | "number" | "code";
type Token = { type: TokenType; text: string };

const TOKEN_COLORS: Record<TokenType, string> = {
  keyword: "#ff7b72",
  string:  "#a5d6ff",
  comment: "#8b949e",
  number:  "#79c0ff",
  code:    "#e6edf3",
};

function tokenizeJava(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < code.length) {
    if (code[i] === "/" && code[i + 1] === "/") {
      const end = code.indexOf("\n", i);
      const text = end === -1 ? code.slice(i) : code.slice(i, end);
      tokens.push({ type: "comment", text });
      i += text.length;
      continue;
    }
    if (code[i] === '"') {
      let j = i + 1;
      while (j < code.length && code[j] !== '"' && code[j] !== "\n") {
        if (code[j] === "\\") j++;
        j++;
      }
      if (code[j] === '"') j++;
      tokens.push({ type: "string", text: code.slice(i, j) });
      i = j;
      continue;
    }
    if (/[0-9]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[0-9._]/.test(code[j])) j++;
      tokens.push({ type: "number", text: code.slice(i, j) });
      i = j;
      continue;
    }
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);
      tokens.push({ type: JAVA_KEYWORDS.has(word) ? "keyword" : "code", text: word });
      i = j;
      continue;
    }
    tokens.push({ type: "code", text: code[i] });
    i++;
  }
  return tokens;
}

function HighlightedCode({ code }: { code: string }) {
  const tokens = tokenizeJava(code);
  return (
    <>
      {tokens.map((tok, idx) => (
        <span key={idx} style={{ color: TOKEN_COLORS[tok.type] }}>
          {tok.text}
        </span>
      ))}
    </>
  );
}

// ── Code Block ─────────────────────────────────────────────────────────────────
function CodeBlock({ example }: { example: CodeExample }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-md border border-[#30363d]/80 overflow-hidden mb-5"
    >
      {/* IDE title bar */}
      <div className="bg-[#161b22] border-b border-[#30363d]/60 px-4 py-2.5 flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-2 text-xs font-mono text-[#6e7681]">{example.title}</span>
      </div>

      {/* Code */}
      <pre className="bg-[#0d1117] overflow-x-auto px-5 py-4 text-sm font-mono leading-relaxed">
        <code><HighlightedCode code={example.code} /></code>
      </pre>

      {/* Explanation */}
      <div className="bg-[#161b22]/60 border-t border-[#30363d]/60 px-4 py-3">
        <p className="text-sm text-[#8b949e] leading-relaxed">{example.explanation}</p>
      </div>
    </motion.div>
  );
}

// ── Concept Check ──────────────────────────────────────────────────────────────
function ConceptCheckCard({ check }: { check: ConceptCheck }) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-md border border-[#30363d]/80 bg-[#161b22] p-4 mb-3"
    >
      <p className="text-sm font-medium text-[#e6edf3] mb-3 leading-relaxed">{check.prompt}</p>

      {check.code && (
        <pre className="bg-[#0d1117] border border-[#30363d]/60 rounded overflow-x-auto p-3.5 text-sm font-mono leading-relaxed mb-3">
          <code><HighlightedCode code={check.code} /></code>
        </pre>
      )}

      {check.hint && !revealed && (
        <p className="text-xs font-mono text-[#484f58] mb-3">
          Hint: {check.hint}
        </p>
      )}

      <button
        onClick={() => setRevealed((r) => !r)}
        className="flex items-center gap-1.5 text-xs font-mono text-[#58a6ff] hover:text-[#79c0ff] transition-colors"
      >
        {revealed ? <EyeOff size={12} /> : <Eye size={12} />}
        {revealed ? "Hide answer" : "Reveal answer"}
      </button>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded border border-[#3fb950]/25 bg-[#3fb950]/5 p-3.5">
              <pre className="text-sm font-mono text-[#3fb950] whitespace-pre-wrap leading-relaxed">
                {check.answer}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Explanation text splitter ─────────────────────────────────────────────────
// Splits at sentence boundaries (period/!/? + space + uppercase or quote)
// without breaking on decimals (3.5), method chains (System.out.print), or
// code fragments (indices like "J=0,a=1").
function splitExplanation(text: string): string[] {
  const parts = text
    .split(/(?<=[.!?])\s+(?=[A-Z"'(])/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length > 1 ? parts : [text];
}

// ── MCQ Card ───────────────────────────────────────────────────────────────────
function MCQCard({
  mcq, index, initialSelected, onAnswer,
}: {
  mcq: MCQ;
  index: number;
  initialSelected?: string;
  onAnswer?: (mcqId: string, optionId: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(initialSelected ?? null);
  const answered = selected !== null;
  const correct = selected === mcq.correctId;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  function handleSelect(optionId: string) {
    if (answered) return;
    setSelected(optionId);
    onAnswer?.(mcq.id, optionId);
  }

  function optionStyle(id: string) {
    if (!answered) {
      return "border-[#30363d]/80 bg-[#0d1117] hover:border-[#58a6ff]/40 hover:bg-[#58a6ff]/5 cursor-pointer";
    }
    if (id === mcq.correctId) return "border-[#3fb950]/50 bg-[#3fb950]/8 cursor-default";
    if (id === selected) return "border-[#f85149]/50 bg-[#f85149]/8 cursor-default";
    return "border-[#30363d]/40 bg-[#0d1117] opacity-40 cursor-default";
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-md border border-[#30363d]/80 bg-[#161b22] p-4 mb-4"
    >
      {/* Question */}
      <div className="flex items-start gap-3 mb-4">
        <span className="shrink-0 text-xs font-mono text-[#484f58] bg-[#21262d] border border-[#30363d]/60 rounded px-2 py-0.5 mt-0.5">
          Q{index + 1}
        </span>
        <p className="text-sm text-[#e6edf3] leading-relaxed">{mcq.question}</p>
      </div>

      {/* Optional code */}
      {mcq.code && (
        <pre className="bg-[#0d1117] border border-[#30363d]/60 rounded overflow-x-auto p-3.5 text-sm font-mono leading-relaxed mb-4">
          <code><HighlightedCode code={mcq.code} /></code>
        </pre>
      )}

      {/* Options */}
      <div className="space-y-2 mb-3">
        {mcq.options.map((opt) => (
          <button
            key={opt.id}
            disabled={answered}
            onClick={() => handleSelect(opt.id)}
            className={`w-full text-left flex items-center gap-3 px-3.5 py-2.5 rounded border text-sm transition-all duration-150 ${optionStyle(opt.id)}`}
          >
            <span className="font-mono text-xs text-[#6e7681] shrink-0 w-4">{opt.id}</span>
            <span className="text-[#e6edf3]">{opt.text}</span>
            {answered && opt.id === mcq.correctId && (
              <CheckCircle size={13} className="ml-auto shrink-0 text-[#3fb950]" />
            )}
            {answered && opt.id === selected && opt.id !== mcq.correctId && (
              <XCircle size={13} className="ml-auto shrink-0 text-[#f85149]" />
            )}
          </button>
        ))}
      </div>

      {/* Result + explanation */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`flex items-center gap-1.5 text-xs font-mono mb-2.5 ${correct ? "text-[#3fb950]" : "text-[#f85149]"}`}>
              {correct
                ? <><CheckCircle size={12} /> Correct</>
                : <><XCircle size={12} /> Incorrect — answer is {mcq.correctId}</>
              }
            </div>
            <div className="rounded border border-[#58a6ff]/15 bg-[#58a6ff]/5 px-3.5 py-3.5">
              <p className="text-xs font-mono text-[#484f58] mb-3 uppercase tracking-widest">Explanation</p>
              <div className="space-y-2">
                {splitExplanation(mcq.explanation).map((sentence, i) => (
                  <p key={i} className="text-sm text-[#8b949e] leading-relaxed">
                    {sentence}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Section wrapper with scroll reveal ────────────────────────────────────────
function RevealSection({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      className="mb-10"
    >
      {children}
    </motion.section>
  );
}

// ── Section heading ────────────────────────────────────────────────────────────
function SectionHeading({ children, suffix }: { children: React.ReactNode; suffix?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2 className="text-xs font-mono text-[#6e7681] uppercase tracking-widest">{children}</h2>
      {suffix}
      <div className="flex-1 h-px bg-[#30363d]/60" />
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function SubUnitPage() {
  const { unitId, subSlug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [mcqAnswers, setMcqAnswers] = useState<Record<string, string>>({});
  const [alreadyComplete, setAlreadyComplete] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMcqAnswers({});
    setAlreadyComplete(false);
  }, [unitId, subSlug]);

  useEffect(() => {
    if (!user || !subSlug) return;
    loadAllProgress(user.id).then((all) => {
      const saved = all.find((p) => p.subUnitSlug === subSlug);
      if (saved) {
        setMcqAnswers(saved.mcqAnswers);
        setAlreadyComplete(saved.completed);
      }
    });
  }, [user, subSlug]);

  const entry = allSubUnits.find(
    (s) => s.unit.id === Number(unitId) && s.slug === subSlug
  );

  const handleAnswer = useCallback(
    (mcqId: string, optionId: string) => {
      if (!user || !entry) return;
      const updated = { ...mcqAnswers, [mcqId]: optionId };
      const allAnswered =
        entry.mcqs.length > 0 &&
        entry.mcqs.every((q) => updated[q.id] !== undefined);
      setMcqAnswers(updated);
      if (allAnswered) setAlreadyComplete(true);
      saveSubUnitProgress(user.id, entry.slug, allAnswered, updated);
    },
    [user, entry, mcqAnswers]
  );

  if (!entry) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex items-center justify-center">
        <p className="font-mono text-[#6e7681]">Sub-unit not found.</p>
      </div>
    );
  }

  const { unit, ...sub } = entry;
  const prev = prevSubUnit(sub.id);
  const next = nextSubUnit(sub.id);

  const hasContent =
    sub.codeExamples.length > 0 ||
    sub.conceptChecks.length > 0 ||
    sub.mcqs.length > 0;

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col">

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#30363d]/60 bg-[#0d1117]/90 backdrop-blur-sm px-5 py-2.5 flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => navigate("/")}
          className="text-xs font-mono text-[#6e7681] hover:text-[#58a6ff] transition-colors whitespace-nowrap"
        >
          apcsa
        </button>
        <span className="text-xs font-mono text-[#30363d]">/</span>
        <button
          onClick={() => navigate(`/unit/${unit.id}`)}
          className="text-xs font-mono text-[#6e7681] hover:text-[#e6edf3] transition-colors whitespace-nowrap"
        >
          unit-{unit.id}
        </button>
        <span className="text-xs font-mono text-[#30363d]">/</span>
        <span className="text-xs font-mono text-[#e6edf3] truncate">{sub.slug}</span>
      </header>

      <div className="max-w-3xl mx-auto w-full px-5 sm:px-8 py-10 flex-1">

        {/* Back */}
        <button
          onClick={() => navigate(`/unit/${unit.id}`)}
          className="flex items-center gap-1.5 text-sm font-mono text-[#6e7681] hover:text-[#e6edf3] transition-colors mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Unit {unit.id}: {unit.title}
        </button>

        {/* Sub-unit header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <p className="text-xs font-mono text-[#484f58] mb-2">
            Topics {sub.cedTopics.join(", ")}
          </p>
          <div className="flex items-start gap-3 mb-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#e6edf3] leading-snug">
              {sub.title}
            </h1>
            {alreadyComplete && (
              <span className="flex items-center gap-1.5 text-xs font-mono text-[#3fb950] bg-[#3fb950]/10 border border-[#3fb950]/25 px-2 py-1 rounded shrink-0 mt-1">
                <CheckCircle size={11} />
                Complete
              </span>
            )}
          </div>
          <p className="text-[#8b949e] leading-relaxed mb-8 text-sm sm:text-base">{sub.description}</p>

          {/* Objectives */}
          <div className="rounded-md border border-[#30363d]/60 bg-[#161b22] p-4 mb-10">
            <h2 className="text-xs font-mono text-[#58a6ff] mb-3 uppercase tracking-widest">
              Learning Objectives
            </h2>
            <ul className="space-y-2">
              {sub.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#8b949e]">
                  <ChevronRight size={13} className="text-[#3fb950] mt-0.5 shrink-0" />
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Code Examples */}
        {sub.codeExamples.length > 0 && (
          <RevealSection>
            <SectionHeading>Code Examples</SectionHeading>
            {sub.codeExamples.map((ex) => (
              <CodeBlock key={ex.id} example={ex} />
            ))}
          </RevealSection>
        )}

        {/* Concept Checks */}
        {sub.conceptChecks.length > 0 && (
          <RevealSection>
            <SectionHeading>
              Concept Checks
              <span className="text-xs font-mono text-[#484f58] normal-case tracking-normal">
                — trace the code, then reveal
              </span>
            </SectionHeading>
            {sub.conceptChecks.map((cc) => (
              <ConceptCheckCard key={cc.id} check={cc} />
            ))}
          </RevealSection>
        )}

        {/* MCQ Section */}
        {sub.mcqs.length > 0 && (
          <RevealSection>
            <SectionHeading>
              Practice MCQs
              <span className="text-xs font-mono text-[#484f58]">
                {Object.keys(mcqAnswers).length}/{sub.mcqs.length} answered
              </span>
            </SectionHeading>

            {!user && (
              <button
                onClick={() => navigate("/auth")}
                className="flex items-center gap-1.5 text-xs font-mono text-[#58a6ff] hover:text-[#79c0ff] transition-colors mb-4"
              >
                <LogIn size={11} />
                Log in to save your answers
              </button>
            )}

            <p className="text-xs font-mono text-[#484f58] mb-5">
              AP-style questions — select an answer to see instant feedback.
            </p>

            {sub.mcqs.map((mcq, i) => (
              <MCQCard
                key={mcq.id}
                mcq={mcq}
                index={i}
                initialSelected={mcqAnswers[mcq.id]}
                onAnswer={handleAnswer}
              />
            ))}

            {/* Completion banner */}
            <AnimatePresence>
              {alreadyComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 rounded-md border border-[#3fb950]/30 bg-[#3fb950]/5 px-4 py-3 mt-2"
                >
                  <CheckCircle size={15} className="text-[#3fb950] shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[#3fb950]">Lesson complete</p>
                    <p className="text-xs font-mono text-[#6e7681] mt-0.5">
                      {user ? "Progress saved to your account." : "Log in to save your progress across devices."}
                    </p>
                  </div>
                  {next && (
                    <button
                      onClick={() => navigate(`/unit/${next.unit.id}/${next.slug}`)}
                      className="ml-auto flex items-center gap-1 text-xs font-mono text-[#3fb950] hover:text-[#56d364] transition-colors shrink-0"
                    >
                      Next
                      <ArrowRight size={12} />
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </RevealSection>
        )}

        {/* Empty state */}
        {!hasContent && (
          <div className="rounded-md border border-dashed border-[#30363d]/60 bg-[#161b22]/40 p-8 text-center mb-8">
            <p className="text-sm font-mono text-[#484f58]">
              Lesson content coming soon.
            </p>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <footer className="border-t border-[#30363d]/60 px-5 sm:px-8 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          {prev ? (
            <button
              onClick={() => navigate(`/unit/${prev.unit.id}/${prev.slug}`)}
              className="flex items-center gap-2 text-sm text-[#6e7681] hover:text-[#e6edf3] transition-colors font-mono group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="truncate max-w-[180px] sm:max-w-[240px]">{prev.title}</span>
            </button>
          ) : <div />}

          {next ? (
            <button
              onClick={() => navigate(`/unit/${next.unit.id}/${next.slug}`)}
              className="flex items-center gap-2 text-sm text-[#6e7681] hover:text-[#e6edf3] transition-colors font-mono group ml-auto"
            >
              <span className="truncate max-w-[180px] sm:max-w-[240px]">{next.title}</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : <div />}
        </div>
      </footer>
    </div>
  );
}
