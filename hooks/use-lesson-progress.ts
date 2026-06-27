"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ebb115-lesson-progress";

export function useLessonProgress(slug: string, totalLessons: number) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as string[];
        setCompleted(new Set(parsed));
      }
    } catch {
      // ignore corrupt storage
    }
    setLoaded(true);
  }, []);

  const persist = useCallback((next: Set<string>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    setCompleted(next);
  }, []);

  const isCompleted = completed.has(slug);

  const markCompleted = useCallback(() => {
    const next = new Set(completed);
    next.add(slug);
    persist(next);
  }, [completed, persist, slug]);

  const toggleCompleted = useCallback(() => {
    const next = new Set(completed);
    if (next.has(slug)) {
      next.delete(slug);
    } else {
      next.add(slug);
    }
    persist(next);
  }, [completed, persist, slug]);

  const completionPercent =
    totalLessons > 0
      ? Math.round((completed.size / totalLessons) * 100)
      : 0;

  return {
    loaded,
    isCompleted,
    markCompleted,
    toggleCompleted,
    completedCount: completed.size,
    completionPercent,
  };
}
