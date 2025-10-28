import './App.css';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { searchRepositories } from './services/github';
import { useDebounce } from './hooks/useDebouncedSearch';
import { useBookmarks } from './hooks/useBookmarks';
import RepositoryCard from './components/RepositoryCard';
import type { Repository } from './types/github';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { bookmarks, toggleBookmark } = useBookmarks();
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setRepos([]);
      setError('');
      return;
    }
    setLoading(true);
    setError('');
    searchRepositories(debouncedQuery)
      .then(setRepos)
      .catch(() => setError('Failed to fetch repositories.'))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  const filteredRepos = useMemo(() => {
    if (showOnlyBookmarks) {
      return repos.filter((repo) => bookmarks.has(repo.id));
    }
    return repos;
  }, [repos, showOnlyBookmarks, bookmarks]);

  const handleBookmarkToggle = useCallback(
    (repoId: number) => () => {
      toggleBookmark(repoId);
    },
    [toggleBookmark]
  );

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">GitHub Repository Search & Bookmark</h1>

      <input
        type="text"
        aria-label="Search GitHub repositories"
        placeholder="Search repositories..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <div className="my-4 flex items-center gap-4">
        <button
          onClick={() => setShowOnlyBookmarks(false)}
          className={`px-3 py-1 rounded ${!showOnlyBookmarks ? 'bg-blue-600 text-white' : 'border'}`}
        >
          All
        </button>
        <button
          onClick={() => setShowOnlyBookmarks(true)}
          className={`px-3 py-1 rounded ${showOnlyBookmarks ? 'bg-blue-600 text-white' : 'border'}`}
        >
          Bookmarked Only
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && (
        <div>
          <p className="text-red-600">{error}</p>
          <button onClick={() => setQuery(debouncedQuery)}>Retry</button>
        </div>
      )}
      {!loading && !error && filteredRepos.length === 0 && (
        <p>{!query ? 'Start typing to search.' : 'No repositories found.'}</p>
      )}

      <section className="space-y-4">
        {filteredRepos.map((repo) => (
          <RepositoryCard
            key={repo.id}
            repo={repo}
            isBookmarked={bookmarks.has(repo.id)}
            onToggleBookmark={handleBookmarkToggle(repo.id)}
          />
        ))}
      </section>
    </main>
  );
};

export default App;
