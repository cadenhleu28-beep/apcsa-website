import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, BookOpen, CheckCircle } from "lucide-react";
import { getUnit } from "../data/curriculum";
import { useAuth } from "../context/AuthContext";
import { loadAllProgress } from "../lib/progress";

const COLOR_MAP = {
  blue:   { heading: "text-blue-400",   badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",   dot: "bg-blue-400",   hover: "hover:border-blue-400/50 hover:bg-blue-500/5" },
  green:  { heading: "text-green-400",  badge: "bg-green-500/10 text-green-400 border-green-500/30",  dot: "bg-green-400",  hover: "hover:border-green-400/50 hover:bg-green-500/5" },
  purple: { heading: "text-purple-400", badge: "bg-purple-500/10 text-purple-400 border-purple-500/30", dot: "bg-purple-400", hover: "hover:border-purple-400/50 hover:bg-purple-500/5" },
  orange: { heading: "text-orange-400", badge: "bg-orange-500/10 text-orange-400 border-orange-500/30", dot: "bg-orange-400", hover: "hover:border-orange-400/50 hover:bg-orange-500/5" },
} as const;

type ColorKey = keyof typeof COLOR_MAP;

export default function UnitPage() {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const unit = getUnit(Number(unitId));

  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) { setCompletedSlugs(new Set()); return; }
    loadAllProgress(user.id).then((all) => {
      setCompletedSlugs(new Set(all.filter((p) => p.completed).map((p) => p.subUnitSlug)));
    });
  }, [user]);

  if (!unit) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex items-center justify-center">
        <p className="font-mono text-[#8b949e]">Unit not found.</p>
      </div>
    );
  }

  const colors = COLOR_MAP[unit.color as ColorKey];
  const completedCount = unit.subUnits.filter((s) => completedSlugs.has(s.slug)).length;

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
          <span className="text-[#e6edf3]">Unit {unit.id}</span>
        </span>
      </header>

      <div className="max-w-3xl mx-auto w-full px-6 py-12">

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-[#8b949e] hover:text-[#e6edf3] transition-colors mb-8 font-mono"
        >
          <ArrowLeft size={15} />
          Back to units
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-xs font-mono px-2 py-1 rounded-md border ${colors.badge}`}>
              Unit {unit.id} · {unit.examWeight} of exam
            </span>
            <span className="text-xs font-mono text-[#6e7681]">
              ~{unit.suggestedPeriods} class periods
            </span>
          </div>
          <h1 className={`text-3xl font-bold mb-3 ${colors.heading}`}>
            {unit.title}
          </h1>
          <p className="text-[#8b949e] leading-relaxed">{unit.description}</p>
        </motion.div>

        {/* Sub-unit list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-10 space-y-3"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-mono text-[#6e7681] uppercase tracking-widest">
              {unit.subUnits.length} lessons
            </p>
            {user && completedCount > 0 && (
              <p className={`text-xs font-mono ${completedCount === unit.subUnits.length ? "text-[#3fb950]" : "text-[#8b949e]"}`}>
                {completedCount}/{unit.subUnits.length} complete
              </p>
            )}
          </div>

          {unit.subUnits.map((sub, idx) => {
            const done = completedSlugs.has(sub.slug);
            return (
              <motion.button
                key={sub.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.06 }}
                onClick={() => navigate(`/unit/${unit.id}/${sub.slug}`)}
                className={`
                  w-full text-left flex items-center gap-4 p-4 rounded-lg
                  border bg-[#161b22]
                  transition-all duration-150 group
                  ${done
                    ? "border-[#3fb950]/40 hover:border-[#3fb950]/70 hover:bg-[#3fb950]/5"
                    : `border-[#30363d] ${colors.hover}`
                  }
                  focus:outline-none focus:ring-2 focus:ring-[#58a6ff]/40
                `}
              >
                {/* Number badge */}
                <span className="font-mono text-xs text-[#6e7681] w-6 shrink-0 text-right">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Completion indicator */}
                {done ? (
                  <CheckCircle size={16} className="text-[#3fb950] shrink-0" />
                ) : (
                  <span className={`w-2 h-2 rounded-full shrink-0 ${colors.dot} opacity-60 group-hover:opacity-100 transition-opacity`} />
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${done ? "text-[#3fb950]" : "text-[#e6edf3]"}`}>
                    {sub.title}
                  </p>
                  <p className="text-xs text-[#6e7681] font-mono mt-0.5">
                    Topics {sub.cedTopics.join(", ")}
                    {sub.mcqs.length > 0 && (
                      <span className="ml-2 text-[#484f58]">· {sub.mcqs.length} MCQs</span>
                    )}
                  </p>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2 shrink-0">
                  {done && (
                    <span className="text-xs font-mono text-[#3fb950] bg-[#3fb950]/10 border border-[#3fb950]/30 px-2 py-0.5 rounded-full">
                      done
                    </span>
                  )}
                  <ChevronRight size={15} className="text-[#6e7681] group-hover:text-[#e6edf3] transition-colors" />
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
