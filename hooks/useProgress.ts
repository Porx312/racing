"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getCompletedLessons,
  markLessonCompleted,
  toggleLessonCompleted,
} from "@/lib/progress";

export function useProgress() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    setCompleted(getCompletedLessons());

    function onStorage(event: StorageEvent) {
      if (event.key === "apex-school-progress") {
        setCompleted(getCompletedLessons());
      }
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const markComplete = useCallback((part: string, slug: string) => {
    setCompleted(markLessonCompleted(part, slug));
  }, []);

  const toggleComplete = useCallback((part: string, slug: string) => {
    setCompleted(toggleLessonCompleted(part, slug));
  }, []);

  const isComplete = useCallback(
    (part: string, slug: string) => completed.includes(`${part}/${slug}`),
    [completed],
  );

  return {
    completed,
    markComplete,
    toggleComplete,
    isComplete,
    count: completed.length,
  };
}
