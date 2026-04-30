import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Box, GitBranch, Code2, Database, ChevronRight, BookOpen, ClipboardList, LogIn, LogOut, User, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import { curriculum } from "../data/curriculum";
import { useAuth } from "../context/AuthContext";
import { loadAllProgress } from "../lib/progress";
import type { SubUnitProgress } from "../lib/progress";

const ICONS = {
  Box,
  GitBranch,
  Code2,
  Database,
} as const;

const COLOR_MAP = {
  blue:   { border: "border-blue-500/40",   glow: "hover:border-blue-400/70",  badge: "bg-blue-500/10 text-blue-400",   icon: "text-blue-400",   title: "text-blue-400",   arrow: "group-hover:text-blue-400" },
  green:  { border: "border-green-500/40",  glow: "hover:border-green-400/70", badge: "bg-green-500/10 text-green-400", icon: "text-green-400",  title: "text-green-400",  arrow: "group-hover:text-green-400" },
  purple: { border: "border-purple-500/40", glow: "hover:border-purple-400/70",badge: "bg-purple-500/10 text-purple-400",icon: "text-purple-400", title: "text-purple-400", arrow: "group-hover:text-purple-400" },
  orange: { border: "border-orange-500/40", glow: "hover:border-orange-400/70",badge: "bg-orange-500/10 text-orange-400",icon: "text-orange-400", title: "text-orange-400", arrow: "group-hover:text-orange-400" },
} as const;

type ColorKey = keyof typeof COLOR_MAP;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const TOTAL_TOPICS = 53;

function fireConfetti() {
  const burst = (origin: { x: number; y: number }) =>
    confetti({
      particleCount: 120,
      spread: 80,
      origin,
      colors: ["#58a6ff", "#3fb950", "#d2a8ff", "#ffa657", "#ff7b72", "#f0e68c"],
      ticks: 200,
    });
  burst({ x: 0.2, y: 0.6 });
  setTimeout(() => burst({ x: 0.8, y: 0.6 }), 150);
  setTimeout(() => burst({ x: 0.5, y: 0.5 }), 300);
}

