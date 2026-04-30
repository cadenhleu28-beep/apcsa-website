import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Eye, EyeOff, CheckCircle, XCircle, LogIn } from "lucide-react";
import { allSubUnits, prevSubUnit, nextSubUnit } from "../data/curriculum";
import type { MCQ, ConceptCheck, CodeExample } from "../types/curriculum";
import { useAuth } from "../context/AuthContext";
import { loadAllProgress, saveSubUnitProgress } from "../lib/progress";

// ── Java syntax highlighter ───────────────────────────────────────────────────
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
  keyword: "#ff7b72",   // red-pink
  string:  "#a5d6ff",   // light blue
  comment: "#8b949e",   // muted gray
  number:  "#79c0ff",   // blue
  code:    "#e6edf3",   // default white
};

function tokenizeJava(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < code.length) {
    // Single-line comment
    if (code[i] === "/" && code[i + 1] === "/") {
      const end = code.indexOf("\n", i);
      const text = end === -1 ? code.slice(i) : code.slice(i, end);
      tokens.push({ type: "comment", text });
      i += text.length;
      continue;
    }
    // String literal
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
    // Number literal
    if (/[0-9]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[0-9._]/.test(code[j])) j++;
      tokens.push({ type: "number", text: code.slice(i, j) });
      i = j;
      continue;
    }
    // Identifier or keyword
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);
      tokens.push({ type: JAVA_KEYWORDS.has(word) ? "keyword" : "code", text: word });
      i = j;
      continue;
    }
    // Everything else (operators, punctuation, whitespace, newlines)
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

// ── Code Example block ────────────────────────────────────────────────────────
function CodeBlock({ example }: { example: CodeExample }) {
  return (
    <div className="rounded-lg border border-[#30363d] overflow-hidden mb-6">
      <div className="bg-[#21262d] border-b border-[#30363d] px-4 py-2 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs font-mono text-[#6e7681]">{example.title}</span>
      </div>
      <pre className="bg-[#0d1117] overflow-x-auto p-5 text-sm font-mono leading-relaxed">
        <code><HighlightedCode code={example.code} /></code>
      </pre>
      <div className="bg-[#161b22] border-t border-[#30363d] px-4 py-3">
        <p className="text-sm text-[#8b949e] leading-relaxed">{example.explanation}</p>
      </div>
    </div>
  );
}

