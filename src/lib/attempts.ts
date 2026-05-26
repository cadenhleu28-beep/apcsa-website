import { supabase } from "./supabase";
import type { MCQQuestion } from "../types/mcq";
import { mcqBank } from "../data/mcqBank";
import { allSubUnits } from "../data/curriculum";

export type AttemptSource = "subunit" | "exam" | "bank" | "feed";

export interface MCQAttempt {
  mcqId: string;
  topicId: string;
  correct: boolean;
  source: AttemptSource;
  answeredAt: string; // ISO timestamp
}

const COLD_START_THRESHOLD = 10;
const RECENT_WINDOW_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const FAMILIARITY_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

// ── Recording ──────────────────────────────────────────────────────

export async function recordAttempt(
  userId: string,
  mcqId: string,
  topicId: string,
  correct: boolean,
  source: AttemptSource,
): Promise<void> {
  const { error } = await supabase.from("mcq_attempts").insert({
    user_id: userId,
    mcq_id: mcqId,
    topic_id: topicId,
    correct,
    source,
  });
  if (error) console.error("[attempts] insert failed:", error.message);
}

export async function recordAttemptsBatch(
  userId: string,
  rows: Array<{ mcqId: string; topicId: string; correct: boolean; source: AttemptSource }>,
): Promise<void> {
  if (rows.length === 0) return;
  const { error } = await supabase.from("mcq_attempts").insert(
    rows.map((r) => ({
      user_id: userId,
      mcq_id: r.mcqId,
      topic_id: r.topicId,
      correct: r.correct,
      source: r.source,
    })),
  );
  if (error) console.error("[attempts] batch insert failed:", error.message);
}

// ── Loading ────────────────────────────────────────────────────────

export async function loadAttempts(userId: string, limit = 500): Promise<MCQAttempt[]> {
  const { data, error } = await supabase
    .from("mcq_attempts")
    .select("mcq_id, topic_id, correct, source, answered_at")
    .eq("user_id", userId)
    .order("answered_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[attempts] load failed:", error.message);
    return [];
  }
  return (data ?? []).map((r) => ({
    mcqId: r.mcq_id as string,
    topicId: r.topic_id as string,
    correct: r.correct as boolean,
    source: r.source as AttemptSource,
    answeredAt: r.answered_at as string,
  }));
}

// ── Weakness model ─────────────────────────────────────────────────
// Per-topic weakness ∈ [0, 1]. Higher = needs more practice.
// Uses last ~20 attempts per topic; new topics get 0.5 (mild exploration boost).

export function weaknessByTopic(attempts: MCQAttempt[]): Map<string, number> {
  const byTopic = new Map<string, MCQAttempt[]>();
  for (const a of attempts) {
    if (!byTopic.has(a.topicId)) byTopic.set(a.topicId, []);
    byTopic.get(a.topicId)!.push(a);
  }

  const weights = new Map<string, number>();
  for (const [topicId, list] of byTopic) {
    const recent = list.slice(0, 20); // already sorted desc by answered_at
    const correctCount = recent.filter((a) => a.correct).length;
    const accuracy = correctCount / recent.length;
    weights.set(topicId, 1 - accuracy);
  }
  return weights;
}

// ── Picker ─────────────────────────────────────────────────────────

const ALL_QUESTIONS: MCQQuestion[] = mcqBank.flatMap((u) =>
  u.topics.flatMap((t) => t.questions),
);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function weightedSampleWithoutReplacement<T>(
  items: T[],
  weights: number[],
  n: number,
): T[] {
  // Efraimidis–Spirakis: key = -ln(U) / weight, take top-n by smallest key.
  const keyed = items.map((item, i) => {
    const w = Math.max(weights[i], 1e-6);
    const u = Math.random();
    return { item, key: -Math.log(u) / w };
  });
  keyed.sort((a, b) => a.key - b.key);
  return keyed.slice(0, n).map((k) => k.item);
}

