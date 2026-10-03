"use client";

import { useCallback, useEffect, useState } from "react";
import {
  PROGRESS_EVENT,
  getCompletedLessons,
  markLessonCompleted,
  toggleLessonCompleted,
} from "@/lib/progress";

export function useProgress() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    function sync() {
      setCompleted(getCompletedLessons());
    }

    sync();

    function onStorage(event: StorageEvent) {
      if (event.key === "apex-school-progress") {
        sync();
      }
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener(PROGRESS_EVENT, sync);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(PROGRESS_EVENT, sync);
    };
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
