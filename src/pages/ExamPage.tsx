import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  CheckCircle,
  BookOpen,
  Timer,
  BarChart2,
  AlertTriangle,
  Eye,
  EyeOff,
  RotateCcw,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { examMCQs, examFRQs } from "../data/examData";
import { examMCQs2, examFRQs2 } from "../data/examData2";
import { examMCQs3, examFRQs3 } from "../data/examData3";
import type { ExamMCQ, ExamFRQ, OptionId, ExamMode, ExamPhase } from "../types/exam";
import { useAuth } from "../context/AuthContext";
import { recordAttemptsBatch } from "../lib/attempts";

// ── Per-exam data context ─────────────────────────────────────────────────────
interface ExamDataCtx { mcqs: ExamMCQ[]; frqs: ExamFRQ[]; examNum: number; keys: ReturnType<typeof makeExamKeys> }
function makeExamKeys(num: number) {
  const p = num === 3 ? "apcsa-exam3" : num === 2 ? "apcsa-exam2" : "apcsa-exam";
  return {
    phase:         `${p}-phase`,
    mode:          `${p}-mode`,
    mcqAnswers:    `${p}-mcq-answers`,
    mcqCurrent:    `${p}-mcq-current`,
    mcqFlagged:    `${p}-mcq-flagged`,
    mcqStartTs:    `${p}-mcq-start-ts`,
    mcqRemaining:  `${p}-mcq-remaining`,
    frqAnswers:    `${p}-frq-answers`,
    frqCurrent:    `${p}-frq-current`,
    frqSubmitted:  `${p}-frq-submitted`,
    frqSelfChecks: `${p}-frq-self-checks`,
    frqShowSample: `${p}-frq-show-sample`,
    frqStartTs:    `${p}-frq-start-ts`,
    frqRemaining:  `${p}-frq-remaining`,
  } as const;
}
const EXAM1_CTX: ExamDataCtx = { mcqs: examMCQs, frqs: examFRQs, examNum: 1, keys: makeExamKeys(1) };
const ExamDataContext = createContext<ExamDataCtx>(EXAM1_CTX);
function useExamData() { return useContext(ExamDataContext); }

// ── Java syntax highlighter (shared with SubUnitPage) ────────────────────────
const JAVA_KEYWORDS = new Set([
  "public","private","protected","static","final","abstract","class","interface",
  "enum","void","int","double","boolean","char","long","float","byte","short",
  "return","new","this","super","null","true","false","if","else","for","while",
  "do","break","continue","import","package","extends","implements","try","catch",
  "finally","throw","throws","instanceof","switch","case","default",
]);
type TokenType = "keyword" | "string" | "comment" | "number" | "code";
type Token = { type: TokenType; text: string };
const TOKEN_COLORS: Record<TokenType, string> = {
  keyword: "#ff7b72",
  string: "#a5d6ff",
  comment: "#8b949e",
  number: "#79c0ff",
  code: "#e6edf3",
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
    const wordMatch = code.slice(i).match(/^[a-zA-Z_$][a-zA-Z0-9_$]*/);
    if (wordMatch) {
      const word = wordMatch[0];
      tokens.push({
        type: JAVA_KEYWORDS.has(word) ? "keyword" : "code",
        text: word,
      });
      i += word.length;
      continue;
    }
    tokens.push({ type: "code", text: code[i] });
    i++;
  }
  return tokens;
}
function JavaCode({ code, compact = false }: { code: string; compact?: boolean }) {
  const tokens = tokenizeJava(code);
  return (
    <pre
      className={`font-mono text-sm leading-relaxed bg-[#0d1117] border border-[#30363d] rounded-lg overflow-x-auto whitespace-pre ${compact ? "p-3 text-xs" : "p-4"}`}
    >
      {tokens.map((t, i) => (
        <span key={i} style={{ color: TOKEN_COLORS[t.type] }}>
          {t.text}
        </span>
      ))}
    </pre>
  );
}

// ── Timer helpers ─────────────────────────────────────────────────────────────
const SECTION_TIME = 90 * 60; // 90 minutes in seconds
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ── localStorage persistence hook ────────────────────────────────────────────
function usePersistedState<T>(
  key: string,
  init: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const s = localStorage.getItem(key);
      return s !== null ? (JSON.parse(s) as T) : init;
    } catch {
      return init;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  return [state, setState];
}

function clearExamStorage(keys: ReturnType<typeof makeExamKeys>) {
  Object.values(keys).forEach((k) => localStorage.removeItem(k));
}

