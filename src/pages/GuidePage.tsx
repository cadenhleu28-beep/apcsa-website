import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ClipboardList, Brain, ArrowLeft,
  ChevronRight, RotateCcw, Trophy, BookOpen,
} from "lucide-react";

const steps = [
  {
    num: 1,
    icon: BookOpen,
    accent: "#58a6ff",
    border: "border-blue-500/25",
    badge: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    iconBg: "bg-blue-500/10 text-blue-400",
    title: "Review the Lessons",
    subtitle: "Optional but recommended",
    description:
      "Start by browsing the 4 unit lessons. Read the explanations, study the code examples, and answer the inline concept checks. Focus on topics you're not confident in — skip ahead if you know the material.",
    action: { label: "Go to Lessons", path: "/" },
  },
  {
    num: 2,
    icon: ClipboardList,
    accent: "#3fb950",
    border: "border-green-500/25",
    badge: "text-green-400 bg-green-500/10 border-green-500/20",
    iconBg: "bg-green-500/10 text-green-400",
    title: "Take Practice Exam 1",
    subtitle: "Treat it like the real thing",
    description:
      "Go in cold — don't look anything up. After you finish, review the performance breakdown to see exactly which topics you struggled with. This tells you where to focus next.",
    action: { label: "Practice Exam 1", path: "/exam/1" },
  },
  {
    num: 3,
    icon: Brain,
    accent: "#bc8cff",
    border: "border-violet-500/25",
    badge: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    iconBg: "bg-violet-500/10 text-violet-400",
    title: "Drill the MCQ Bank",
    subtitle: "Target your weak spots",
    description:
      "Use the MCQ Bank to drill specific topics where you lost points. Filter by unit or topic. If you're fuzzy on a concept, re-read the relevant lesson for a deeper explanation.",
    action: { label: "Open MCQ Bank", path: "/mcq-bank" },
  },
  {
    num: 4,
    icon: RotateCcw,
    accent: "#f78166",
    border: "border-orange-500/25",
    badge: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    iconBg: "bg-orange-500/10 text-orange-400",
    title: "Repeat with Exams 2 & 3",
    subtitle: "Keep the cycle going",
    description:
      "Once you feel confident on the topics you drilled, move on to Practice Exam 2. Review that breakdown, drill again, then take Exam 3. Each cycle closes knowledge gaps.",
    action: { label: "Practice Exam 2", path: "/exam/2" },
  },
];

function StepCard({
  step, idx, onAction,
}: {
  step: typeof steps[0];
  idx: number;
  onAction: (path: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: idx * 0.06, ease: "easeOut" }}
    >
      <div
        className={`rounded-lg border bg-[#161b22] ${step.border} p-5 hover:bg-[#1a1f27] transition-colors duration-200`}
        style={{ borderLeftWidth: "3px", borderLeftColor: step.accent }}
      >
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div className={`p-2 rounded-md ${step.iconBg}`}>
              <Icon size={18} />
            </div>
            <span className={`text-xs font-mono px-1.5 py-0.5 rounded border ${step.badge}`}>
              {String(step.num).padStart(2, "0")}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 mb-1 flex-wrap">
              <h2 className="font-semibold text-[#e6edf3]">{step.title}</h2>
              <span className="text-xs font-mono text-[#484f58]">{step.subtitle}</span>
            </div>
            <p className="text-sm text-[#8b949e] leading-relaxed mb-4">{step.description}</p>
            <button
              onClick={() => onAction(step.action.path)}
              className={`inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1.5 rounded border transition-all duration-150 hover:opacity-100 opacity-80 ${step.badge}`}
            >
              {step.action.label}
              <ChevronRight size={11} />
            </button>
          </div>
        </div>
      </div>

      {/* Connector */}
      {idx < steps.length - 1 && (
        <div className="flex justify-center py-2">
          <div className="w-px h-6 bg-[#30363d]/60" />
        </div>
      )}
    </motion.div>
  );
}

export default function GuidePage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const tipInView = useInView(tipRef, { once: true, margin: "-5%" });

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col">

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#30363d]/60 bg-[#0d1117]/90 backdrop-blur-sm px-5 py-2.5 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#58a6ff]" />
        <button
          onClick={() => navigate("/")}
          className="text-xs font-mono text-[#6e7681] hover:text-[#e6edf3] transition-colors"
        >
          apcsa
        </button>
        <span className="text-xs font-mono text-[#30363d]">/</span>
        <span className="text-xs font-mono text-[#e6edf3]">guide</span>
        <div className="ml-auto">
          <span className="text-xs font-mono text-[#3fb950] bg-green-900/15 border border-green-800/30 px-2 py-0.5 rounded">
            2025–2026 CED
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto w-full px-5 sm:px-8 py-10">

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm font-mono text-[#6e7681] hover:text-[#e6edf3] transition-colors mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to home
        </button>

        {/* Hero */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-10"
        >
          <p className="text-xs font-mono tracking-widest text-[#58a6ff] uppercase mb-3">
            Recommended Study Plan
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            How to Use <span className="text-[#58a6ff]">This Site</span>
          </h1>
          <p className="text-[#8b949e] leading-relaxed text-sm sm:text-base">
            Follow this cycle to make the most of the lessons, MCQ bank, and practice exams — and walk into the AP exam confident.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mb-4">
          {steps.map((step, i) => (
            <StepCard
              key={step.num}
              step={step}
              idx={i}
              onAction={(path) => navigate(path)}
            />
          ))}

          {/* Final state */}
          <div className="flex justify-center py-2">
            <div className="w-px h-6 bg-[#30363d]/60" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="rounded-lg border border-[#3fb950]/25 bg-[#161b22] p-5 text-center"
            style={{ borderLeftWidth: "3px", borderLeftColor: "#3fb950" }}
          >
            <div className="inline-flex items-center justify-center p-2.5 rounded-md bg-[#3fb950]/10 text-[#3fb950] mb-3">
              <Trophy size={20} />
            </div>
            <h2 className="font-semibold text-[#3fb950] mb-1">Exam-Ready</h2>
            <p className="text-sm text-[#8b949e] leading-relaxed">
              After all three practice exams and drilling your weak topics, you've seen every question type. Go get that 5.
            </p>
          </motion.div>
        </div>

        {/* Pro tip */}
        <motion.div
          ref={tipRef}
          initial={{ opacity: 0, y: 10 }}
          animate={tipInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mt-8 rounded-md border border-[#30363d]/60 bg-[#161b22]/60 px-4 py-4"
        >
          <p className="text-xs font-mono text-[#58a6ff] mb-1.5 uppercase tracking-widest">Pro tip</p>
          <p className="text-sm text-[#8b949e] leading-relaxed">
            Don't skip to Practice Exam 2 after Exam 1 — even with a high score. Use the MCQ Bank to drill every topic you got wrong. One missed concept on the real exam costs more than 10 minutes of drilling now.
          </p>
        </motion.div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-sm font-mono text-[#6e7681] hover:text-[#e6edf3] transition-colors"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