export function pickPersonalizedSession(
  attempts: MCQAttempt[],
  size: number,
): MCQQuestion[] {
  // Cold start: not enough signal — uniform random.
  if (attempts.length < COLD_START_THRESHOLD) {
    return shuffle(ALL_QUESTIONS).slice(0, size);
  }

  const topicWeakness = weaknessByTopic(attempts);
  const now = Date.now();

  // Index latest attempt per question for recency logic.
  const latestByMcq = new Map<string, MCQAttempt>();
  for (const a of attempts) {
    if (!latestByMcq.has(a.mcqId)) latestByMcq.set(a.mcqId, a);
  }

  const scored = ALL_QUESTIONS.map((q) => {
    const topicW = topicWeakness.get(q.topicId) ?? 0.5;
    const last = latestByMcq.get(q.id);

    let weight = 0.3 + topicW; // base 0.3 + weakness boost
    if (last) {
      const age = now - new Date(last.answeredAt).getTime();
      // Recently missed → big resurface boost
      if (!last.correct && age < RECENT_WINDOW_MS) {
        weight *= 2.0;
      }
      // Just-answered → suppress to avoid immediate repeats
      if (age < FAMILIARITY_WINDOW_MS) {
        weight *= 0.15;
      }
      // Recently aced → mild rest
      if (last.correct && age < RECENT_WINDOW_MS) {
        weight *= 0.6;
      }
    } else {
      // Unseen question — mild exploration boost
      weight *= 1.2;
    }
    return { q, weight };
  });

  return weightedSampleWithoutReplacement(
    scored.map((s) => s.q),
    scored.map((s) => s.weight),
    size,
  );
}

// ── Backfill ───────────────────────────────────────────────────────
// Pull existing SubUnitPage answers from user_progress and seed mcq_attempts.
// Gated: only runs if the user has no existing source='subunit' rows.

export async function backfillSubUnitAttempts(userId: string): Promise<number> {
  // Skip if backfill (or a sub-unit attempt) has already happened.
  const { data: existing, error: checkErr } = await supabase
    .from("mcq_attempts")
    .select("id")
    .eq("user_id", userId)
    .eq("source", "subunit")
    .limit(1);
  if (checkErr) {
    console.error("[attempts] backfill check failed:", checkErr.message);
    return 0;
  }
  if (existing && existing.length > 0) return 0;

  const { data: progressRows, error: progressErr } = await supabase
    .from("user_progress")
    .select("mcq_answers")
    .eq("user_id", userId);

  if (progressErr || !progressRows) {
    console.error("[attempts] backfill load failed:", progressErr?.message);
    return 0;
  }

  const lookup = new Map<string, { topicId: string; correct: string }>();
  for (const unit of mcqBank) {
    for (const topic of unit.topics) {
      for (const q of topic.questions) {
        lookup.set(q.id, { topicId: q.topicId, correct: q.answer });
      }
    }
  }
  // Sub-unit MCQs use a different id scheme and have no per-question topic;
  // derive topic from the parent sub-unit's first cedTopic.
  for (const entry of allSubUnits) {
    const topicId = entry.cedTopics[0] ?? `${entry.unit.id}.0`;
    for (const m of entry.mcqs) {
      lookup.set(m.id, { topicId, correct: m.correctId });
    }
  }

  const toInsert: Array<{
    user_id: string;
    mcq_id: string;
    topic_id: string;
    correct: boolean;
    source: AttemptSource;
  }> = [];

  for (const row of progressRows) {
    const answers = (row.mcq_answers as Record<string, string>) ?? {};
    for (const [mcqId, selectedLetter] of Object.entries(answers)) {
      const meta = lookup.get(mcqId);
      if (!meta) continue;
      toInsert.push({
        user_id: userId,
        mcq_id: mcqId,
        topic_id: meta.topicId,
        correct: selectedLetter === meta.correct,
        source: "subunit",
      });
    }
  }

  if (toInsert.length === 0) return 0;

  const { error: insertErr } = await supabase.from("mcq_attempts").insert(toInsert);
  if (insertErr) {
    console.error("[attempts] backfill insert failed:", insertErr.message);
    return 0;
  }
  return toInsert.length;
}

export function totalAttemptCount(attempts: MCQAttempt[]): number {
  return attempts.length;
}

export function isColdStart(attempts: MCQAttempt[]): boolean {
  return attempts.length < COLD_START_THRESHOLD;
}

// ── Stats ──────────────────────────────────────────────────────────

// topicId is shaped like "1.15" → unit number is the prefix before the dot.
function unitOf(topicId: string): number {
  const n = parseInt(topicId.split(".")[0], 10);
  return Number.isFinite(n) ? n : 0;
}

// Lookup: topicId → human label (e.g. "1.15" → "String Manipulation").
// Built once from mcqBank.
const TOPIC_LABELS: Map<string, string> = (() => {
  const m = new Map<string, string>();
  for (const unit of mcqBank) {
    for (const topic of unit.topics) {
      m.set(topic.id, topic.label);
    }
  }
  return m;
})();

export function topicLabel(topicId: string): string {
  return TOPIC_LABELS.get(topicId) ?? topicId;
}

export interface AccuracyRow {
  key: string;     // topic id or unit number
  label: string;   // display label
  attempts: number;
  correct: number;
  accuracy: number; // 0..1
}

