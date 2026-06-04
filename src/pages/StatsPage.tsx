import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, LogIn, Target, TrendingUp, TrendingDown,
  Award, Activity, BookOpen,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  loadAttempts,
  overallAccuracy,
  accuracyByUnit,
  topWeakTopics,
  topStrongTopics,
  recentActivityByDay,
  predictedRawMCQ,
  predictedAPScore,
  type MCQAttempt,
  type AccuracyRow,
  type DayActivity,
} from "../lib/attempts";
import { loadAllProgress } from "../lib/progress";
import { totalSubUnits } from "../data/curriculum";

// Resolve to `fallback` after `ms` so a slow or unreachable backend can never
// leave the stats page stuck on its loader.
function withTimeout<T>(p: Promise<T>, ms: number, fallback: T): Promise<T> {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (v: T) => {
      if (!settled) {
        settled = true;
        resolve(v);
      }
    };
    const id = setTimeout(() => finish(fallback), ms);
    p.then((v) => {
      clearTimeout(id);
      finish(v);
    }).catch(() => {
      clearTimeout(id);
      finish(fallback);
    });
  });
}

const UNIT_BAR_COLORS: Record<string, string> = {
  "1": "bg-blue-500",
  "2": "bg-green-500",
  "3": "bg-purple-500",
  "4": "bg-orange-400",
};

function pct(x: number): string {
  return `${Math.round(x * 100)}%`;
}

function apScoreColor(score: number): string {
  if (score >= 4) return "text-green-400";
  if (score === 3) return "text-yellow-400";
  return "text-rose-400";
}

// ── Sub-components ────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
      <p className="text-[10px] font-mono uppercase tracking-widest text-[#6e7681] mb-2">
        {label}
      </p>
      <p className={`text-3xl font-bold ${accent ?? "text-[#e6edf3]"}`}>
        {value}
      </p>
      {sub && (
        <p className="text-xs font-mono text-[#8b949e] mt-1">{sub}</p>
      )}
    </div>
  );
}

