import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Box, GitBranch, Code2, Database,
  ChevronRight, BookOpen, ClipboardList,
  LogIn, LogOut, User, Trophy, Brain, Map,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { curriculum } from "../data/curriculum";
import { useAuth } from "../context/AuthContext";
import { loadAllProgress } from "../lib/progress";
import type { SubUnitProgress } from "../lib/progress";

const ICONS = { Box, GitBranch, Code2, Database } as const;

const UNIT_COLORS = {
  blue:   {
    border: "border-blue-500/30",
    hover:  "hover:border-blue-400/60",
    accent: "#58a6ff",
    badge:  "bg-blue-500/10 text-blue-400 border-blue-500/20",
    icon:   "text-blue-400 bg-blue-500/10",
    title:  "text-blue-400",
    bar:    "bg-blue-500",
    glow:   "hover:shadow-blue-900/20",
  },
  green:  {
    border: "border-green-500/30",
    hover:  "hover:border-green-400/60",
    accent: "#3fb950",
    badge:  "bg-green-500/10 text-green-400 border-green-500/20",
    icon:   "text-green-400 bg-green-500/10",
    title:  "text-green-400",
    bar:    "bg-green-500",
    glow:   "hover:shadow-green-900/20",
  },
  purple: {
    border: "border-purple-500/30",
    hover:  "hover:border-purple-400/60",
    accent: "#bc8cff",
    badge:  "bg-purple-500/10 text-purple-400 border-purple-500/20",
    icon:   "text-purple-400 bg-purple-500/10",
    title:  "text-purple-400",
    bar:    "bg-purple-500",
    glow:   "hover:shadow-purple-900/20",
  },
  orange: {
    border: "border-orange-500/30",
    hover:  "hover:border-orange-400/60",
    accent: "#f78166",
    badge:  "bg-orange-500/10 text-orange-400 border-orange-500/20",
    icon:   "text-orange-400 bg-orange-500/10",
    title:  "text-orange-400",
    bar:    "bg-orange-400",
    glow:   "hover:shadow-orange-900/20",
  },
} as const;

type ColorKey = keyof typeof UNIT_COLORS;

const TOTAL_TOPICS = 53;

function fireConfetti() {
  const burst = (origin: { x: number; y: number }) =>
    confetti({
      particleCount: 120,
      spread: 80,
      origin,
      colors: ["#58a6ff", "#3fb950", "#bc8cff", "#f78166", "#ffa657", "#f0e68c"],
      ticks: 200,
    });
  burst({ x: 0.2, y: 0.6 });
  setTimeout(() => burst({ x: 0.8, y: 0.6 }), 150);
  setTimeout(() => burst({ x: 0.5, y: 0.5 }), 300);
}

// ── Live exam countdown ────────────────────────────────────────────────────────
// Exam: May 15, 2026, 12:00 PM local time
const EXAM_DATE = new Date(2026, 4, 15, 12, 0, 0); // month is 0-indexed

function getCountdownLabel(): { label: string; urgent: boolean } {
  const msLeft = EXAM_DATE.getTime() - Date.now();
  if (msLeft <= 0) return { label: "Exam day!", urgent: true };
  const totalSeconds = Math.floor(msLeft / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours   = Math.floor(totalMinutes / 60);
  const days         = Math.floor(totalHours / 24);
  if (totalHours >= 24) {
    return { label: `${days}d until exam`, urgent: false };
  }
  const h = totalHours;
  const m = totalMinutes % 60;
  if (h === 0) return { label: `${m}m until exam`, urgent: true };
  return { label: `${h}h ${m}m until exam`, urgent: true };
}

function useExamCountdown() {
  const [state, setState] = useState(getCountdownLabel);

  useEffect(() => {
    function schedule() {
      const msLeft = EXAM_DATE.getTime() - Date.now();
      if (msLeft <= 0) {
        setState({ label: "Exam day!", urgent: true });
        return;
      }
      setState(getCountdownLabel());
      // Tick every second when under 24 h, otherwise align to the next minute boundary
      const interval = msLeft < 24 * 3600 * 1000 ? 1000 : 60_000 - (Date.now() % 60_000);
      timerId = window.setTimeout(schedule, interval);
    }
    let timerId = window.setTimeout(schedule, 0);
    return () => window.clearTimeout(timerId);
  }, []);

  return state;
}

function useCountUp(target: number, active: boolean, duration = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active || target === 0) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      setVal(Math.round(eased * target));
      if (pct < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, active, duration]);
  return val;
}

