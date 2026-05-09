import { createServiceClient } from "@/lib/supabase/server";

export async function hasPurchased(userId: string): Promise<boolean> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("course_purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("is_active", true)
    .single();
  if (error && error.code !== "PGRST116") console.error("hasPurchased error:", error);
  return !!data;
}

export async function getCompletedLessons(userId: string): Promise<string[]> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("lesson_progress")
    .select("module_slug, lesson_slug")
    .eq("user_id", userId);
  if (error) console.error("getCompletedLessons error:", error);
  return (data ?? []).map((r) => `${r.module_slug}/${r.lesson_slug}`);
}

export async function getLastLesson(
  userId: string
): Promise<{ moduleSlug: string; lessonSlug: string } | null> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("user_course_state")
    .select("last_module_slug, last_lesson_slug")
    .eq("user_id", userId)
    .single();
  if (error && error.code !== "PGRST116") console.error("getLastLesson error:", error);
  if (!data?.last_module_slug || !data?.last_lesson_slug) return null;
  return { moduleSlug: data.last_module_slug, lessonSlug: data.last_lesson_slug };
}
