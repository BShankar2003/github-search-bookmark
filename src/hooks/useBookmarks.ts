import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'github_bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setBookmarks(new Set(JSON.parse(stored)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(bookmarks)));
  }, [bookmarks]);

  const toggleBookmark = useCallback((repoId: number) => {
    setBookmarks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(repoId)) {
        newSet.delete(repoId);
      } else {
        newSet.add(repoId);
      }
      return newSet;
    });
  }, []);

  return { bookmarks, toggleBookmark };
}