export function overallAccuracy(attempts: MCQAttempt[]): {
  total: number;
  correct: number;
  accuracy: number;
} {
  const correct = attempts.filter((a) => a.correct).length;
  return {
    total: attempts.length,
    correct,
    accuracy: attempts.length === 0 ? 0 : correct / attempts.length,
  };
}

export function accuracyByUnit(attempts: MCQAttempt[]): AccuracyRow[] {
  const buckets = new Map<number, { attempts: number; correct: number }>();
  for (const a of attempts) {
    const u = unitOf(a.topicId);
    if (u < 1 || u > 4) continue;
    const b = buckets.get(u) ?? { attempts: 0, correct: 0 };
    b.attempts += 1;
    if (a.correct) b.correct += 1;
    buckets.set(u, b);
  }
  const unitTitles: Record<number, string> = {
    1: "Using Objects",
    2: "Selection & Iteration",
    3: "Class Creation",
    4: "Data Collections",
  };
  const rows: AccuracyRow[] = [];
  for (let u = 1; u <= 4; u++) {
    const b = buckets.get(u) ?? { attempts: 0, correct: 0 };
    rows.push({
      key: String(u),
      label: `Unit ${u} — ${unitTitles[u]}`,
      attempts: b.attempts,
      correct: b.correct,
      accuracy: b.attempts === 0 ? 0 : b.correct / b.attempts,
    });
  }
  return rows;
}

export function accuracyByTopic(
  attempts: MCQAttempt[],
  minAttempts = 3,
): AccuracyRow[] {
  const buckets = new Map<string, { attempts: number; correct: number }>();
  for (const a of attempts) {
    const b = buckets.get(a.topicId) ?? { attempts: 0, correct: 0 };
    b.attempts += 1;
    if (a.correct) b.correct += 1;
    buckets.set(a.topicId, b);
  }
  const rows: AccuracyRow[] = [];
  for (const [topicId, b] of buckets) {
    if (b.attempts < minAttempts) continue;
    rows.push({
      key: topicId,
      label: `${topicId} · ${topicLabel(topicId)}`,
      attempts: b.attempts,
      correct: b.correct,
      accuracy: b.correct / b.attempts,
    });
  }
  return rows;
}

export function topWeakTopics(attempts: MCQAttempt[], n = 3): AccuracyRow[] {
  return accuracyByTopic(attempts)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, n);
}

export function topStrongTopics(attempts: MCQAttempt[], n = 3): AccuracyRow[] {
  return accuracyByTopic(attempts)
    .sort((a, b) => b.accuracy - a.accuracy)
    .slice(0, n);
}

export interface DayActivity {
  date: string; // YYYY-MM-DD
  attempts: number;
  correct: number;
}

export function recentActivityByDay(
  attempts: MCQAttempt[],
  days = 7,
): DayActivity[] {
  const out: DayActivity[] = [];
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  // Build the day buckets first (oldest → newest).
  const buckets: { date: Date; key: string }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(startOfToday);
    d.setDate(startOfToday.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    buckets.push({ date: d, key });
  }

  const counts = new Map<string, { attempts: number; correct: number }>();
  for (const a of attempts) {
    const t = new Date(a.answeredAt);
    const key = new Date(t.getFullYear(), t.getMonth(), t.getDate())
      .toISOString()
      .slice(0, 10);
    const c = counts.get(key) ?? { attempts: 0, correct: 0 };
    c.attempts += 1;
    if (a.correct) c.correct += 1;
    counts.set(key, c);
  }

  for (const b of buckets) {
    const c = counts.get(b.key) ?? { attempts: 0, correct: 0 };
    out.push({ date: b.key, attempts: c.attempts, correct: c.correct });
  }
  return out;
}

// MCQ section of the AP CSA exam has 40 questions.
const AP_MCQ_TOTAL = 40;

export function predictedRawMCQ(accuracy: number): number {
  return Math.round(accuracy * AP_MCQ_TOTAL);
}

// Rough AP score projection from raw MCQ accuracy.
// MCQ is ~55% of total scaled score; thresholds are CollegeBoard's recent
// public composite cutoffs for AP CSA (5 ≈ 65%+, 4 ≈ 55%+, 3 ≈ 40%+,
// 2 ≈ 25%+, 1 below). Treating MCQ accuracy as a proxy for composite.
export function predictedAPScore(accuracy: number): 1 | 2 | 3 | 4 | 5 {
  const p = accuracy;
  if (p >= 0.7) return 5;
  if (p >= 0.6) return 4;
  if (p >= 0.45) return 3;
  if (p >= 0.3) return 2;
  return 1;
}
