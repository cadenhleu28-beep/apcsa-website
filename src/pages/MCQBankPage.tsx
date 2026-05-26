import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  RefreshCw,
  LayoutGrid,
  Target,
} from "lucide-react";
import { mcqBank } from "../data/mcqBank";
import type { MCQQuestion } from "../types/mcq";
import { useAuth } from "../context/AuthContext";
import { recordAttempt } from "../lib/attempts";

type Mode = "whole-unit" | "specific-topic";
type Step = "mode" | "unit" | "count" | "topic" | "quiz" | "summary";

interface QuizResult {
  question: MCQQuestion;
  userAnswer: string;
  correct: boolean;
}

function splitExplanation(text: string): string[] {
  const parts = text
    .split(/(?<=[.!?])\s+(?=[A-Z"'(])/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length > 1 ? parts : [text];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const UNIT_COLORS: Record<
  number,
  { border: string; hover: string; text: string }
> = {
  1: {
    border: "border-blue-500/40",
    hover: "hover:border-blue-400/60",
    text: "text-blue-400",
  },
  2: {
    border: "border-green-500/40",
    hover: "hover:border-green-400/60",
    text: "text-green-400",
  },
  3: {
    border: "border-purple-500/40",
    hover: "hover:border-purple-400/60",
    text: "text-purple-400",
  },
  4: {
    border: "border-orange-500/40",
    hover: "hover:border-orange-400/60",
    text: "text-orange-400",
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.22 },
};

export default function MCQBankPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Step / selection state
  const [step, setStep] = useState<Step>("mode");
  const [mode, setMode] = useState<Mode>("whole-unit");
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const [questionCount, setQuestionCount] = useState(10);

  // Quiz state
  const [quizBatch, setQuizBatch] = useState<MCQQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [allResults, setAllResults] = useState<QuizResult[]>([]);

  // Specific topic cycling
  const [topicPool, setTopicPool] = useState<MCQQuestion[]>([]);
  const [topicPoolIndex, setTopicPoolIndex] = useState(0);
  const [sessionAnsweredCount, setSessionAnsweredCount] = useState(0);

  const unit = mcqBank.find((u) => u.id === selectedUnitId) ?? null;
  const currentQuestion = quizBatch[currentIdx] ?? null;
  const isLastInBatch = currentIdx === quizBatch.length - 1;

  // Navigation
  const goBack = () => {
    switch (step) {
      case "mode":
        navigate("/");
        break;
      case "unit":
        setStep("mode");
        break;
      case "count":
        setStep("unit");
        break;
      case "topic":
        setStep("unit");
        break;
      case "quiz":
        if (mode === "whole-unit") setStep("count");
        else setStep("topic");
        break;
      case "summary":
        setStep("mode");
        break;
    }
  };

  // Quiz initialization
  const startWholeUnitQuiz = (unitId: number, count: number) => {
    const u = mcqBank.find((u) => u.id === unitId)!;
    const all = u.topics.flatMap((t) => t.questions);
    setQuizBatch(shuffle(all).slice(0, count));
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAllResults([]);
    setStep("quiz");
  };

  const startSpecificTopicQuiz = (unitId: number, topicId: string) => {
    const u = mcqBank.find((u) => u.id === unitId)!;
    const t = u.topics.find((t) => t.id === topicId)!;
    const pool = shuffle([...t.questions]);
    setTopicPool(pool);
    setTopicPoolIndex(0);
    setSessionAnsweredCount(0);
    setQuizBatch(pool.slice(0, 5));
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAllResults([]);
    setStep("quiz");
  };

  // Quiz actions
  const handleSelectAnswer = (letter: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(letter);
    setShowFeedback(true);
    if (mode === "specific-topic") setSessionAnsweredCount((c) => c + 1);

    if (user && currentQuestion) {
      recordAttempt(
        user.id,
        currentQuestion.id,
        currentQuestion.topicId,
        letter === currentQuestion.answer,
        "bank",
      );
    }
  };

  const commitResult = (prevResults: QuizResult[]): QuizResult[] => [
    ...prevResults,
    {
      question: currentQuestion!,
      userAnswer: selectedAnswer!,
      correct: selectedAnswer === currentQuestion!.answer,
    },
  ];

  const handleNext = () => {
    setAllResults(commitResult);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCurrentIdx((i) => i + 1);
  };

  const handleGoAgain = () => {
    setAllResults(commitResult);
    let newPool = topicPool;
    let newIdx = topicPoolIndex + 5;
    if (newIdx >= newPool.length) {
      newPool = shuffle([...newPool]);
      setTopicPool(newPool);
      newIdx = 0;
    }
    setTopicPoolIndex(newIdx);
    setQuizBatch(newPool.slice(newIdx, newIdx + 5));
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleSeeResults = () => {
    setAllResults(commitResult);
    setStep("summary");
  };

  // Answer button styling
  const answerStyle = (letter: string) => {
    const base =
      "w-full text-left px-4 py-3 rounded-lg border font-mono text-sm transition-all duration-150 flex items-start gap-3";
    if (!selectedAnswer)
      return `${base} border-[#30363d] bg-[#161b22] hover:border-[#58a6ff] hover:bg-[#1c2128] cursor-pointer`;
    if (letter === currentQuestion?.answer)
      return `${base} border-[#3fb950] bg-green-900/20 text-[#3fb950] cursor-default`;
    if (letter === selectedAnswer)
      return `${base} border-[#ff7b72] bg-red-900/20 text-[#ff7b72] cursor-default`;
    return `${base} border-[#30363d] bg-[#161b22] opacity-40 cursor-default`;
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#30363d] px-6 py-3 flex items-center gap-3">
        <button
          onClick={goBack}
          className="flex items-center gap-1 text-xs font-mono text-[#8b949e] hover:text-[#e6edf3] transition-colors"
        >
          <ChevronLeft size={14} />
          {step === "mode" ? "Home" : "Back"}
        </button>
        <span className="text-[#30363d]">/</span>
        <Brain size={15} className="text-violet-400" />
        <span className="text-sm font-mono text-[#e6edf3]">MCQ Bank</span>

        {step === "quiz" && mode === "specific-topic" && (
          <span className="ml-auto text-xs font-mono text-[#8b949e]">
            {sessionAnsweredCount} answered this session
          </span>
        )}
        {step === "quiz" && mode === "whole-unit" && quizBatch.length > 0 && (
          <span className="ml-auto text-xs font-mono text-[#8b949e]">
            {Math.min(currentIdx + 1, quizBatch.length)} / {quizBatch.length}
          </span>
        )}
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
        <AnimatePresence mode="wait">
          {/* ── Mode Select ─────────────────────────────────────────── */}
          {step === "mode" && (
            <motion.div key="mode" {...fadeUp}>
              <h1 className="text-2xl font-bold mb-2">MCQ Bank</h1>
              <p className="text-sm text-[#8b949e] font-mono mb-8">
                Comprehensive question bank across all 4 units — choose a mode to begin.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setMode("whole-unit");
                    setStep("unit");
                  }}
                  className="group text-left rounded-xl border border-violet-500/40 hover:border-violet-400/70 bg-[#161b22] hover:bg-[#1c2128] p-6 transition-all duration-200 hover:shadow-lg hover:shadow-black/30"
                >
                  <div className="p-2.5 rounded-lg bg-[#21262d] text-violet-400 w-fit mb-4">
                    <LayoutGrid size={22} />
                  </div>
                  <h2 className="text-lg font-semibold text-violet-400 mb-2">
                    Whole Unit
                  </h2>
                  <p className="text-sm text-[#8b949e] leading-relaxed">
                    Draw questions randomly across all topics in a unit.
                    One-and-done quiz with a score at the end.
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-mono text-[#6e7681] group-hover:text-violet-400 transition-colors">
                    <span>10 / 15 / 20 / 25 questions</span>
                    <ChevronRight size={13} />
                  </div>
                </button>

                <button
                  onClick={() => {
                    setMode("specific-topic");
                    setStep("unit");
                  }}
                  className="group text-left rounded-xl border border-cyan-500/40 hover:border-cyan-400/70 bg-[#161b22] hover:bg-[#1c2128] p-6 transition-all duration-200 hover:shadow-lg hover:shadow-black/30"
                >
                  <div className="p-2.5 rounded-lg bg-[#21262d] text-cyan-400 w-fit mb-4">
                    <Target size={22} />
                  </div>
                  <h2 className="text-lg font-semibold text-cyan-400 mb-2">
                    Specific Topic
                  </h2>
                  <p className="text-sm text-[#8b949e] leading-relaxed">
                    Pick one topic and drill it — 5 questions per round,
                    cycling infinitely. No finish line.
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-mono text-[#6e7681] group-hover:text-cyan-400 transition-colors">
                    <span>Infinite cycling per topic</span>
                    <ChevronRight size={13} />
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Unit Select ─────────────────────────────────────────── */}
          {step === "unit" && (
            <motion.div key="unit" {...fadeUp}>
              <h1 className="text-2xl font-bold mb-2">Select a Unit</h1>
              <p className="text-sm text-[#8b949e] font-mono mb-8">
                {mode === "whole-unit"
                  ? "Questions will be drawn from all topics in this unit."
                  : "You'll pick a specific topic from this unit."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mcqBank.map((u) => {
                  const c = UNIT_COLORS[u.id];
                  return (
                    <button
                      key={u.id}
                      onClick={() => {
                        setSelectedUnitId(u.id);
                        setStep(mode === "whole-unit" ? "count" : "topic");
                      }}
                      className={`group text-left rounded-xl border ${c.border} ${c.hover} bg-[#161b22] hover:bg-[#1c2128] p-5 transition-all duration-200 hover:shadow-lg hover:shadow-black/30`}
                    >
                      <p className="text-xs font-mono text-[#8b949e] mb-1">
                        Unit {u.id}
                      </p>
                      <h2 className={`text-base font-semibold ${c.text} mb-2`}>
                        {u.title}
                      </h2>
                      <p className="text-xs font-mono text-[#6e7681]">
                        {u.topics.length} topics
                      </p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── Count Select ─────────────────────────────────────────── */}
          {step === "count" && (
            <motion.div key="count" {...fadeUp}>
              <h1 className="text-2xl font-bold mb-2">How many questions?</h1>
              <p className="text-sm text-[#8b949e] font-mono mb-8">
                Drawn randomly from all {unit?.topics.length} topics in Unit{" "}
                {unit?.id} — {unit?.title}.
              </p>
              <div className="grid grid-cols-4 gap-3 mb-8">
                {[10, 15, 20, 25].map((n) => (
                  <button
                    key={n}
                    onClick={() => setQuestionCount(n)}
                    className={`py-4 rounded-xl border font-mono text-xl font-bold transition-all duration-150 ${
                      questionCount === n
                        ? "border-violet-400/70 bg-violet-900/20 text-violet-400"
                        : "border-[#30363d] bg-[#161b22] text-[#8b949e] hover:border-[#58a6ff]/50 hover:text-[#e6edf3]"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <button
                onClick={() =>
                  selectedUnitId &&
                  startWholeUnitQuiz(selectedUnitId, questionCount)
                }
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors duration-150"
              >
                Start Quiz
                <ChevronRight size={16} />
              </button>
            </motion.div>
          )}

          {/* ── Topic Select ─────────────────────────────────────────── */}
          {step === "topic" && unit && (
            <motion.div key="topic" {...fadeUp}>
              <h1 className="text-2xl font-bold mb-2">Select a Topic</h1>
              <p className="text-sm text-[#8b949e] font-mono mb-1">
                Unit {unit.id} — {unit.title}
              </p>
              <p className="text-xs text-[#6e7681] font-mono mb-6">
                Topics are numbered by their official CED section (e.g. {unit.id}.1, {unit.id}.2&hellip;)
              </p>
              <div className="flex flex-col gap-2">
                {unit.topics.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      startSpecificTopicQuiz(selectedUnitId!, t.id);
                    }}
                    className="group flex items-center justify-between text-left rounded-lg border border-[#30363d] hover:border-cyan-400/50 bg-[#161b22] hover:bg-[#1c2128] px-4 py-3 transition-all duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-cyan-900/30 border border-cyan-400/20 text-cyan-400 shrink-0">
                        {t.id}
                      </span>
                      <span className="text-sm text-[#e6edf3]">{t.label}</span>
                    </div>
                    <ChevronRight
                      size={14}
                      className="text-[#6e7681] group-hover:text-cyan-400 transition-colors shrink-0 ml-3"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Quiz ────────────────────────────────────────────────── */}
          {step === "quiz" && (
            <motion.div key={`quiz-${currentIdx}`} {...fadeUp}>
              {quizBatch.length === 0 ? (
                <div className="text-center py-16">
                  <Brain size={40} className="text-[#6e7681] mx-auto mb-4" />
                  <h2 className="text-lg font-semibold text-[#8b949e] mb-2">
                    No questions yet
                  </h2>
                  <p className="text-sm text-[#6e7681] font-mono mb-6">
                    Questions for this{" "}
                    {mode === "whole-unit" ? "unit" : "topic"} are coming soon.
                  </p>
                  <button
                    onClick={goBack}
                    className="px-4 py-2 rounded-lg border border-[#30363d] hover:border-[#58a6ff]/50 text-sm font-mono text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                  >
                    Go back
                  </button>
                </div>
              ) : currentQuestion ? (
                <div>
                  {/* Progress bar */}
                  <div className="flex gap-1 mb-6">
                    {quizBatch.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          i < currentIdx
                            ? mode === "whole-unit"
                              ? allResults[i]?.correct
                                ? "bg-[#3fb950]"
                                : "bg-[#ff7b72]"
                              : "bg-cyan-400/60"
                            : i === currentIdx
                              ? mode === "whole-unit"
                                ? "bg-violet-400"
                                : "bg-cyan-400"
                              : "bg-[#21262d]"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Topic label */}
                  <p className="text-xs font-mono text-[#8b949e] mb-3">
                    {currentQuestion.topicId} — {currentQuestion.topicLabel}
                  </p>

                  {/* Question */}
                  <h2 className="text-base font-medium text-[#e6edf3] mb-4 leading-relaxed">
                    {currentQuestion.question}
                  </h2>

                  {/* Optional code block */}
                  {currentQuestion.code && (
                    <pre className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 text-sm font-mono text-[#e6edf3] overflow-x-auto mb-4 leading-relaxed">
                      <code>{currentQuestion.code}</code>
                    </pre>
                  )}

                  {/* Answer choices */}
                  <div className="flex flex-col gap-2 mb-6">
                    {currentQuestion.options.map((opt) => (
                      <button
                        key={opt.letter}
                        onClick={() => handleSelectAnswer(opt.letter)}
                        disabled={!!selectedAnswer}
                        className={answerStyle(opt.letter)}
                      >
                        <span className="font-bold shrink-0">{opt.letter}.</span>
                        <span>{opt.text}</span>
                      </button>
                    ))}
                  </div>

                  {/* Feedback */}
                  <AnimatePresence>
                    {showFeedback && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 overflow-hidden"
                      >
                        <div
                          className={`flex items-start gap-3 p-4 rounded-lg border ${
                            selectedAnswer === currentQuestion.answer
                              ? "border-[#3fb950]/50 bg-green-900/10"
                              : "border-[#ff7b72]/50 bg-red-900/10"
                          }`}
                        >
                          {selectedAnswer === currentQuestion.answer ? (
                            <CheckCircle2
                              size={16}
                              className="text-[#3fb950] shrink-0 mt-0.5"
                            />
                          ) : (
                            <XCircle
                              size={16}
                              className="text-[#ff7b72] shrink-0 mt-0.5"
                            />
                          )}
                          <div>
                            <p
                              className={`text-xs font-mono font-semibold mb-1 ${
                                selectedAnswer === currentQuestion.answer
                                  ? "text-[#3fb950]"
                                  : "text-[#ff7b72]"
                              }`}
                            >
                              {selectedAnswer === currentQuestion.answer
                                ? "Correct!"
                                : `Incorrect — correct answer: ${currentQuestion.answer}`}
                            </p>
                            <div className="mt-1 space-y-2">
                              {splitExplanation(currentQuestion.explanation).map((sentence, i) => (
                                <p key={i} className="text-sm text-[#8b949e] leading-relaxed">
                                  {sentence}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action button */}
                  {showFeedback && (
                    <div className="flex justify-end">
                      {mode === "whole-unit" && !isLastInBatch && (
                        <button
                          onClick={handleNext}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] hover:border-violet-400/40 font-mono text-sm text-[#e6edf3] transition-all duration-150"
                        >
                          Next Question
                          <ChevronRight size={15} />
                        </button>
                      )}
                      {mode === "whole-unit" && isLastInBatch && (
                        <button
                          onClick={handleSeeResults}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 font-mono text-sm text-white transition-colors duration-150"
                        >
                          See Results
                          <ChevronRight size={15} />
                        </button>
                      )}
                      {mode === "specific-topic" && !isLastInBatch && (
                        <button
                          onClick={handleNext}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] hover:border-cyan-400/40 font-mono text-sm text-[#e6edf3] transition-all duration-150"
                        >
                          Next Question
                          <ChevronRight size={15} />
                        </button>
                      )}
                      {mode === "specific-topic" && isLastInBatch && (
                        <button
                          onClick={handleGoAgain}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-700 hover:bg-cyan-600 font-mono text-sm text-white transition-colors duration-150"
                        >
                          Go Again
                          <RefreshCw size={14} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : null}
            </motion.div>
          )}

          {/* ── Summary ─────────────────────────────────────────────── */}
          {step === "summary" && (
            <motion.div key="summary" {...fadeUp}>
              {(() => {
                const correct = allResults.filter((r) => r.correct).length;
                const total = allResults.length;
                const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

                const byTopic: Record<
                  string,
                  { label: string; correct: number; total: number }
                > = {};
                for (const r of allResults) {
                  const key = r.question.topicId;
                  if (!byTopic[key])
                    byTopic[key] = {
                      label: r.question.topicLabel,
                      correct: 0,
                      total: 0,
                    };
                  byTopic[key].total++;
                  if (r.correct) byTopic[key].correct++;
                }

                return (
                  <>
                    {/* Score */}
                    <div className="text-center mb-10">
                      <p className="text-xs font-mono text-[#8b949e] uppercase tracking-widest mb-3">
                        Unit {selectedUnitId} — {unit?.title}
                      </p>
                      <div className="text-6xl font-bold mb-2">
                        <span
                          className={
                            pct >= 70
                              ? "text-[#3fb950]"
                              : pct >= 50
                                ? "text-[#ffa657]"
                                : "text-[#ff7b72]"
                          }
                        >
                          {correct}
                        </span>
                        <span className="text-[#30363d]"> / </span>
                        <span className="text-[#8b949e]">{total}</span>
                      </div>
                      <p className="text-lg font-mono text-[#8b949e]">
                        {pct}% correct
                      </p>
                    </div>

                    {/* Topic breakdown */}
                    {Object.keys(byTopic).length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-xs font-mono text-[#8b949e] uppercase tracking-widest mb-3">
                          By Topic
                        </h3>
                        <div className="flex flex-col gap-2">
                          {Object.entries(byTopic).map(([topicId, data]) => (
                            <div
                              key={topicId}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#161b22] border border-[#30363d]"
                            >
                              <span className="text-xs font-mono text-[#8b949e] w-8 shrink-0">
                                {topicId}
                              </span>
                              <span className="text-sm text-[#e6edf3] flex-1 text-left">
                                {data.label}
                              </span>
                              <span
                                className={`text-xs font-mono shrink-0 ${
                                  data.correct === data.total
                                    ? "text-[#3fb950]"
                                    : data.correct === 0
                                      ? "text-[#ff7b72]"
                                      : "text-[#ffa657]"
                                }`}
                              >
                                {data.correct}/{data.total}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          selectedUnitId &&
                          startWholeUnitQuiz(selectedUnitId, questionCount)
                        }
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 font-semibold text-white transition-colors duration-150"
                      >
                        <RefreshCw size={15} />
                        Try Again
                      </button>
                      <button
                        onClick={() => setStep("mode")}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-[#30363d] hover:border-[#58a6ff]/50 bg-[#161b22] hover:bg-[#1c2128] font-semibold text-[#8b949e] hover:text-[#e6edf3] transition-all duration-150"
                      >
                        Back to Menu
                      </button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
