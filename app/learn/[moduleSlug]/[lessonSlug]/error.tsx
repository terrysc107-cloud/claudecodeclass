"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function LessonError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-md">
        <h2 className="text-xl font-bold text-white mb-3">Failed to load lesson</h2>
        <p className="text-slate-400 text-sm mb-6">
          This lesson couldn&apos;t be rendered. The content may have an error.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            Try again
          </button>
          <Link
            href="/dashboard"
            className="border border-slate-700 hover:border-slate-500 text-slate-300 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