export default function HomePage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [progress, setProgress] = useState<SubUnitProgress[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const celebrationFiredRef = useRef(false);

  useEffect(() => {
    if (user) {
      loadAllProgress(user.id).then(setProgress);
    } else {
      setProgress([]);
    }
  }, [user]);

  const completedSlugs = new Set(
    progress.filter((p) => p.completed).map((p) => p.subUnitSlug)
  );

  const totalSubUnits = curriculum.units.reduce(
    (acc, u) => acc + u.subUnits.length,
    0
  );

  const completedCount = completedSlugs.size;
  const progressPct = Math.min(completedCount / TOTAL_TOPICS, 1);

  useEffect(() => {
    if (completedCount >= TOTAL_TOPICS && !celebrationFiredRef.current) {
      celebrationFiredRef.current = true;
      setShowCelebration(true);
      fireConfetti();
      setTimeout(() => setShowCelebration(false), 5000);
    }
  }, [completedCount]);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col">

      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <header className="border-b border-[#30363d] px-6 py-3 flex items-center gap-3">
        <BookOpen size={18} className="text-[#58a6ff]" />
        <span className="text-sm font-mono text-[#8b949e]">
          AP Computer Science A
          <span className="mx-2 text-[#30363d]">/</span>
          <span className="text-[#e6edf3]">Study Guide</span>
        </span>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs font-mono text-[#3fb950] bg-green-900/20 border border-green-800/40 px-2 py-0.5 rounded-full">
            2025–2026 CED
          </span>
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#8b949e]">
                <User size={13} />
                <span className="max-w-[160px] truncate">{user.email}</span>
              </div>
              <button
                onClick={() => signOut()}
                title="Log out"
                className="flex items-center gap-1 text-xs font-mono text-[#6e7681] hover:text-[#ff7b72] transition-colors"
              >
                <LogOut size={13} />
                Log out
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-1.5 text-xs font-mono text-[#58a6ff] hover:text-[#79c0ff] transition-colors"
            >
              <LogIn size={13} />
              Log in / Sign up
            </button>
          )}
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="px-6 pt-16 pb-10 max-w-4xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-mono tracking-widest text-[#58a6ff] uppercase mb-4">
            Reformed Curriculum · 4 Units · {curriculum.totalTopics} Topics
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            Master{" "}
            <span className="text-[#58a6ff]">AP Computer</span>
            <br />
            <span className="text-[#58a6ff]">Science A</span>
          </h1>
          <p className="text-[#8b949e] text-lg max-w-xl mx-auto leading-relaxed">
            Interactive lessons, code examples, and exam-style MCQs — organized
            around the official 2025–2026 College Board curriculum.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mt-10 text-sm font-mono"
        >
          {[
            { label: "Units", value: "4" },
            { label: "Sub-units", value: String(totalSubUnits) },
            { label: "CED Topics", value: String(curriculum.totalTopics) },
            ...(user
              ? [{ label: "Completed", value: `${completedSlugs.size}/${totalSubUnits}` }]
              : [{ label: "Exam Date", value: "May 15, 2026" }]
            ),
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-[#e6edf3]">{stat.value}</div>
              <div className="text-[#8b949e] text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Unit Cards ──────────────────────────────────────────────── */}
      <main className="flex-1 px-6 pb-16 max-w-4xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {curriculum.units.map((unit) => {
            const colors = COLOR_MAP[unit.color as ColorKey];
            const Icon = ICONS[unit.icon as keyof typeof ICONS];

            return (
              <motion.button
                key={unit.id}
                variants={cardVariants}
                onClick={() => navigate(`/unit/${unit.id}`)}
                className={`
                  group text-left rounded-xl border bg-[#161b22]
                  ${colors.border} ${colors.glow}
                  p-6 transition-all duration-200
                  hover:bg-[#1c2128] hover:shadow-lg hover:shadow-black/30
                  focus:outline-none focus:ring-2 focus:ring-[#58a6ff]/50
                `}
              >
                {/* Card header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-lg bg-[#21262d] ${colors.icon}`}>
                    <Icon size={22} />
                  </div>
                  <span className={`text-xs font-mono px-2 py-1 rounded-md border border-current/20 ${colors.badge}`}>
                    {unit.examWeight}
                  </span>
                </div>

                {/* Unit number */}
                <p className="text-xs font-mono text-[#8b949e] mb-1">
                  Unit {unit.id}
                </p>

                {/* Title */}
                <h2 className={`text-lg font-semibold mb-2 ${colors.title}`}>
                  {unit.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-[#8b949e] leading-relaxed mb-5">
                  {unit.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#6e7681]">
                    {unit.subUnits.length} sub-units
                    <span className="mx-1.5">·</span>
                    ~{unit.suggestedPeriods} periods
                  </span>
                  <div className="flex items-center gap-2">
                    {user && (() => {
                      const done = unit.subUnits.filter((s) => completedSlugs.has(s.slug)).length;
                      const total = unit.subUnits.length;
                      return done > 0 ? (
                        <span className={`text-xs font-mono ${done === total ? "text-[#3fb950]" : "text-[#8b949e]"}`}>
                          {done}/{total}
                        </span>
                      ) : null;
                    })()}
                    <ChevronRight
                      size={16}
                      className={`text-[#6e7681] transition-colors duration-150 ${colors.arrow}`}
                    />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Practice Exam CTA ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <button
            onClick={() => navigate("/exam")}
            className="
              w-full group flex items-center justify-between
              bg-[#161b22] border border-[#238636]/50
              hover:border-[#3fb950]/70 hover:bg-[#1c2128]
              rounded-xl px-6 py-5 transition-all duration-200
              hover:shadow-lg hover:shadow-black/30
            "
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-[#238636]/20 text-[#3fb950]">
                <ClipboardList size={22} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-[#3fb950]">Full-Length Practice Exam</p>
                <p className="text-xs text-[#8b949e] mt-0.5 font-mono">
                  42 MCQs · 4 FRQs · Timed or untimed · Performance dashboard
                </p>
              </div>
            </div>
            <ChevronRight
              size={18}
              className="text-[#6e7681] group-hover:text-[#3fb950] transition-colors"
            />
          </button>
        </motion.div>

        {/* ── Bottom note ─────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs font-mono text-[#6e7681] mt-8"
        >
          Based on the official College Board CED · Effective Fall 2025 ·{" "}
          <span className="text-[#8b949e]">Inheritance removed · File I/O added</span>
        </motion.p>
      </main>
      {/* ── Progress bar (sticky bottom) ───────────────────────────── */}
      <div className="sticky bottom-0 z-50 border-t border-[#30363d] bg-[#0d1117]/95 backdrop-blur px-6 py-3">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-mono text-[#8b949e]">
              {user ? "Overall Progress" : "Progress (log in to save)"}
            </span>
            <span className={`text-xs font-mono ${completedCount >= TOTAL_TOPICS ? "text-[#3fb950]" : "text-[#8b949e]"}`}>
              {completedCount} / {TOTAL_TOPICS} topics
            </span>
          </div>
          <div className="relative h-2 rounded-full bg-[#21262d] overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: completedCount >= TOTAL_TOPICS
                  ? "linear-gradient(90deg, #3fb950, #58a6ff)"
                  : "linear-gradient(90deg, #1f6feb, #58a6ff)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPct * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            {/* Shimmer on incomplete bar */}
            {completedCount < TOTAL_TOPICS && completedCount > 0 && (
              <motion.div
                className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ["-4rem", "100vw"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Celebration banner ──────────────────────────────────────── */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl border border-[#3fb950]/60 bg-[#0d1117]/95 backdrop-blur shadow-2xl shadow-green-900/30"
          >
            <Trophy size={22} className="text-[#ffa657] shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#e6edf3]">You finished everything!</p>
              <p className="text-xs font-mono text-[#8b949e]">All 53 topics complete · You're exam-ready 🎉</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