// ── Stat counter cell ──────────────────────────────────────────────────────────
function StatCell({ value, label, active }: { value: number | string; label: string; active: boolean }) {
  const numericVal = typeof value === "number" ? value : 0;
  const isNumeric = typeof value === "number";
  const counted = useCountUp(numericVal, active && isNumeric);
  const displayVal = isNumeric ? counted : value;

  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#e6edf3] tabular-nums">
        {displayVal}
      </span>
      <span className="text-xs font-mono text-[#6e7681] uppercase tracking-widest">{label}</span>
    </div>
  );
}

// ── Unit card ──────────────────────────────────────────────────────────────────
function UnitCard({
  unit,
  completedSlugs,
  user,
  onClick,
}: {
  unit: (typeof curriculum.units)[number];
  completedSlugs: Set<string>;
  user: boolean;
  onClick: () => void;
}) {
  const colors = UNIT_COLORS[unit.color as ColorKey];
  const Icon = ICONS[unit.icon as keyof typeof ICONS];
  const done = unit.subUnits.filter((s) => completedSlugs.has(s.slug)).length;
  const total = unit.subUnits.length;
  const pct = total > 0 ? done / total : 0;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className={`
        group relative text-left w-full overflow-hidden
        rounded-lg border bg-[#161b22]
        ${colors.border} ${colors.hover}
        transition-all duration-200
        hover:bg-[#1a1f27] hover:shadow-xl ${colors.glow}
        focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-[#0d1117] focus:ring-[#58a6ff]/50
      `}
    >
      {/* Left color accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] transition-opacity duration-200 opacity-50 group-hover:opacity-100"
        style={{ background: colors.accent }}
      />

      <div className="p-5 pl-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2 rounded-md ${colors.icon}`}>
            <Icon size={18} />
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono px-2 py-0.5 rounded border ${colors.badge}`}>
              {unit.examWeight}
            </span>
            <span className="font-mono text-xs text-[#484f58]">
              {String(unit.id).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className={`text-base font-semibold mb-2 leading-snug ${colors.title}`}>
          {unit.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-[#6e7681] leading-relaxed mb-5">
          {unit.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-[#484f58]">
            {total} lessons · ~{unit.suggestedPeriods} periods
          </span>
          <div className="flex items-center gap-2">
            {user && done > 0 && (
              <span className={`text-xs font-mono ${done === total ? "text-[#3fb950]" : colors.title}`}>
                {done}/{total}
              </span>
            )}
            <ArrowRight
              size={14}
              className={`${colors.title} opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150`}
            />
          </div>
        </div>

        {/* Progress bar */}
        {user && (
          <div className="mt-3 h-[2px] rounded-full bg-[#21262d] overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${colors.bar}`}
              initial={{ width: 0 }}
              animate={{ width: `${pct * 100}%` }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            />
          </div>
        )}
      </div>
    </motion.button>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function HomePage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [progress, setProgress] = useState<SubUnitProgress[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const celebrationFiredRef = useRef(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-10%" });

  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-5%" });

  const toolsRef = useRef<HTMLDivElement>(null);
  const toolsInView = useInView(toolsRef, { once: true, margin: "-5%" });

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 550);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (user) {
      loadAllProgress(user.id).then(setProgress);
    } else {
      setProgress([]);
    }
  }, [user]);

  const examProgress = [1, 2, 3].map((num) => {
    const prefix = num === 1 ? "apcsa-exam" : `apcsa-exam${num}`;
    try {
      const phase = JSON.parse(localStorage.getItem(`${prefix}-phase`) ?? '"landing"') as string;
      if (!phase || phase === "landing" || phase === "mode") return null;
      const mcqAnswers = JSON.parse(localStorage.getItem(`${prefix}-mcq-answers`) ?? "{}") as Record<string, unknown>;
      return { phase, answeredCount: Object.keys(mcqAnswers).length };
    } catch {
      return null;
    }
  });

  const completedSlugs = new Set(
    progress.filter((p) => p.completed).map((p) => p.subUnitSlug)
  );
  const completedCount = completedSlugs.size;
  const totalSubUnits = curriculum.units.reduce((acc, u) => acc + u.subUnits.length, 0);
  const progressPct = Math.min(completedCount / TOTAL_TOPICS, 1);

  useEffect(() => {
    if (completedCount >= TOTAL_TOPICS && !celebrationFiredRef.current) {
      celebrationFiredRef.current = true;
      setShowCelebration(true);
      fireConfetti();
      setTimeout(() => setShowCelebration(false), 5000);
    }
  }, [completedCount]);

  const countdown = useExamCountdown();

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-[#30363d]/60 bg-[#0d1117]/90 backdrop-blur-sm px-5 py-2.5 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#58a6ff]" />
          <span className="text-xs font-mono text-[#8b949e]">apcsa</span>
          <span className="text-xs font-mono text-[#30363d]">/</span>
          <span className="text-xs font-mono text-[#e6edf3]">study-guide</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <span className="hidden sm:inline text-xs font-mono text-[#3fb950] bg-green-900/15 border border-green-800/30 px-2 py-0.5 rounded">
            2025–2026 CED
          </span>
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-[#6e7681]">
                <User size={12} />
                <span className="max-w-[140px] truncate">{user.email}</span>
              </div>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-1 text-xs font-mono text-[#6e7681] hover:text-[#ff7b72] transition-colors"
              >
                <LogOut size={12} />
                <span className="hidden sm:inline">Log out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-1.5 text-xs font-mono text-[#58a6ff] hover:text-[#79c0ff] transition-colors"
            >
              <LogIn size={12} />
              Log in
            </button>
          )}
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative px-5 sm:px-8 pt-14 pb-12 max-w-5xl mx-auto w-full overflow-hidden">
        {/* Dot grid background */}
        <div className="absolute inset-0 dot-grid opacity-[0.35] pointer-events-none" />

        {/* Unit color chips */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 mb-8 relative"
        >
          {curriculum.units.map((unit) => {
            const c = UNIT_COLORS[unit.color as ColorKey];
            return (
              <button
                key={unit.id}
                onClick={() => navigate(`/unit/${unit.id}`)}
                className="flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded border transition-all duration-150 hover:opacity-100"
                style={{
                  color: c.accent,
                  borderColor: `${c.accent}30`,
                  background: `${c.accent}08`,
                  opacity: 0.7,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: c.accent }}
                />
                Unit {unit.id}
              </button>
            );
          })}
        </motion.div>

        {/* Main headline */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-5">
              <span className="text-[#e6edf3]">AP Computer</span>
              <br />
              <span className="text-[#e6edf3]">Science A</span>
              <span
                className="inline-block w-[3px] h-[0.85em] bg-[#58a6ff] ml-2 align-middle transition-opacity duration-75"
                style={{ opacity: cursorVisible ? 1 : 0 }}
              />
            </h1>

            <p className="text-[#8b949e] text-base sm:text-lg leading-relaxed max-w-xl mb-7 font-mono text-sm sm:text-base">
              <span className="text-[#e6edf3]">2025–2026</span> reformed curriculum ·{" "}
              <span className="text-[#58a6ff]">{curriculum.totalTopics} topics</span> ·{" "}
              {totalSubUnits} lessons · 3 practice exams
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => navigate("/guide")}
                className="inline-flex items-center gap-2 text-sm font-mono text-[#0d1117] bg-[#58a6ff] hover:bg-[#79c0ff] px-4 py-2 rounded-md font-medium transition-colors duration-150"
              >
                <Map size={14} />
                How to use this site
              </button>
              <span
                className={`text-xs font-mono px-3 py-1.5 rounded border transition-colors duration-500 ${
                  countdown.urgent
                    ? "text-[#f78166] border-[#f78166]/30 bg-[#f78166]/5"
                    : "text-[#6e7681] border-[#30363d]"
                }`}
              >
                {countdown.label}
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Stats row ──────────────────────────────────────────────────── */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap gap-8 mt-12 border-t border-[#30363d]/60 pt-8"
        >
          <StatCell value={4} label="Units" active={statsInView} />
          <StatCell value={totalSubUnits} label="Lessons" active={statsInView} />
          <StatCell value={curriculum.totalTopics} label="Topics" active={statsInView} />
          {user ? (
            <StatCell value={completedCount} label={`/ ${totalSubUnits} done`} active={statsInView} />
          ) : (
            <div className="flex flex-col gap-0.5">
              <span
                className={`text-2xl sm:text-3xl font-bold tracking-tight tabular-nums transition-colors duration-500 ${
                  countdown.urgent ? "text-[#f78166]" : "text-[#e6edf3]"
                }`}
              >
                {countdown.label.replace(" until exam", "").replace("Exam day!", "Today!")}
              </span>
              <span className="text-xs font-mono text-[#6e7681] uppercase tracking-widest">
                {countdown.urgent ? "Until Exam" : "Until Exam · May 15"}
              </span>
            </div>
          )}
        </motion.div>
      </section>

      <main className="flex-1 px-5 sm:px-8 pb-20 max-w-5xl mx-auto w-full">

        {/* ── Unit section label ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="flex items-center gap-3 mb-5"
        >
          <BookOpen size={14} className="text-[#6e7681]" />
          <span className="text-xs font-mono text-[#6e7681] uppercase tracking-widest">4 Study Units</span>
          <div className="flex-1 h-px bg-[#30363d]/60" />
        </motion.div>

        {/* ── Unit Cards Grid ────────────────────────────────────────────── */}
        <motion.div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
        >
          {curriculum.units.map((unit, i) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
            >
              <UnitCard
                unit={unit}
                completedSlugs={completedSlugs}
                user={!!user}
                onClick={() => navigate(`/unit/${unit.id}`)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Practice Tools ─────────────────────────────────────────────── */}
        <motion.div
          ref={toolsRef}
          initial={{ opacity: 0, y: 16 }}
          animate={toolsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <ClipboardList size={14} className="text-[#6e7681]" />
            <span className="text-xs font-mono text-[#6e7681] uppercase tracking-widest">Practice Tools</span>
            <div className="flex-1 h-px bg-[#30363d]/60" />
          </div>

          <div className="flex flex-col gap-3">
            {/* MCQ Bank */}
            <button
              onClick={() => navigate("/mcq-bank")}
              className="
                group w-full flex items-center justify-between
                bg-[#161b22] border border-violet-500/25
                hover:border-violet-400/50 hover:bg-[#1a1f27]
                rounded-lg px-5 py-4 transition-all duration-200
                hover:shadow-lg hover:shadow-violet-900/10
              "
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-md bg-violet-500/10 text-violet-400">
                  <Brain size={18} />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-[#e6edf3] mb-0.5">MCQ Bank</p>
                  <p className="text-xs font-mono text-[#6e7681]">
                    Drill by topic · Filter by unit · Instant feedback
                  </p>
                </div>
              </div>
              <ChevronRight
                size={16}
                className="text-[#484f58] group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all duration-150"
              />
            </button>

            {/* Practice Exams */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { num: 1, path: "/exam/1", label: "Practice Exam 1" },
                { num: 2, path: "/exam/2", label: "Practice Exam 2" },
                { num: 3, path: "/exam/3", label: "Practice Exam 3" },
              ].map(({ num, path, label }) => {
                const ep = examProgress[num - 1];
                const isCompleted = ep?.phase === "results";
                const statusLabel = !ep ? null
                  : isCompleted ? "Completed"
                  : ep.phase === "frq" || ep.phase === "frq-intro" ? "In Progress"
                  : `${ep.answeredCount}/42 MCQs`;

                return (
                  <button
                    key={path}
                    onClick={() => navigate(path)}
                    className="
                      group flex flex-col
                      bg-[#161b22] border border-[#238636]/30
                      hover:border-[#3fb950]/50 hover:bg-[#1a1f27]
                      rounded-lg px-4 py-4 transition-all duration-200
                      hover:shadow-lg hover:shadow-green-900/10
                      text-left
                    "
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-1.5 rounded bg-[#238636]/15 text-[#3fb950]">
                        <ClipboardList size={16} />
                      </div>
                      {statusLabel && (
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                          isCompleted
                            ? "border-[#3fb950]/30 bg-[#3fb950]/10 text-[#3fb950]"
                            : "border-[#d29922]/30 bg-[#d29922]/10 text-[#d29922]"
                        }`}>
                          {statusLabel}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-[#3fb950] mb-0.5">{label}</p>
                    <p className="text-xs font-mono text-[#484f58]">42 MCQs · 4 FRQs</p>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Bottom note ────────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs font-mono text-[#484f58] mt-10"
        >
          Based on the official College Board CED · Effective Fall 2025 ·{" "}
          <span className="text-[#6e7681]">Inheritance removed · File I/O added</span>
        </motion.p>
      </main>

      {/* ── Sticky progress bar ────────────────────────────────────────────── */}
      <div className="sticky bottom-0 z-50 border-t border-[#30363d]/60 bg-[#0d1117]/95 backdrop-blur-sm px-5 sm:px-8 py-3">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-mono text-[#6e7681]">
              {user ? "Progress" : "Progress (log in to save)"}
            </span>
            <span className={`text-xs font-mono ${completedCount >= TOTAL_TOPICS ? "text-[#3fb950]" : "text-[#6e7681]"}`}>
              {completedCount} / {TOTAL_TOPICS} topics
            </span>
          </div>
          <div className="relative h-1 rounded-full bg-[#21262d] overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: completedCount >= TOTAL_TOPICS
                  ? "linear-gradient(90deg, #3fb950, #58a6ff)"
                  : "#58a6ff",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPct * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            {completedCount > 0 && completedCount < TOTAL_TOPICS && (
              <div className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            )}
          </div>
        </div>
      </div>

      {/* ── Celebration banner ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-4 rounded-lg border border-[#3fb950]/50 bg-[#0d1117]/98 backdrop-blur shadow-2xl shadow-green-900/30"
          >
            <Trophy size={20} className="text-[#f78166] shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#e6edf3]">You finished everything!</p>
              <p className="text-xs font-mono text-[#6e7681]">All 53 topics · You're exam-ready</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