// ── Concept Check card ────────────────────────────────────────────────────────
function ConceptCheckCard({ check }: { check: ConceptCheck }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-5 mb-4">
      <p className="text-sm font-medium text-[#e6edf3] mb-3">{check.prompt}</p>

      {check.code && (
        <pre className="bg-[#0d1117] border border-[#30363d] rounded-md overflow-x-auto p-4 text-sm font-mono leading-relaxed mb-4">
          <code><HighlightedCode code={check.code} /></code>
        </pre>
      )}

      {check.hint && !revealed && (
        <p className="text-xs font-mono text-[#6e7681] mb-3">
          Hint: {check.hint}
        </p>
      )}

      <button
        onClick={() => setRevealed((r) => !r)}
        className="flex items-center gap-2 text-xs font-mono text-[#58a6ff] hover:text-[#79c0ff] transition-colors"
      >
        {revealed ? <EyeOff size={14} /> : <Eye size={14} />}
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
            <div className="mt-3 rounded-md border border-[#3fb950]/30 bg-[#3fb950]/5 p-4">
              <pre className="text-sm font-mono text-[#3fb950] whitespace-pre-wrap leading-relaxed">
                {check.answer}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── MCQ card ──────────────────────────────────────────────────────────────────
function MCQCard({
  mcq,
  index,
  initialSelected,
  onAnswer,
}: {
  mcq: MCQ;
  index: number;
  initialSelected?: string;
  onAnswer?: (mcqId: string, optionId: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(initialSelected ?? null);
  const answered = selected !== null;
  const correct = selected === mcq.correctId;

  function handleSelect(optionId: string) {
    if (answered) return;
    setSelected(optionId);
    onAnswer?.(mcq.id, optionId);
  }

  function optionStyle(id: string) {
    if (!answered) {
      return "border-[#30363d] bg-[#0d1117] hover:border-[#58a6ff]/50 hover:bg-[#58a6ff]/5 cursor-pointer";
    }
    if (id === mcq.correctId) {
      return "border-[#3fb950]/60 bg-[#3fb950]/10 cursor-default";
    }
    if (id === selected) {
      return "border-[#f85149]/60 bg-[#f85149]/10 cursor-default";
    }
    return "border-[#30363d] bg-[#0d1117] opacity-50 cursor-default";
  }

  return (
    <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-5 mb-5">
      {/* Question header */}
      <div className="flex items-start gap-3 mb-4">
        <span className="shrink-0 text-xs font-mono text-[#6e7681] bg-[#21262d] border border-[#30363d] rounded px-2 py-1">
          Q{index + 1}
        </span>
        <p className="text-sm text-[#e6edf3] leading-relaxed">{mcq.question}</p>
      </div>

      {/* Optional code */}
      {mcq.code && (
        <pre className="bg-[#0d1117] border border-[#30363d] rounded-md overflow-x-auto p-4 text-sm font-mono leading-relaxed mb-4">
          <code><HighlightedCode code={mcq.code} /></code>
        </pre>
      )}

      {/* Answer choices */}
      <div className="space-y-2 mb-4">
        {mcq.options.map((opt) => (
          <button
            key={opt.id}
            disabled={answered}
            onClick={() => handleSelect(opt.id)}
            className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-md border text-sm transition-all duration-150 ${optionStyle(opt.id)}`}
          >
            <span className="font-mono text-xs text-[#6e7681] shrink-0 w-4">{opt.id}</span>
            <span className="text-[#e6edf3]">{opt.text}</span>
            {answered && opt.id === mcq.correctId && (
              <CheckCircle size={15} className="ml-auto shrink-0 text-[#3fb950]" />
            )}
            {answered && opt.id === selected && opt.id !== mcq.correctId && (
              <XCircle size={15} className="ml-auto shrink-0 text-[#f85149]" />
            )}
          </button>
        ))}
      </div>

      {/* Result + explanation */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`flex items-center gap-2 text-sm font-mono mb-3 ${correct ? "text-[#3fb950]" : "text-[#f85149]"}`}
            >
              {correct ? (
                <><CheckCircle size={15} /> Correct!</>
              ) : (
                <><XCircle size={15} /> Incorrect — the answer is {mcq.correctId}</>
              )}
            </div>
            <div className="rounded-md border border-[#58a6ff]/20 bg-[#58a6ff]/5 p-4">
              <p className="text-xs font-mono text-[#6e7681] mb-1 uppercase tracking-wide">
                Explanation
              </p>
              <p className="text-sm text-[#8b949e] leading-relaxed">{mcq.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function SubUnitPage() {
  const { unitId, subSlug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // mcqAnswers: mcqId -> chosen option id
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, string>>({});
  const [alreadyComplete, setAlreadyComplete] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMcqAnswers({});
    setAlreadyComplete(false);
  }, [unitId, subSlug]);

  // Load saved progress for this sub-unit
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
        <p className="font-mono text-[#8b949e]">Sub-unit not found.</p>
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

      {/* Top bar */}
      <header className="border-b border-[#30363d] px-6 py-3 flex items-center gap-3">
        <BookOpen size={18} className="text-[#58a6ff]" />
        <span className="text-sm font-mono text-[#8b949e]">
          <button onClick={() => navigate("/")} className="hover:text-[#58a6ff] transition-colors">
            Study Guide
          </button>
          <span className="mx-2 text-[#30363d]">/</span>
          <button onClick={() => navigate(`/unit/${unit.id}`)} className="hover:text-[#58a6ff] transition-colors">
            Unit {unit.id}
          </button>
          <span className="mx-2 text-[#30363d]">/</span>
          <span className="text-[#e6edf3]">{sub.title}</span>
        </span>
      </header>

      <div className="max-w-3xl mx-auto w-full px-6 py-12 flex-1">

        {/* Back to unit */}
        <button
          onClick={() => navigate(`/unit/${unit.id}`)}
          className="flex items-center gap-2 text-sm text-[#8b949e] hover:text-[#e6edf3] transition-colors mb-8 font-mono"
        >
          <ArrowLeft size={15} />
          Unit {unit.id}: {unit.title}
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-mono text-[#6e7681] mb-2">
            Topics {sub.cedTopics.join(", ")}
          </p>
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-bold text-[#e6edf3]">{sub.title}</h1>
            {alreadyComplete && (
              <span className="flex items-center gap-1.5 text-xs font-mono text-[#3fb950] bg-[#3fb950]/10 border border-[#3fb950]/30 px-2.5 py-1 rounded-full shrink-0">
                <CheckCircle size={12} />
                Complete
              </span>
            )}
          </div>
          <p className="text-[#8b949e] leading-relaxed mb-8">{sub.description}</p>

          {/* Objectives */}
          <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-5 mb-10">
            <h2 className="text-xs font-mono text-[#58a6ff] mb-3 uppercase tracking-widest">
              Learning Objectives
            </h2>
            <ul className="space-y-2">
              {sub.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#8b949e]">
                  <span className="text-[#3fb950] mt-0.5 shrink-0">✓</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Code Examples */}
          {sub.codeExamples.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xs font-mono text-[#6e7681] uppercase tracking-widest mb-5">
                Code Examples
              </h2>
              {sub.codeExamples.map((ex) => (
                <CodeBlock key={ex.id} example={ex} />
              ))}
            </section>
          )}

          {/* Concept Checks */}
          {sub.conceptChecks.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xs font-mono text-[#6e7681] uppercase tracking-widest mb-2">
                Concept Checks
              </h2>
              <p className="text-xs text-[#6e7681] mb-5">
                Trace the code mentally, then reveal the answer.
              </p>
              {sub.conceptChecks.map((cc) => (
                <ConceptCheckCard key={cc.id} check={cc} />
              ))}
            </section>
          )}

          {/* MCQ Section */}
          {sub.mcqs.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-mono text-[#6e7681] uppercase tracking-widest">
                  Practice MCQs
                </h2>
                <span className="text-xs font-mono text-[#484f58]">
                  {Object.keys(mcqAnswers).length}/{sub.mcqs.length} answered
                </span>
              </div>
              {!user && (
                <button
                  onClick={() => navigate("/auth")}
                  className="flex items-center gap-1.5 text-xs font-mono text-[#58a6ff] hover:text-[#79c0ff] transition-colors mb-4"
                >
                  <LogIn size={12} />
                  Log in to save your answers
                </button>
              )}
              <p className="text-xs text-[#6e7681] mb-5">
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

              {/* Completion banner — slides in when all MCQs answered */}
              <AnimatePresence>
                {alreadyComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 rounded-lg border border-[#3fb950]/40 bg-[#3fb950]/5 px-4 py-3 mt-2"
                  >
                    <CheckCircle size={16} className="text-[#3fb950] shrink-0" />
                    <div>
                      <p className="text-sm font-mono text-[#3fb950] font-medium">
                        Lesson complete!
                      </p>
                      <p className="text-xs text-[#8b949e] mt-0.5">
                        {user ? "Progress saved to your account." : "Log in to save your progress across devices."}
                      </p>
                    </div>
                    {next && (
                      <button
                        onClick={() => navigate(`/unit/${next.unit.id}/${next.slug}`)}
                        className="ml-auto flex items-center gap-1.5 text-xs font-mono text-[#3fb950] hover:text-[#56d364] transition-colors shrink-0"
                      >
                        Next lesson
                        <ArrowRight size={13} />
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          )}

          {/* Placeholder if no content yet */}
          {!hasContent && (
            <div className="rounded-lg border border-dashed border-[#30363d] bg-[#161b22]/50 p-8 text-center mb-8">
              <p className="text-sm font-mono text-[#6e7681]">
                Lesson content, code examples, and concept checks coming soon.
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Back / Next nav */}
      <footer className="border-t border-[#30363d] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          {prev ? (
            <button
              onClick={() => navigate(`/unit/${prev.unit.id}/${prev.slug}`)}
              className="flex items-center gap-2 text-sm text-[#8b949e] hover:text-[#e6edf3] transition-colors font-mono group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="truncate max-w-[200px]">{prev.title}</span>
            </button>
          ) : (
            <div />
          )}

          {next ? (
            <button
              onClick={() => navigate(`/unit/${next.unit.id}/${next.slug}`)}
              className="flex items-center gap-2 text-sm text-[#8b949e] hover:text-[#e6edf3] transition-colors font-mono group ml-auto"
            >
              <span className="truncate max-w-[200px]">{next.title}</span>
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </footer>
    </div>
  );
}
