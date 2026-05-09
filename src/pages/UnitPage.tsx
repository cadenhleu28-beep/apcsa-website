import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, CheckCircle, Lock } from "lucide-react";
import { getUnit } from "../data/curriculum";
import { useAuth } from "../context/AuthContext";
import { loadAllProgress } from "../lib/progress";

const UNIT_COLORS = {
  blue:   {
    heading: "text-blue-400",
    accent:  "#58a6ff",
    badge:   "bg-blue-500/10 text-blue-400 border-blue-500/20",
    hover:   "hover:border-blue-400/40 hover:bg-blue-500/5",
    dot:     "bg-blue-400",
    bar:     "bg-blue-500",
  },
  green:  {
    heading: "text-green-400",
    accent:  "#3fb950",
    badge:   "bg-green-500/10 text-green-400 border-green-500/20",
    hover:   "hover:border-green-400/40 hover:bg-green-500/5",
    dot:     "bg-green-400",
    bar:     "bg-green-500",
  },
  purple: {
    heading: "text-purple-400",
    accent:  "#bc8cff",
    badge:   "bg-purple-500/10 text-purple-400 border-purple-500/20",
    hover:   "hover:border-purple-400/40 hover:bg-purple-500/5",
    dot:     "bg-purple-400",
    bar:     "bg-purple-500",
  },
  orange: {
    heading: "text-orange-400",
    accent:  "#f78166",
    badge:   "bg-orange-500/10 text-orange-400 border-orange-500/20",
    hover:   "hover:border-orange-400/40 hover:bg-orange-500/5",
    dot:     "bg-orange-400",
    bar:     "bg-orange-400",
  },
} as const;

type ColorKey = keyof typeof UNIT_COLORS;

export default function UnitPage() {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const unit = getUnit(Number(unitId));
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) { setCompletedSlugs(new Set()); return; }
    loadAllProgress(user.id).then((all) => {
      setCompletedSlugs(new Set(all.filter((p) => p.completed).map((p) => p.subUnitSlug)));
    });
  }, [user]);

  if (!unit) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex items-center justify-center">
        <p className="font-mono text-[#6e7681]">Unit not found.</p>
      </div>
    );
  }

  const colors = UNIT_COLORS[unit.color as ColorKey];
  const completedCount = unit.subUnits.filter((s) => completedSlugs.has(s.slug)).length;
  const pct = unit.subUnits.length > 0 ? completedCount / unit.subUnits.length : 0;

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col">

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#30363d]/60 bg-[#0d1117]/90 backdrop-blur-sm px-5 py-2.5 flex items-center gap-2">
        <button
          onClick={() => navigate("/")}
          className="text-xs font-mono text-[#6e7681] hover:text-[#58a6ff] transition-colors"
        >
          apcsa
        </button>
        <span className="text-xs font-mono text-[#30363d]">/</span>
        <span className="text-xs font-mono" style={{ color: colors.accent }}>
          unit-{unit.id}
        </span>
      </header>

      <div className="max-w-3xl mx-auto w-full px-5 sm:px-8 py-10">

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm font-mono text-[#6e7681] hover:text-[#e6edf3] transition-colors mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          All units
        </button>

        {/* Unit header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-10"
        >
          {/* Top row */}
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span
              className="font-mono text-xs px-2 py-0.5 rounded border"
              style={{
                color: colors.accent,
                borderColor: `${colors.accent}25`,
                background: `${colors.accent}10`,
              }}
            >
              Unit {unit.id} · {unit.examWeight} of exam
            </span>
            <span className="text-xs font-mono text-[#484f58]">
              ~{unit.suggestedPeriods} periods
            </span>
          </div>

          {/* Title */}
          <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${colors.heading}`}>
            {unit.title}
          </h1>
          <p className="text-[#8b949e] leading-relaxed text-sm sm:text-base mb-5">{unit.description}</p>

          {/* Progress (logged in) */}
          {user && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[#6e7681]">
                  {completedCount} / {unit.subUnits.length} lessons complete
                </span>
                {completedCount === unit.subUnits.length && completedCount > 0 && (
                  <span className="text-xs font-mono text-[#3fb950] flex items-center gap-1">
                    <CheckCircle size={11} />
                    Unit complete
                  </span>
                )}
              </div>
              <div className="h-1 rounded-full bg-[#21262d] overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${colors.bar}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct * 100}%` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Sub-unit list */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono text-[#484f58] uppercase tracking-widest">
            {unit.subUnits.length} Lessons
          </span>
          <div className="flex-1 h-px bg-[#30363d]/60" />
        </div>

        <div className="space-y-2">
          {unit.subUnits.map((sub, idx) => {
            const done = completedSlugs.has(sub.slug);
            return (
              <motion.button
                key={sub.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + idx * 0.04, duration: 0.35, ease: "easeOut" }}
                onClick={() => navigate(`/unit/${unit.id}/${sub.slug}`)}
                className={`
                  w-full text-left flex items-center gap-4 px-4 py-3.5 rounded-md
                  border bg-[#161b22]
                  transition-all duration-150 group
                  ${done
                    ? "border-[#3fb950]/25 hover:border-[#3fb950]/50 hover:bg-[#3fb950]/5"
                    : `border-[#30363d]/60 ${colors.hover}`
                  }
                  focus:outline-none focus:ring-1 focus:ring-[#58a6ff]/40
                `}
              >
                {/* Index */}
                <span className="font-mono text-xs text-[#484f58] w-5 shrink-0 text-right">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Status dot */}
                {done ? (
                  <CheckCircle size={14} className="text-[#3fb950] shrink-0" />
                ) : (
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${colors.dot} opacity-50 group-hover:opacity-100 transition-opacity`}
                  />
                )}

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${done ? "text-[#3fb950]" : "text-[#e6edf3]"}`}>
                    {sub.title}
                  </p>
                  <p className="text-xs font-mono text-[#484f58] mt-0.5">
                    Topics {sub.cedTopics.join(", ")}
                    {sub.mcqs.length > 0 && (
                      <span className="ml-2 text-[#3a404a]">· {sub.mcqs.length} MCQs</span>
                    )}
                  </p>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2 shrink-0">
                  {done && (
                    <span className="text-[10px] font-mono text-[#3fb950] bg-[#3fb950]/10 border border-[#3fb950]/25 px-1.5 py-0.5 rounded">
                      done
                    </span>
                  )}
                  <ChevronRight
                    size={14}
                    className="text-[#484f58] group-hover:text-[#8b949e] group-hover:translate-x-0.5 transition-all duration-150"
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Not logged in nudge */}
        {!user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex items-center gap-2 text-xs font-mono text-[#484f58] border border-[#30363d]/60 rounded px-3 py-2.5"
          >
            <Lock size={11} />
            <button
              onClick={() => navigate("/auth")}
              className="text-[#58a6ff] hover:text-[#79c0ff] transition-colors"
            >
              Log in
            </button>
            &nbsp;to save progress across devices
          </motion.div>
        )}
      </div>
    </div>
  );
}
