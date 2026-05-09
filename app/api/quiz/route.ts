import { createClient } from "@/lib/supabase/server";
import { getLesson } from "@/lib/content";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { moduleSlug, lessonSlug, answers } = await request.json();

  if (
    typeof moduleSlug !== "string" ||
    typeof lessonSlug !== "string" ||
    !Array.isArray(answers) ||
    answers.length > 20 ||
    !answers.every((a) => Number.isInteger(a))
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // Prevent path traversal
  if (!/^[a-z0-9-]+$/.test(moduleSlug) || !/^[a-z0-9-]+$/.test(lessonSlug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const lesson = getLesson(moduleSlug, lessonSlug);
  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  const questions = lesson.frontmatter.quiz ?? [];
  if (answers.length !== questions.length) {
    return NextResponse.json({ error: "Answer count mismatch" }, { status: 400 });
  }

  const correct = questions.map((q, i) => answers[i] === q.answer);
  const score = questions.length > 0
    ? Math.round((correct.filter(Boolean).length / questions.length) * 100)
    : 100;
  const passed = score >= 70;

  // Store quiz result
  await supabase.from("quiz_results").insert({
    user_id: user.id,
    module_slug: moduleSlug,
    lesson_slug: lessonSlug,
    score,
    passed,
    answers: answers,
  });

  // If passed, mark lesson complete + update state
  if (passed) {
    await supabase.from("lesson_progress").upsert(
      {
        user_id: user.id,
        module_slug: moduleSlug,
        lesson_slug: lessonSlug,
      },
      { onConflict: "user_id,module_slug,lesson_slug" }
    );

    await supabase.from("user_course_state").upsert(
      {
        user_id: user.id,
        last_module_slug: moduleSlug,
        last_lesson_slug: lessonSlug,
      },
      { onConflict: "user_id" }
    );
  }

  return NextResponse.json({ score, passed });
}