// ── Explanation text splitter ─────────────────────────────────────────────────
function splitExplanation(text: string): string[] {
  const parts = text
    .split(/(?<=[.!?])\s+(?=[A-Z"'(])/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length > 1 ? parts : [text];
}

// ── Unit color badges ─────────────────────────────────────────────────────────
const UNIT_COLORS: Record<number, string> = {
  1: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  2: "bg-green-500/20 text-green-400 border-green-500/30",
  3: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  4: "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

// ─────────────────────────────────────────────────────────────────────────────
// LANDING PAGE
// ─────────────────────────────────────────────────────────────────────────────
function ExamLanding({ onProceed }: { onProceed: () => void }) {
  const { frqs, examNum } = useExamData();
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-mono tracking-widest text-[#58a6ff] uppercase mb-3">
            2025–2026 Reformed Curriculum
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            AP Computer Science A
          </h1>
          <p className="text-xl text-[#8b949e] font-mono">
            Full-Length Practice Exam {examNum}
          </p>
        </div>

        {/* Exam Info Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-5">
            {[
              { label: "Section I", value: "42 MCQs", sub: "90 minutes · 55%" },
              { label: "Section II", value: "4 FRQs", sub: "90 minutes · 45%" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-[#0d1117] rounded-lg p-4 border border-[#30363d]"
              >
                <p className="text-xs font-mono text-[#8b949e] mb-1">{s.label}</p>
                <p className="text-lg font-bold text-[#e6edf3]">{s.value}</p>
                <p className="text-xs text-[#6e7681] font-mono">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
            {[
              { u: "U1", label: "Objects", pct: "~10 Qs", color: "text-blue-400" },
              { u: "U2", label: "Iteration", pct: "~12 Qs", color: "text-green-400" },
              { u: "U3", label: "Classes", pct: "~7 Qs", color: "text-purple-400" },
              { u: "U4", label: "Data", pct: "~13 Qs", color: "text-orange-400" },
            ].map((u) => (
              <div key={u.u} className="bg-[#21262d] rounded p-2">
                <p className={`font-bold ${u.color}`}>{u.u}</p>
                <p className="text-[#8b949e] text-[10px]">{u.label}</p>
                <p className="text-[#6e7681] text-[10px]">{u.pct}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FRQ breakdown */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 mb-8">
          <p className="text-xs font-mono text-[#8b949e] mb-3">
            FREE RESPONSE — FIXED STRUCTURE
          </p>
          <div className="space-y-2">
            {frqs.map((f) => (
              <div
                key={f.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-[#8b949e] font-mono">FRQ {f.id}</span>
                <span className="text-[#e6edf3]">{f.type}</span>
                <span className="text-[#58a6ff] font-mono text-xs">
                  {f.totalPoints} pts
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="flex gap-2 items-start mb-8 text-xs text-[#8b949e] font-mono bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <AlertTriangle size={14} className="text-yellow-500 mt-0.5 shrink-0" />
          <span>
            Answers are not revealed until the full exam is complete. FRQ
            answers are self-graded against the official rubric after submission.
          </span>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onProceed}
          className="w-full py-4 bg-[#238636] hover:bg-[#2ea043] border border-[#3fb950]/40 rounded-xl text-[#e6edf3] font-bold text-lg transition-colors duration-150"
        >
          PROCEED TO FULL-LENGTH PRACTICE EXAM
        </motion.button>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE SELECTION
// ─────────────────────────────────────────────────────────────────────────────
function ModeSelect({ onSelect }: { onSelect: (m: ExamMode) => void }) {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl"
      >
        <p className="text-center text-xs font-mono text-[#8b949e] uppercase tracking-widest mb-2">
          Select Mode
        </p>
        <h2 className="text-center text-2xl font-bold mb-8">
          How would you like to take this exam?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Timed */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect("timed")}
            className="group text-left bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff]/60 rounded-xl p-6 transition-colors duration-150"
          >
            <Timer
              size={28}
              className="text-[#58a6ff] mb-4 group-hover:scale-110 transition-transform"
            />
            <h3 className="font-bold text-lg mb-2 text-[#58a6ff]">
              TIMED MODE
            </h3>
            <p className="text-sm text-[#8b949e] leading-relaxed">
              90 min for MCQ, then 90 min for FRQ. Mirrors real exam conditions.
              Check-ins at 30 min and 5 min remaining.
            </p>
          </motion.button>

          {/* Untimed */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect("untimed")}
            className="group text-left bg-[#161b22] border border-[#30363d] hover:border-[#3fb950]/60 rounded-xl p-6 transition-colors duration-150"
          >
            <BookOpen
              size={28}
              className="text-[#3fb950] mb-4 group-hover:scale-110 transition-transform"
            />
            <h3 className="font-bold text-lg mb-2 text-[#3fb950]">
              UNTIMED MODE
            </h3>
            <p className="text-sm text-[#8b949e] leading-relaxed">
              No clock, no pressure. Practice at your own pace and review
              questions freely before submitting.
            </p>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TIMER BAR
// ─────────────────────────────────────────────────────────────────────────────
function TimerBar({
  remaining,
  total,
}: {
  remaining: number;
  total: number;
}) {
  const pct = (remaining / total) * 100;
  const color =
    remaining <= 300
      ? "bg-red-500"
      : remaining <= 1800
      ? "bg-yellow-500"
      : "bg-[#3fb950]";

  return (
    <div className="flex items-center gap-3">
      <Clock size={14} className="text-[#8b949e] shrink-0" />
      <div className="flex-1 h-1.5 bg-[#21262d] rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <span
        className={`font-mono text-sm font-bold tabular-nums ${
          remaining <= 300
            ? "text-red-400"
            : remaining <= 1800
            ? "text-yellow-400"
            : "text-[#3fb950]"
        }`}
      >
        {formatTime(remaining)}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────────────────────────────────────
function Toast({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#d29922] text-black font-bold text-sm px-5 py-2.5 rounded-lg shadow-xl"
    >
      {message}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MCQ SECTION
// ─────────────────────────────────────────────────────────────────────────────
function MCQSection({
  mode,
  answers,
  onAnswer,
  onComplete,
  onExit,
}: {
  mode: ExamMode;
  answers: Record<number, OptionId>;
  onAnswer: (qId: number, opt: OptionId) => void;
  onComplete: () => void;
  onExit: () => void;
}) {
  const { mcqs, keys } = useExamData();
  const [current, setCurrent] = usePersistedState(keys.mcqCurrent, 0);
  const [flaggedArr, setFlaggedArr] = usePersistedState<number[]>(keys.mcqFlagged, []);
  const flagged = new Set(flaggedArr);
  const setFlagged = (updater: (prev: Set<number>) => Set<number>) =>
    setFlaggedArr((prev) => [...updater(new Set(prev))]);

  // Timer — persisted so remaining survives exit; only ticks when the tab is visible
  const [remaining, setRemaining] = usePersistedState(keys.mcqRemaining, SECTION_TIME);

  const [toast, setToast] = useState<string | null>(null);
  const [showReview, setShowReview] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const warningsShown = useRef(new Set<string>());

  useEffect(() => {
    if (mode !== "timed") return;
    let id: ReturnType<typeof setInterval> | null = null;

    const tick = () => {
      setRemaining((r) => {
        const next = r - 1;
        if (next <= 0) { stopTimer(); onComplete(); return 0; }
        if (next === 30 * 60 && !warningsShown.current.has("30")) {
          warningsShown.current.add("30");
          setToast("⏱ 30 minutes remaining in Section I");
          setTimeout(() => setToast(null), 5000);
        }
        if (next === 5 * 60 && !warningsShown.current.has("5")) {
          warningsShown.current.add("5");
          setToast("⚠️ 5 minutes remaining — begin wrapping up");
          setTimeout(() => setToast(null), 6000);
        }
        return next;
      });
    };

    const startTimer = () => { if (id === null) id = setInterval(tick, 1000); };
    const stopTimer  = () => { if (id !== null) { clearInterval(id); id = null; } };

    const handleVisibility = () => { document.hidden ? stopTimer() : startTimer(); };
    document.addEventListener("visibilitychange", handleVisibility);
    if (!document.hidden) startTimer();

    return () => { stopTimer(); document.removeEventListener("visibilitychange", handleVisibility); };
  }, [mode, onComplete]);

  const q = mcqs[current];
  const prevQ = current > 0 ? mcqs[current - 1] : null;
  const isNewQS =
    q.questionSetId && q.questionSetId !== prevQ?.questionSetId;

  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev);
      next.has(q.id) ? next.delete(q.id) : next.add(q.id);
      return next;
    });
  };

  const answeredCount = Object.keys(answers).length;
  const flaggedCount = flagged.size;

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col">
      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast} />}
      </AnimatePresence>

      {/* Header */}
      <header className="border-b border-[#30363d] px-4 py-3">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs font-mono text-[#8b949e]">
                Section I — Multiple Choice
              </span>
              <span className="ml-3 text-xs font-mono text-[#6e7681]">
                {answeredCount} / {mcqs.length} answered
                {flaggedCount > 0 && (
                  <span className="ml-2 text-yellow-500">
                    · {flaggedCount} flagged
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowExitConfirm(true)}
                className="flex items-center gap-1 text-xs font-mono text-[#8b949e] hover:text-[#ff7b72] border border-[#30363d] hover:border-[#ff7b72]/40 px-2 py-1 rounded transition-colors"
              >
                <LogOut size={12} />
                Exit
              </button>
              {mode === "timed" && (
                <div className="w-40">
                  <TimerBar remaining={remaining} total={SECTION_TIME} />
                </div>
              )}
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-[#21262d] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#58a6ff] rounded-full transition-all duration-300"
              style={{
                width: `${((current + 1) / mcqs.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </header>

      {/* Question area */}
      <main className="flex-1 px-4 py-6 max-w-3xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.18 }}
          >
            {/* Question set banner */}
            {isNewQS && q.sharedCode && (
              <div className="mb-4 p-3 bg-[#21262d] border border-[#d29922]/40 rounded-lg">
                <p className="text-xs font-mono text-[#d29922] mb-2">
                  {q.questionSetLabel}
                </p>
                <JavaCode code={q.sharedCode} compact />
              </div>
            )}
            {/* Question set shared code (non-first question) */}
            {q.questionSetId &&
              !isNewQS &&
              q.sharedCode === undefined && (() => {
                const setQ = mcqs.find(
                  (m) => m.questionSetId === q.questionSetId && m.sharedCode
                );
                return setQ?.sharedCode ? (
                  <div className="mb-4 p-3 bg-[#21262d] border border-[#d29922]/40 rounded-lg">
                    <p className="text-xs font-mono text-[#d29922] mb-2">
                      {setQ.questionSetLabel}
                    </p>
                    <JavaCode code={setQ.sharedCode} compact />
                  </div>
                ) : null;
              })()}

            {/* Question header */}
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-sm text-[#8b949e]">
                Question {current + 1} of {mcqs.length}
              </span>
              <span
                className={`text-xs font-mono px-2 py-0.5 rounded border ${
                  UNIT_COLORS[q.unit]
                }`}
              >
                Unit {q.unit}
              </span>
              <span className="text-xs font-mono text-[#6e7681]">
                Skill {q.skill}
              </span>
              <button
                onClick={toggleFlag}
                className={`ml-auto flex items-center gap-1 text-xs font-mono px-2 py-1 rounded border transition-colors ${
                  flagged.has(q.id)
                    ? "border-yellow-500/60 text-yellow-400 bg-yellow-500/10"
                    : "border-[#30363d] text-[#6e7681] hover:text-yellow-400"
                }`}
              >
                <Flag size={11} />
                {flagged.has(q.id) ? "Flagged" : "Flag"}
              </button>
            </div>

            {/* Question text */}
            <p className="text-[#e6edf3] leading-relaxed mb-4 text-base">
              {q.question}
            </p>

            {/* Code block */}
            {q.code && (
              <div className="mb-5">
                <JavaCode code={q.code} />
              </div>
            )}

            {/* Options */}
            <div className="space-y-2.5">
              {q.options.map((opt) => {
                const selected = answers[q.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => onAnswer(q.id, opt.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-100 ${
                      selected
                        ? "border-[#58a6ff] bg-[#58a6ff]/10 text-[#e6edf3]"
                        : "border-[#30363d] bg-[#161b22] text-[#8b949e] hover:border-[#8b949e] hover:text-[#e6edf3]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`font-mono font-bold text-sm shrink-0 mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                          selected
                            ? "border-[#58a6ff] text-[#58a6ff] bg-[#58a6ff]/20"
                            : "border-[#30363d] text-[#6e7681]"
                        }`}
                      >
                        {opt.id}
                      </span>
                      {opt.isCode ? (
                        <code className="font-mono text-sm text-[#e6edf3] whitespace-pre-wrap">
                          {opt.text}
                        </code>
                      ) : (
                        <span className="text-sm leading-relaxed whitespace-pre-line">
                          {opt.text}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer nav */}
      <footer className="border-t border-[#30363d] px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#30363d] text-sm text-[#8b949e] hover:text-[#e6edf3] hover:border-[#8b949e] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={15} /> Prev
          </button>

          {/* Question dots (compact) */}
          <div className="flex gap-1 flex-wrap justify-center max-w-sm">
            {mcqs.map((mq, idx) => (
              <button
                key={mq.id}
                onClick={() => setCurrent(idx)}
                title={`Q${idx + 1}`}
                className={`w-3.5 h-3.5 rounded-sm transition-colors ${
                  idx === current
                    ? "bg-[#58a6ff]"
                    : answers[mq.id]
                    ? flagged.has(mq.id)
                      ? "bg-yellow-500"
                      : "bg-[#3fb950]"
                    : "bg-[#30363d]"
                }`}
              />
            ))}
          </div>

          {current < mcqs.length - 1 ? (
            <button
              onClick={() => setCurrent((c) => Math.min(mcqs.length - 1, c + 1))}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#30363d] text-sm text-[#8b949e] hover:text-[#e6edf3] hover:border-[#8b949e] transition-colors"
            >
              Next <ChevronRight size={15} />
            </button>
          ) : (
            <button
              onClick={() => setShowReview(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#3fb950]/60 bg-[#3fb950]/10 text-sm text-[#3fb950] hover:bg-[#3fb950]/20 transition-colors font-semibold"
            >
              End Section <ChevronRight size={15} />
            </button>
          )}
        </div>
      </footer>

      {/* Review overlay */}
      <AnimatePresence>
        {showReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-40 px-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 w-full max-w-md"
            >
              <h3 className="font-bold text-lg mb-1">Submit Section I?</h3>
              <p className="text-sm text-[#8b949e] mb-4">
                {answeredCount} of {mcqs.length} answered ·{" "}
                {mcqs.length - answeredCount} unanswered
                {flaggedCount > 0 && ` · ${flaggedCount} flagged`}
              </p>
              {mcqs.length - answeredCount > 0 && (
                <p className="text-xs text-yellow-400 font-mono mb-4">
                  ⚠ Unanswered questions count as incorrect.
                </p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowReview(false)}
                  className="flex-1 py-2 rounded-lg border border-[#30363d] text-sm text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                >
                  Keep reviewing
                </button>
                <button
                  onClick={onComplete}
                  className="flex-1 py-2 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-sm font-semibold transition-colors"
                >
                  Submit &amp; continue to FRQ
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit confirmation */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-40 px-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 w-full max-w-sm"
            >
              <h3 className="font-bold text-lg mb-2">Exit Exam?</h3>
              <p className="text-sm text-[#8b949e] mb-6">
                Your progress is automatically saved. Return to this exam to resume right where you left off.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="flex-1 py-2 rounded-lg border border-[#30363d] text-sm text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                >
                  Stay
                </button>
                <button
                  onClick={onExit}
                  className="flex-1 py-2 rounded-lg bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-sm font-semibold text-[#e6edf3] transition-colors"
                >
                  Exit to Home
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FRQ INTRO SCREEN
// ─────────────────────────────────────────────────────────────────────────────
function FRQIntro({ mode, onBegin }: { mode: ExamMode; onBegin: () => void }) {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl text-center"
      >
        <CheckCircle size={40} className="text-[#3fb950] mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Section I Complete</h2>
        <p className="text-[#8b949e] mb-6 text-sm">
          You have finished the multiple choice section.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 mb-8 text-left">
          <p className="font-semibold mb-3">Section II — Free Response</p>
          <ul className="space-y-1.5 text-sm text-[#8b949e]">
            <li>· 4 questions · 90 minutes{mode === "timed" ? " (timed)" : " (untimed)"}</li>
            <li>· Type your Java code in the editor for each part</li>
            <li>· After submitting each part, the rubric and sample answer are revealed</li>
            <li>· Self-check each rubric point to calculate your FRQ score</li>
            <li>· Java Quick Reference is available — type "jqr" in any code box for a reminder</li>
          </ul>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBegin}
          className="w-full py-3 bg-[#238636] hover:bg-[#2ea043] rounded-xl font-bold transition-colors"
        >
          Begin Section II
        </motion.button>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FRQ SECTION
// ─────────────────────────────────────────────────────────────────────────────
function FRQSection({
  mode,
  frqAnswers,
  onSavePart,
  onComplete,
  onExit,
}: {
  mode: ExamMode;
  frqAnswers: Record<number, { parts: Record<string, string>; selfScores: Record<string, boolean[]> }>;
  onSavePart: (frqId: number, letter: string, text: string) => void;
  onComplete: () => void;
  onExit: () => void;
}) {
  const { frqs, keys } = useExamData();
  const [currentFRQ, setCurrentFRQ] = usePersistedState(keys.frqCurrent, 0);
  const [submittedParts, setSubmittedParts] = usePersistedState<Record<string, boolean>>(keys.frqSubmitted, {});
  const [showSample, setShowSample] = usePersistedState<Record<string, boolean>>(keys.frqShowSample, {});
  const [selfChecks, setSelfChecks] = usePersistedState<Record<string, boolean[]>>(keys.frqSelfChecks, {});

  // Timer — persisted so remaining survives exit; only ticks when the tab is visible
  const [remaining, setRemaining] = usePersistedState(keys.frqRemaining, SECTION_TIME);

  const [toast, setToast] = useState<string | null>(null);
  const [showJQR, setShowJQR] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const warningsShown = useRef(new Set<string>());

  const frq = frqs[currentFRQ];

  useEffect(() => {
    if (mode !== "timed") return;
    let id: ReturnType<typeof setInterval> | null = null;

    const tick = () => {
      setRemaining((r) => {
        const next = r - 1;
        if (next <= 0) { stopTimer(); onComplete(); return 0; }
        if (next === 30 * 60 && !warningsShown.current.has("30")) {
          warningsShown.current.add("30");
          setToast("⏱ 30 minutes remaining in Section II");
          setTimeout(() => setToast(null), 5000);
        }
        if (next === 5 * 60 && !warningsShown.current.has("5")) {
          warningsShown.current.add("5");
          setToast("⚠️ 5 minutes remaining — finalize your answers");
          setTimeout(() => setToast(null), 6000);
        }
        return next;
      });
    };

    const startTimer = () => { if (id === null) id = setInterval(tick, 1000); };
    const stopTimer  = () => { if (id !== null) { clearInterval(id); id = null; } };

    const handleVisibility = () => { document.hidden ? stopTimer() : startTimer(); };
    document.addEventListener("visibilitychange", handleVisibility);
    if (!document.hidden) startTimer();

    return () => { stopTimer(); document.removeEventListener("visibilitychange", handleVisibility); };
  }, [mode, onComplete]);

  const partKey = (frqId: number, letter: string) => `${frqId}-${letter}`;

  const handleSubmitPart = (letter: string) => {
    const key = partKey(frq.id, letter);
    setSubmittedParts((p) => ({ ...p, [key]: true }));
    // init self-check array
    const part = frq.parts.find((p) => p.letter === letter)!;
    setSelfChecks((sc) => ({
      ...sc,
      [key]: new Array(part.rubricPoints.length).fill(false),
    }));
  };

  const toggleCheck = (partKey: string, idx: number) => {
    setSelfChecks((sc) => {
      const arr = [...(sc[partKey] ?? [])];
      arr[idx] = !arr[idx];
      return { ...sc, [partKey]: arr };
    });
  };

  const partScore = (key: string, part: (typeof frq.parts)[0]) => {
    const checks = selfChecks[key] ?? [];
    return part.rubricPoints.reduce(
      (sum, rp, i) => sum + (checks[i] ? rp.points : 0),
      0
    );
  };

  const allPartsSubmitted = frq.parts.every((p) =>
    submittedParts[partKey(frq.id, p.letter)]
  );
  const isLastFRQ = currentFRQ === frqs.length - 1;

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col">
      <AnimatePresence>{toast && <Toast message={toast} />}</AnimatePresence>

      {/* Header */}
      <header className="border-b border-[#30363d] px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-[#8b949e]">
              Section II — Free Response
            </span>
            <span className="ml-3 text-xs font-mono text-[#6e7681]">
              FRQ {currentFRQ + 1} of {frqs.length}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowJQR((v) => !v)}
              className="text-xs font-mono text-[#8b949e] hover:text-[#58a6ff] border border-[#30363d] hover:border-[#58a6ff]/40 px-2 py-1 rounded transition-colors"
            >
              {showJQR ? "Hide" : "Show"} Java Quick Reference
            </button>
            <button
              onClick={() => setShowExitConfirm(true)}
              className="flex items-center gap-1 text-xs font-mono text-[#8b949e] hover:text-[#ff7b72] border border-[#30363d] hover:border-[#ff7b72]/40 px-2 py-1 rounded transition-colors"
            >
              <LogOut size={12} />
              Exit
            </button>
            {mode === "timed" && (
              <div className="w-36">
                <TimerBar remaining={remaining} total={SECTION_TIME} />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* JQR panel */}
      <AnimatePresence>
        {showJQR && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-[#30363d] bg-[#161b22] overflow-hidden"
          >
            <div className="max-w-4xl mx-auto px-4 py-3">
              <JavaCode
                compact
                code={`// String methods
s.length()             s.substring(i, j)    s.substring(i)
s.indexOf(str)         s.charAt(i)          s.equals(str)

// Math methods
Math.abs(x)            Math.pow(b, e)       Math.sqrt(x)
Math.random()          Math.min(a,b)        Math.max(a,b)

// ArrayList methods
list.add(obj)          list.add(i, obj)     list.get(i)
list.set(i, obj)       list.remove(i)       list.size()

// Integer / Double
Integer.MIN_VALUE      Integer.MAX_VALUE
(double) x             (int) x`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FRQ content */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFRQ}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* FRQ header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-[#8b949e] bg-[#21262d] border border-[#30363d] px-2 py-1 rounded">
                  {frq.type}
                </span>
                <span className="text-xs font-mono text-[#58a6ff]">
                  {frq.totalPoints} points
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2">
                FRQ {frq.id}: {frq.title}
              </h2>
              <p className="text-sm text-[#8b949e] leading-relaxed mb-5">
                {frq.scenario}
              </p>

              {/* Given code */}
              <div className="mb-6">
                <p className="text-xs font-mono text-[#8b949e] mb-2">
                  GIVEN CODE
                </p>
                <JavaCode code={frq.givenCode} />
              </div>

              {/* Parts */}
              {frq.parts.map((part) => {
                const key = partKey(frq.id, part.letter);
                const submitted = submittedParts[key];
                const checks = selfChecks[key] ?? [];
                const score = partScore(key, part);
                const currentText = frqAnswers[frq.id]?.parts[part.letter] ?? "";

                return (
                  <div
                    key={part.letter}
                    className="mb-6 bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden"
                  >
                    {/* Part header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#30363d] bg-[#21262d]">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#e6edf3]">
                          Part ({part.letter})
                        </span>
                        <span className="text-xs font-mono text-[#8b949e]">
                          {part.points} points
                        </span>
                      </div>
                      {submitted && (
                        <span className="text-xs font-mono text-[#3fb950] bg-[#3fb950]/10 border border-[#3fb950]/30 px-2 py-0.5 rounded">
                          {score} / {part.points} pts (self-scored)
                        </span>
                      )}
                    </div>

                    <div className="p-4 space-y-4">
                      {/* Prompt */}
                      <p className="text-sm text-[#e6edf3] leading-relaxed">
                        {part.prompt}
                      </p>

                      {/* Code editor */}
                      {!submitted && (
                        <>
                          <textarea
                            value={currentText}
                            onChange={(e) =>
                              onSavePart(frq.id, part.letter, e.target.value)
                            }
                            placeholder={`// Write your Java code for Part (${part.letter}) here...`}
                            rows={10}
                            spellCheck={false}
                            className="w-full font-mono text-sm bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-[#e6edf3] placeholder-[#6e7681] focus:outline-none focus:border-[#58a6ff]/60 resize-y"
                          />
                          <button
                            onClick={() => handleSubmitPart(part.letter)}
                            className="px-4 py-2 bg-[#238636] hover:bg-[#2ea043] rounded-lg text-sm font-semibold transition-colors"
                          >
                            Submit Part ({part.letter}) &amp; View Rubric
                          </button>
                        </>
                      )}

                      {/* Submitted answer */}
                      {submitted && currentText.trim() && (
                        <div>
                          <p className="text-xs font-mono text-[#8b949e] mb-1">
                            YOUR ANSWER
                          </p>
                          <JavaCode code={currentText} compact />
                        </div>
                      )}

                      {/* Rubric */}
                      {submitted && (
                        <div>
                          <p className="text-xs font-mono text-[#8b949e] mb-2">
                            RUBRIC — check each point you earned:
                          </p>
                          <div className="space-y-2">
                            {part.rubricPoints.map((rp, i) => (
                              <label
                                key={i}
                                className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                                  checks[i]
                                    ? "border-[#3fb950]/40 bg-[#3fb950]/5"
                                    : "border-[#30363d] hover:border-[#8b949e]/40"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={checks[i] ?? false}
                                  onChange={() => toggleCheck(key, i)}
                                  className="mt-0.5 accent-[#3fb950] shrink-0"
                                />
                                <span className="text-sm text-[#e6edf3]">
                                  {rp.text}
                                </span>
                                <span className="ml-auto text-xs font-mono text-[#58a6ff] shrink-0">
                                  {rp.points} pt
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Common mistakes */}
                      {submitted && (
                        <details className="text-xs">
                          <summary className="font-mono text-[#d29922] cursor-pointer mb-2">
                            Common mistakes for this part
                          </summary>
                          <ul className="space-y-1 text-[#8b949e] pl-3">
                            {part.commonMistakes.map((m, i) => (
                              <li key={i}>· {m}</li>
                            ))}
                          </ul>
                        </details>
                      )}

                      {/* Sample answer toggle */}
                      {submitted && (
                        <div>
                          <button
                            onClick={() =>
                              setShowSample((s) => ({ ...s, [key]: !s[key] }))
                            }
                            className="flex items-center gap-1.5 text-xs font-mono text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                          >
                            {showSample[key] ? (
                              <EyeOff size={12} />
                            ) : (
                              <Eye size={12} />
                            )}
                            {showSample[key]
                              ? "Hide sample answer"
                              : "Show sample answer"}
                          </button>
                          <AnimatePresence>
                            {showSample[key] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-2 overflow-hidden"
                              >
                                <p className="text-xs font-mono text-[#3fb950] mb-1">
                                  SAMPLE ANSWER
                                </p>
                                <JavaCode code={part.sampleAnswer} compact />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer nav */}
      <footer className="border-t border-[#30363d] px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setCurrentFRQ((c) => Math.max(0, c - 1))}
            disabled={currentFRQ === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#30363d] text-sm text-[#8b949e] hover:text-[#e6edf3] hover:border-[#8b949e] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={15} /> Prev FRQ
          </button>

          {/* FRQ dots */}
          <div className="flex gap-2">
            {frqs.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setCurrentFRQ(i)}
                title={`FRQ ${i + 1}`}
                className={`w-7 h-7 rounded-full text-xs font-mono font-bold border transition-colors ${
                  i === currentFRQ
                    ? "bg-[#58a6ff] border-[#58a6ff] text-[#0d1117]"
                    : frqs[i].parts.every((p) =>
                        submittedParts[partKey(f.id, p.letter)]
                      )
                    ? "bg-[#3fb950]/20 border-[#3fb950]/60 text-[#3fb950]"
                    : "bg-[#161b22] border-[#30363d] text-[#8b949e]"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {!isLastFRQ ? (
            <button
              onClick={() => setCurrentFRQ((c) => Math.min(frqs.length - 1, c + 1))}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#30363d] text-sm text-[#8b949e] hover:text-[#e6edf3] hover:border-[#8b949e] transition-colors"
            >
              Next FRQ <ChevronRight size={15} />
            </button>
          ) : (
            <button
              onClick={onComplete}
              disabled={!allPartsSubmitted}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#3fb950]/60 bg-[#3fb950]/10 text-sm text-[#3fb950] hover:bg-[#3fb950]/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              Submit Exam <CheckCircle size={15} />
            </button>
          )}
        </div>
      </footer>

      {/* Exit confirmation */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-40 px-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 w-full max-w-sm"
            >
              <h3 className="font-bold text-lg mb-2">Exit Exam?</h3>
              <p className="text-sm text-[#8b949e] mb-6">
                Your progress is automatically saved. Return to this exam to resume right where you left off.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="flex-1 py-2 rounded-lg border border-[#30363d] text-sm text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                >
                  Stay
                </button>
                <button
                  onClick={onExit}
                  className="flex-1 py-2 rounded-lg bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-sm font-semibold text-[#e6edf3] transition-colors"
                >
                  Exit to Home
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RESULTS DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
const TOPIC_LABELS: Record<string, string> = {
  "1.3": "Expressions and Output",
  "1.4": "Assignment Statements and Input",
  "1.5": "Casting and Range of Variables",
  "1.6": "Compound Assignment Operators",
  "1.11": "Math Class",
  "1.14": "Calling Instance Methods",
  "1.15": "String Manipulation",
  "2.1": "Algorithms with Selection and Repetition",
  "2.2": "Boolean Expressions",
  "2.3": "if Statements",
  "2.6": "Comparing Boolean Expressions",
  "2.7": "while Loops",
  "2.8": "for Loops",
  "2.9": "Implementing Selection & Iteration Algorithms",
  "2.11": "Nested Iteration",
  "2.12": "Informal Run-Time Analysis",
  "3.2": "Impact of Program Design",
  "3.3": "Anatomy of a Class",
  "3.4": "Constructors",
  "3.5": "Methods: How to Write Them",
  "3.7": "Class Variables and Methods",
  "3.8": "Scope and Access",
  "4.2": "Introduction to Using Data Sets",
  "4.3": "Array Creation and Access",
  "4.5": "Implementing Array Algorithms",
  "4.6": "Using Text Files",
  "4.8": "ArrayList Methods",
  "4.9": "ArrayList Traversals",
  "4.10": "Implementing ArrayList Algorithms",
  "4.11": "2D Array Creation and Access",
  "4.12": "2D Array Traversals",
  "4.13": "Implementing 2D Array Algorithms",
  "4.14": "Searching Algorithms",
  "4.15": "Sorting Algorithms",
  "4.16": "Recursion",
};

const UNIT_LABELS: Record<number, string> = {
  1: "Using Objects & Methods",
  2: "Selection & Iteration",
  3: "Class Creation",
  4: "Data Collections",
};

function ResultsDashboard({
  mcqAnswers,
  onRetake,
}: {
  mcqAnswers: Record<number, OptionId>;
  onRetake: () => void;
}) {
  const navigate = useNavigate();
  const { mcqs } = useExamData();

  const totalCorrect = mcqs.filter(
    (q) => mcqAnswers[q.id] === q.correctId
  ).length;
  const totalPct = Math.round((totalCorrect / mcqs.length) * 100);

  // AP score prediction (based on MCQ only, weighted to ~55% of total)
  const apScore =
    totalPct >= 90 ? 5 : totalPct >= 76 ? 4 : totalPct >= 60 ? 3 : totalPct >= 40 ? 2 : 1;
  const apScoreColor =
    apScore >= 4
      ? "text-[#3fb950]"
      : apScore === 3
      ? "text-[#58a6ff]"
      : apScore === 2
      ? "text-[#d29922]"
      : "text-red-400";

  // Topic breakdown grouped by unit
  const topicBreakdown = ([1, 2, 3, 4] as const).map((u) => {
    const unitQs = mcqs.filter((q) => q.unit === u);
    const topics = [...new Set(unitQs.map((q) => q.cedTopic))].sort((a, b) => {
      const [, at] = a.split(".").map(Number);
      const [, bt] = b.split(".").map(Number);
      return at - bt;
    });
    const unitCorrect = unitQs.filter((q) => mcqAnswers[q.id] === q.correctId).length;
    return {
      unit: u,
      unitCorrect,
      unitTotal: unitQs.length,
      topics: topics.map((topic) => {
        const qs = unitQs.filter((q) => q.cedTopic === topic);
        const correct = qs.filter((q) => mcqAnswers[q.id] === q.correctId).length;
        return { topic, correct, total: qs.length, pct: Math.round((correct / qs.length) * 100) };
      }),
    };
  });

  // Error analysis — find traps students fell into
  const missedByTrap: Record<string, number> = {};
  mcqs.forEach((q) => {
    if (mcqAnswers[q.id] && mcqAnswers[q.id] !== q.correctId && q.trap) {
      missedByTrap[q.trap] = (missedByTrap[q.trap] ?? 0) + 1;
    }
  });
  const topTraps = Object.entries(missedByTrap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  // Missed = wrong + unanswered. Track which is which for display.
  const missed = mcqs.filter(
    (q) => mcqAnswers[q.id] !== q.correctId
  );
  const wrongCount = missed.filter((q) => mcqAnswers[q.id] !== undefined).length;
  const skippedCount = missed.length - wrongCount;

  const [showMissed, setShowMissed] = useState(false);
  const [openUnits, setOpenUnits] = useState<Set<number>>(new Set([1, 2, 3, 4]));
  const toggleUnit = (u: number) =>
    setOpenUnits((prev) => {
      const next = new Set(prev);
      next.has(u) ? next.delete(u) : next.add(u);
      return next;
    });

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] pb-16">
      <header className="border-b border-[#30363d] px-6 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm text-[#8b949e] hover:text-[#e6edf3] transition-colors"
        >
          <ArrowLeft size={15} /> Home
        </button>
        <span className="text-sm font-mono text-[#8b949e]">
          Practice Exam Results
        </span>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* AP Score hero */}
          <div className="text-center mb-10">
            <p className="text-xs font-mono text-[#8b949e] uppercase tracking-widest mb-2">
              AP Score Prediction (MCQ-based)
            </p>
            <div
              className={`text-8xl font-black mb-2 ${apScoreColor}`}
            >
              {apScore}
            </div>
            <p className="text-sm text-[#8b949e]">
              MCQ: {totalCorrect} / {mcqs.length} correct ({totalPct}%)
            </p>
            <p className="text-xs text-[#6e7681] mt-1">
              Score reflects MCQ performance only. Add your self-reported FRQ
              points for a complete estimate.
            </p>
          </div>

          {/* Topic breakdown */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden mb-5">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-[#30363d]">
              <BarChart2 size={16} className="text-[#58a6ff]" />
              <p className="font-semibold text-sm">Topic Breakdown — MCQ</p>
            </div>
            <div className="divide-y divide-[#30363d]">
              {topicBreakdown.map(({ unit, unitCorrect, unitTotal, topics }) => {
                const unitPct = Math.round((unitCorrect / unitTotal) * 100);
                const isOpen = openUnits.has(unit);
                return (
                  <div key={unit}>
                    {/* Unit header row */}
                    <button
                      onClick={() => toggleUnit(unit)}
                      className="w-full flex items-center justify-between px-5 py-3 hover:bg-[#21262d] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <ChevronRight
                          size={13}
                          className={`text-[#6e7681] transition-transform duration-150 ${isOpen ? "rotate-90" : ""}`}
                        />
                        <span className={`text-xs font-mono px-1.5 py-0.5 rounded border ${UNIT_COLORS[unit]}`}>
                          Unit {unit}
                        </span>
                        <span className="text-xs text-[#8b949e]">{UNIT_LABELS[unit]}</span>
                      </div>
                      <span className="text-xs font-mono text-[#e6edf3]">
                        {unitCorrect}/{unitTotal} ({unitPct}%)
                      </span>
                    </button>

                    {/* Topic rows */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-3 space-y-2.5 bg-[#0d1117]/40">
                            {topics.map(({ topic, correct, total, pct }, i) => (
                              <div key={topic} className="pt-2">
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span className="text-xs font-mono text-[#58a6ff] shrink-0">
                                      {topic}
                                    </span>
                                    <span className="text-xs text-[#6e7681] truncate">
                                      {TOPIC_LABELS[topic] ?? ""}
                                    </span>
                                    <span className="text-xs text-[#30363d] font-mono shrink-0">
                                      ({total}Q)
                                    </span>
                                  </div>
                                  <span
                                    className={`text-xs font-mono shrink-0 ml-2 ${
                                      pct === 100
                                        ? "text-[#3fb950]"
                                        : pct >= 50
                                        ? "text-[#e6edf3]"
                                        : "text-red-400"
                                    }`}
                                  >
                                    {correct}/{total}
                                  </span>
                                </div>
                                <div className="h-1.5 bg-[#21262d] rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className={`h-full rounded-full ${
                                      pct === 100
                                        ? "bg-[#3fb950]"
                                        : pct >= 60
                                        ? "bg-[#58a6ff]"
                                        : pct >= 30
                                        ? "bg-[#d29922]"
                                        : "bg-red-500"
                                    }`}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Error analysis */}
          {topTraps.length > 0 && (
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 mb-5">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={16} className="text-[#d29922]" />
                <p className="font-semibold text-sm">Frequent Error Patterns</p>
              </div>
              <div className="space-y-2">
                {topTraps.map(([trap, count]) => (
                  <div
                    key={trap}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-[#8b949e] capitalize">{trap}</span>
                    <span className="text-xs font-mono text-[#d29922]">
                      missed {count}×
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Missed questions review (wrong + skipped) */}
          {missed.length > 0 && (
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 mb-8">
              <button
                onClick={() => setShowMissed((v) => !v)}
                className="w-full flex items-center justify-between text-sm font-semibold"
              >
                <span>
                  Review Missed Questions ({missed.length})
                  {skippedCount > 0 && (
                    <span className="ml-2 text-xs font-mono text-[#8b949e]">
                      · {wrongCount} wrong · {skippedCount} skipped
                    </span>
                  )}
                </span>
                {showMissed ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
              <AnimatePresence>
                {showMissed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-5">
                      {missed.map((q) => {
                        const userAnswer = mcqAnswers[q.id];
                        const wasSkipped = userAnswer === undefined;
                        return (
                          <div
                            key={q.id}
                            className="border border-[#30363d] rounded-lg p-4 space-y-2"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-[#8b949e]">
                                Q{q.id}
                              </span>
                              <span
                                className={`text-xs font-mono px-1.5 py-0.5 rounded border ${UNIT_COLORS[q.unit]}`}
                              >
                                Unit {q.unit}
                              </span>
                              {wasSkipped && (
                                <span className="text-xs font-mono px-1.5 py-0.5 rounded border border-amber-500/40 bg-amber-500/10 text-amber-400">
                                  Skipped
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-[#e6edf3]">
                              {q.question}
                            </p>
                            {q.code && <JavaCode code={q.code} compact />}
                            <div className="text-xs space-y-1">
                              {wasSkipped ? (
                                <p className="text-amber-400">
                                  Not answered
                                </p>
                              ) : (
                                <p className="text-red-400">
                                  Your answer:{" "}
                                  <span className="font-mono">{userAnswer}</span>{" "}
                                  — {q.options.find((o) => o.id === userAnswer)?.text}
                                </p>
                              )}
                              <p className="text-[#3fb950]">
                                Correct:{" "}
                                <span className="font-mono">{q.correctId}</span>{" "}
                                — {q.options.find((o) => o.id === q.correctId)?.text}
                              </p>
                              <div className="mt-2 space-y-1.5 not-italic">
                                {splitExplanation(q.explanation).map((sentence, i) => (
                                  <p key={i} className="text-[#8b949e] leading-relaxed">
                                    {sentence}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onRetake}
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#30363d] hover:border-[#8b949e] rounded-xl text-sm text-[#8b949e] hover:text-[#e6edf3] transition-colors"
            >
              <RotateCcw size={15} /> Retake Exam
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#58a6ff]/40 bg-[#58a6ff]/10 hover:bg-[#58a6ff]/20 rounded-xl text-sm text-[#58a6ff] transition-colors"
            >
              <BookOpen size={15} /> Back to Study Guide
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT EXAM PAGE — state machine
// ─────────────────────────────────────────────────────────────────────────────
export default function ExamPage() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const examNum = examId === "3" ? 3 : examId === "2" ? 2 : 1;
  const examCtx: ExamDataCtx = examNum === 3
    ? { mcqs: examMCQs3, frqs: examFRQs3, examNum: 3, keys: makeExamKeys(3) }
    : examNum === 2
    ? { mcqs: examMCQs2, frqs: examFRQs2, examNum: 2, keys: makeExamKeys(2) }
    : EXAM1_CTX;
  const { keys, mcqs: examMcqs } = examCtx;

  const [phase, setPhase] = usePersistedState<ExamPhase>(keys.phase, "landing");
  const [mode, setMode] = usePersistedState<ExamMode>(keys.mode, "untimed");
  const [mcqAnswers, setMcqAnswers] = usePersistedState<Record<number, OptionId>>(keys.mcqAnswers, {});
  const [frqAnswers, setFrqAnswers] = usePersistedState<
    Record<number, { parts: Record<string, string>; selfScores: Record<string, boolean[]> }>
  >(keys.frqAnswers, {});

  const handleMCQAnswer = useCallback(
    (qId: number, opt: OptionId) =>
      setMcqAnswers((prev) => ({ ...prev, [qId]: opt })),
    []
  );

  const handleSaveFRQPart = useCallback(
    (frqId: number, letter: string, text: string) =>
      setFrqAnswers((prev) => ({
        ...prev,
        [frqId]: {
          ...prev[frqId],
          parts: { ...prev[frqId]?.parts, [letter]: text },
          selfScores: prev[frqId]?.selfScores ?? {},
        },
      })),
    []
  );

  const handleRetake = () => {
    clearExamStorage(keys);
    setPhase("landing");
    setMcqAnswers({});
    setFrqAnswers({});
    setMode("untimed");
  };

  const handleMCQSectionComplete = useCallback(() => {
    if (user) {
      const rows = examMcqs
        .filter((q) => mcqAnswers[q.id] !== undefined)
        .map((q) => ({
          mcqId: `exam${examNum}_q${q.id}`,
          topicId: q.cedTopic,
          correct: mcqAnswers[q.id] === q.correctId,
          source: "exam" as const,
        }));
      recordAttemptsBatch(user.id, rows);
    }
    setPhase("frq-intro");
  }, [user, examMcqs, mcqAnswers, examNum, setPhase]);

  return (
    <ExamDataContext.Provider value={examCtx}>
    <AnimatePresence mode="wait">
      {phase === "landing" && (
        <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ExamLanding onProceed={() => setPhase("mode")} />
        </motion.div>
      )}
      {phase === "mode" && (
        <motion.div key="mode" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ModeSelect
            onSelect={(m) => {
              setMode(m);
              setPhase("mcq");
            }}
          />
        </motion.div>
      )}
      {phase === "mcq" && (
        <motion.div key="mcq" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <MCQSection
            mode={mode}
            answers={mcqAnswers}
            onAnswer={handleMCQAnswer}
            onComplete={handleMCQSectionComplete}
            onExit={() => navigate("/")}
          />
        </motion.div>
      )}
      {phase === "frq-intro" && (
        <motion.div key="frq-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <FRQIntro mode={mode} onBegin={() => setPhase("frq")} />
        </motion.div>
      )}
      {phase === "frq" && (
        <motion.div key="frq" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <FRQSection
            mode={mode}
            frqAnswers={frqAnswers}
            onSavePart={handleSaveFRQPart}
            onComplete={() => setPhase("results")}
            onExit={() => navigate("/")}
          />
        </motion.div>
      )}
      {phase === "results" && (
        <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ResultsDashboard
            mcqAnswers={mcqAnswers}
            onRetake={handleRetake}
          />
        </motion.div>
      )}
    </AnimatePresence>
    </ExamDataContext.Provider>
  );
}