function UnitBars({ rows }: { rows: AccuracyRow[] }) {
  return (
    <div className="space-y-3">
      {rows.map((r) => {
        const has = r.attempts > 0;
        const widthPct = has ? Math.max(r.accuracy * 100, 4) : 0;
        return (
          <div key={r.key}>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs font-mono text-[#e6edf3]">{r.label}</span>
              <span className="text-xs font-mono text-[#8b949e] tabular-nums">
                {has ? `${r.correct}/${r.attempts} · ${pct(r.accuracy)}` : "—"}
              </span>
            </div>
            <div className="h-2 bg-[#0d1117] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${widthPct}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`h-full ${UNIT_BAR_COLORS[r.key] ?? "bg-rose-500"}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TopicList({
  rows,
  emptyMsg,
}: {
  rows: AccuracyRow[];
  emptyMsg: string;
}) {
  if (rows.length === 0) {
    return (
      <p className="text-xs font-mono text-[#6e7681] italic">{emptyMsg}</p>
    );
  }
  return (
    <ul className="space-y-2">
      {rows.map((r) => (
        <li
          key={r.key}
          className="flex items-baseline justify-between gap-3 py-2 border-b border-[#21262d] last:border-0"
        >
          <span className="text-xs font-mono text-[#e6edf3] truncate">
            {r.label}
          </span>
          <span className="text-xs font-mono text-[#8b949e] tabular-nums shrink-0">
            {pct(r.accuracy)} · {r.correct}/{r.attempts}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ActivitySparkline({ data }: { data: DayActivity[] }) {
  const max = Math.max(1, ...data.map((d) => d.attempts));
  return (
    <div className="flex items-end gap-1.5 h-20">
      {data.map((d) => {
        const h = (d.attempts / max) * 100;
        const dayLabel = new Date(d.date).toLocaleDateString("en-US", {
          weekday: "short",
        });
        return (
          <div
            key={d.date}
            className="flex-1 flex flex-col items-center gap-1"
            title={`${d.date}: ${d.correct}/${d.attempts} correct`}
          >
            <div className="flex-1 w-full flex items-end">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(h, d.attempts > 0 ? 8 : 0)}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full bg-rose-500 rounded-sm"
              />
            </div>
            <span className="text-[10px] font-mono text-[#6e7681]">
              {dayLabel.slice(0, 1)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────

export default function StatsPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState<MCQAttempt[]>([]);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    if (authLoading || !user) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const [att, prog] = await Promise.all([
          withTimeout(loadAttempts(user!.id), 4000, []),
          withTimeout(loadAllProgress(user!.id), 4000, []),
        ]);
        if (cancelled) return;
        setAttempts(att);
        setCompletedCount(prog.filter((p) => p.completed).length);
      } catch {
        // Fall through to the empty/no-data state — never hang on the backend.
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  // Logged-out state
  if (!authLoading && !user) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]">
        <header className="border-b border-[#21262d] px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[#8b949e] hover:text-[#e6edf3] transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">Home</span>
          </button>
        </header>
        <div className="max-w-md mx-auto px-6 py-24 text-center">
          <Target size={40} className="mx-auto text-rose-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your stats live here</h1>
          <p className="text-sm text-[#8b949e] mb-6 font-mono">
            Sign in to track accuracy, predicted AP score, and your weak spots
            across every MCQ you've answered.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-semibold transition-colors"
          >
            <LogIn size={16} />
            Sign in
          </button>
        </div>
      </div>
    );
  }

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-[#6e7681] font-mono text-xs">
          <div className="w-6 h-6 rounded-full border-2 border-[#30363d] border-t-rose-400 animate-spin" />
          <span>Loading your stats…</span>
        </div>
      </div>
    );
  }

  const overall = overallAccuracy(attempts);
  const unitRows = accuracyByUnit(attempts);
  const weak = topWeakTopics(attempts, 3);
  const strong = topStrongTopics(attempts, 3);
  const activity = recentActivityByDay(attempts, 7);
  const examAttempts = attempts.filter((a) => a.source === "exam").length;
  const predicted = predictedRawMCQ(overall.accuracy);
  const apScore = predictedAPScore(overall.accuracy);

  // First-time empty state (signed in, no data yet)
  const hasData = attempts.length > 0;

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] pb-24">
      <header className="border-b border-[#21262d] px-6 py-4 flex items-center justify-between sticky top-0 bg-[#0d1117]/90 backdrop-blur z-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[#8b949e] hover:text-[#e6edf3] transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Home</span>
        </button>
        <h1 className="text-sm font-mono uppercase tracking-widest text-[#8b949e]">
          Your Stats
        </h1>
        <div className="w-12" aria-hidden />
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {!hasData && (
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 text-center">
            <Activity size={28} className="mx-auto text-[#8b949e] mb-3" />
            <p className="text-sm font-mono text-[#8b949e]">
              No attempts yet — answer some MCQs in the Scroll Feed, MCQ Bank,
              a Practice Exam, or a Sub-Unit to see your stats fill in here.
            </p>
          </div>
        )}

        {/* Hero — predicted score */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 bg-gradient-to-br from-rose-500/10 to-rose-500/5 border border-rose-400/30 rounded-xl p-6">
            <p className="text-[10px] font-mono uppercase tracking-widest text-rose-300 mb-2">
              Predicted AP Score
            </p>
            <div className="flex items-baseline gap-4">
              <p className={`text-6xl font-bold ${apScoreColor(apScore)}`}>
                {hasData ? apScore : "—"}
              </p>
              <div>
                <p className="text-xl font-mono text-[#e6edf3]">
                  {hasData ? `${predicted} / 40` : "no data"}
                </p>
                <p className="text-xs font-mono text-[#8b949e]">
                  projected MCQ raw score
                </p>
              </div>
            </div>
            <p className="text-[11px] font-mono text-[#6e7681] mt-3 leading-relaxed">
              Based on your overall MCQ accuracy. The real AP score also
              factors in FRQs — this is your MCQ-side projection.
            </p>
          </div>

          <StatCard
            label="Overall Accuracy"
            value={hasData ? pct(overall.accuracy) : "—"}
            sub={`${overall.correct} / ${overall.total} correct`}
            accent="text-rose-300"
          />
        </section>

        {/* Quick stat row */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard
            label="Questions Answered"
            value={String(overall.total)}
          />
          <StatCard
            label="Practice Exam Q's"
            value={String(examAttempts)}
          />
          <StatCard
            label="Sub-Units Completed"
            value={`${completedCount} / ${totalSubUnits}`}
          />
          <StatCard
            label="Last 7 Days"
            value={String(activity.reduce((s, d) => s + d.attempts, 0))}
            sub="questions"
          />
        </section>

        {/* Per-unit accuracy */}
        <section className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={16} className="text-[#8b949e]" />
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#e6edf3]">
              Accuracy by Unit
            </h2>
          </div>
          <UnitBars rows={unitRows} />
        </section>

        {/* Strong / Weak */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown size={16} className="text-rose-400" />
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#e6edf3]">
                Weak Spots
              </h2>
            </div>
            <TopicList
              rows={weak}
              emptyMsg="Need at least 3 attempts per topic to identify weak spots."
            />
            {weak.length > 0 && (
              <button
                onClick={() => navigate("/scroll")}
                className="mt-4 w-full py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-mono uppercase tracking-wide transition-colors"
              >
                Practice these in Scroll Feed →
              </button>
            )}
          </div>

          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-green-400" />
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#e6edf3]">
                Strengths
              </h2>
            </div>
            <TopicList
              rows={strong}
              emptyMsg="Need at least 3 attempts per topic to identify strengths."
            />
          </div>
        </section>

        {/* Activity */}
        <section className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={16} className="text-[#8b949e]" />
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#e6edf3]">
              Last 7 Days
            </h2>
          </div>
          <ActivitySparkline data={activity} />
        </section>

        {/* By-source breakdown */}
        <section className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award size={16} className="text-[#8b949e]" />
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#e6edf3]">
              Where You're Practicing
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(["subunit", "exam", "bank", "feed"] as const).map((src) => {
              const matched = attempts.filter((a) => a.source === src);
              const correct = matched.filter((a) => a.correct).length;
              const label = {
                subunit: "Sub-Units",
                exam: "Practice Exams",
                bank: "MCQ Bank",
                feed: "Scroll Feed",
              }[src];
              return (
                <div
                  key={src}
                  className="bg-[#0d1117] border border-[#21262d] rounded-lg p-3"
                >
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[#6e7681] mb-1">
                    {label}
                  </p>
                  <p className="text-lg font-mono text-[#e6edf3] tabular-nums">
                    {matched.length}
                  </p>
                  {matched.length > 0 && (
                    <p className="text-[10px] font-mono text-[#8b949e]">
                      {pct(correct / matched.length)} correct
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
