import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, ClipboardList, Brain, ArrowLeft, ChevronRight, RotateCcw, Trophy, ArrowDown } from "lucide-react";

const steps = [
  {
    num: 1,
    icon: BookOpen,
    color: "blue",
    title: "Review the Lessons",
    subtitle: "Optional but recommended",
    description:
      "Start by browsing the 4 unit lessons. Read the explanations, study the code examples, and answer the inline concept checks. Focus on topics you're not already confident in — you can always skip ahead if you know the material.",
    action: { label: "Go to Lessons", path: "/" },
    border: "border-blue-500/40",
    badge: "bg-blue-500/10 text-blue-400",
    iconBg: "bg-blue-900/30 text-blue-400",
    glow: "shadow-blue-900/20",
  },
  {
    num: 2,
    icon: ClipboardList,
    color: "green",
    title: "Take Practice Exam 1",
    subtitle: "Treat it like the real thing",
    description:
      "Go in cold — don't look anything up. After you finish, review the performance breakdown to see exactly which topics and units you struggled with. This tells you where to focus your energy.",
    action: { label: "Practice Exam 1", path: "/exam/1" },
    border: "border-green-500/40",
    badge: "bg-green-500/10 text-green-400",
    iconBg: "bg-green-900/30 text-green-400",
    glow: "shadow-green-900/20",
  },
  {
    num: 3,
    icon: Brain,
    color: "violet",
    title: "Drill the MCQ Bank",
    subtitle: "Target your weak spots",
    description:
      "Use the MCQ Bank to drill the specific topics where you lost points. Filter by unit or topic to focus your practice. If you're still fuzzy on a concept, re-read the relevant lesson for a deeper explanation.",
    action: { label: "Open MCQ Bank", path: "/mcq-bank" },
    border: "border-violet-500/40",
    badge: "bg-violet-500/10 text-violet-400",
    iconBg: "bg-violet-900/30 text-violet-400",
    glow: "shadow-violet-900/20",
  },
  {
    num: 4,
    icon: RotateCcw,
    color: "orange",
    title: "Repeat with Exams 2 & 3",
    subtitle: "Keep the cycle going",
    description:
      "Once you feel confident on the topics you drilled, move on to Practice Exam 2. Review that breakdown, drill again with the MCQ Bank, then take Practice Exam 3. Each cycle tightens your knowledge gaps.",
    action: { label: "Practice Exam 2", path: "/exam/2" },
    border: "border-orange-500/40",
    badge: "bg-orange-500/10 text-orange-400",
    iconBg: "bg-orange-900/30 text-orange-400",
    glow: "shadow-orange-900/20",
  },
];

export default function GuidePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col">

      {/* Header */}
      <header className="border-b border-[#30363d] px-6 py-3 flex items-center gap-3">
        <BookOpen size={18} className="text-[#58a6ff]" />
        <span className="text-sm font-mono text-[#8b949e]">
          AP Computer Science A
          <span className="mx-2 text-[#30363d]">/</span>
          <span className="text-[#e6edf3]">Study Plan</span>
        </span>
        <div className="ml-auto">
          <span className="text-xs font-mono text-[#3fb950] bg-green-900/20 border border-green-800/40 px-2 py-0.5 rounded-full">
            2025–2026 CED
          </span>
        </div>
      </header>

      {/* Back button */}
      <div className="px-6 pt-6 max-w-2xl mx-auto w-full">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm font-mono text-[#8b949e] hover:text-[#e6edf3] transition-colors"
        >
          <ArrowLeft size={14} />
          Back to home
        </button>
      </div>

      {/* Hero */}
      <section className="px-6 pt-8 pb-6 max-w-2xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-mono tracking-widest text-[#58a6ff] uppercase mb-3">
            Recommended Study Plan
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            How to Use <span className="text-[#58a6ff]">This Site</span>
          </h1>
          <p className="text-[#8b949e] leading-relaxed max-w-lg mx-auto">
            Follow this cycle to make the most of the lessons, MCQ bank, and practice exams — and walk into the AP exam confident.
          </p>
        </motion.div>
      </section>

      {/* Steps */}
      <main className="flex-1 px-6 pb-16 max-w-2xl mx-auto w-full">
        <div className="flex flex-col items-center">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
              >
                {/* Step card */}
                <div
                  className={`
                    rounded-xl border bg-[#161b22] ${step.border}
                    p-6 hover:bg-[#1c2128] transition-colors duration-200
                    hover:shadow-lg ${step.glow}
                  `}
                >
                  <div className="flex items-start gap-4">
                    {/* Step number + icon */}
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <div className={`p-2.5 rounded-lg ${step.iconBg}`}>
                        <Icon size={20} />
                      </div>
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${step.badge}`}>
                        Step {step.num}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                        <h2 className="font-semibold text-[#e6edf3]">{step.title}</h2>
                        <span className="text-xs font-mono text-[#6e7681]">{step.subtitle}</span>
                      </div>
                      <p className="text-sm text-[#8b949e] leading-relaxed mb-4">
                        {step.description}
                      </p>
                      <button
                        onClick={() => navigate(step.action.path)}
                        className={`
                          inline-flex items-center gap-1.5 text-xs font-mono
                          px-3 py-1.5 rounded-lg border transition-all duration-150
                          ${step.badge} border-current/20
                          hover:bg-current/10
                        `}
                      >
                        {step.action.label}
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Connector arrow between steps */}
                {i < steps.length - 1 && (
                  <div className="flex justify-center py-2 text-[#30363d]">
                    <ArrowDown size={20} />
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Final state */}
          <motion.div
            className="w-full mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: steps.length * 0.12, duration: 0.4 }}
          >
            <div className="flex justify-center py-2 text-[#30363d]">
              <ArrowDown size={20} />
            </div>
            <div className="rounded-xl border border-[#3fb950]/50 bg-[#161b22] p-6 text-center">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#3fb950]/10 text-[#3fb950] mb-3">
                <Trophy size={24} />
              </div>
              <h2 className="font-semibold text-[#3fb950] mb-1">You're Exam-Ready</h2>
              <p className="text-sm text-[#8b949e]">
                After completing all three practice exams and drilling your weak topics, you've seen every question type and closed your knowledge gaps. Go get that 5.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Quick tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 rounded-lg border border-[#30363d] bg-[#161b22]/60 px-5 py-4"
        >
          <p className="text-xs font-mono text-[#58a6ff] mb-1 uppercase tracking-widest">Pro tip</p>
          <p className="text-sm text-[#8b949e] leading-relaxed">
            Don't skip straight to Practice Exam 2 after finishing Exam 1. Even if your score was high, use the MCQ Bank to drill any topic you got wrong. One missed concept on the real exam costs more than 10 minutes of drilling now.
          </p>
        </motion.div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm font-mono text-[#8b949e] hover:text-[#e6edf3] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to home
          </button>
        </div>
      </main>
    </div>
  );
}
