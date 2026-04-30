import { supabase } from "./supabase";

export interface SubUnitProgress {
  subUnitSlug: string;
  completed: boolean;
  mcqAnswers: Record<string, string>; // mcqId -> selected option id (e.g. "A", "B")
}

export interface ExamResult {
  mcqScore: number;
  mcqTotal: number;
  createdAt: string;
}

// ── Sub-unit progress ────────────────────────────────────────────────────────

export async function loadAllProgress(userId: string): Promise<SubUnitProgress[]> {
  const { data, error } = await supabase
    .from("user_progress")
    .select("sub_unit_slug, completed, mcq_answers")
    .eq("user_id", userId);

  if (error) console.error("[progress] load failed:", error.message, error);
  if (error || !data) return [];

  return data.map((row) => ({
    subUnitSlug: row.sub_unit_slug as string,
    completed: row.completed as boolean,
    mcqAnswers: (row.mcq_answers as Record<string, string>) ?? {},
  }));
}

export async function saveSubUnitProgress(
  userId: string,
  subUnitSlug: string,
  completed: boolean,
  mcqAnswers: Record<string, string>
): Promise<void> {
  const { error } = await supabase.from("user_progress").upsert(
    {
      user_id: userId,
      sub_unit_slug: subUnitSlug,
      completed,
      mcq_answers: mcqAnswers,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,sub_unit_slug" }
  );
  if (error) console.error("[progress] save failed:", error.message, error);
  else console.log("[progress] saved:", subUnitSlug, mcqAnswers);
}

// ── Exam results ─────────────────────────────────────────────────────────────

export async function saveExamResult(
  userId: string,
  mcqScore: number,
  mcqTotal: number
): Promise<void> {
  await supabase.from("exam_results").insert({
    user_id: userId,
    mcq_score: mcqScore,
    mcq_total: mcqTotal,
  });
}

export async function loadLatestExamResult(userId: string): Promise<ExamResult | null> {
  const { data, error } = await supabase
    .from("exam_results")
    .select("mcq_score, mcq_total, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return null;

  return {
    mcqScore: data.mcq_score as number,
    mcqTotal: data.mcq_total as number,
    createdAt: data.created_at as string,
  };
}
