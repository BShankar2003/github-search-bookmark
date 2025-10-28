import React from 'react';
import type { Repository } from '../types/github';

interface Props {
  repo: Repository;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

const RepositoryCard: React.FC<Props> = React.memo(
  ({ repo, isBookmarked, onToggleBookmark }) => {
    return (
      <article>
        <img
          className="avatar"
          src={repo.owner.avatar_url}
          alt={`${repo.owner.login} avatar`}
        />
        <div style={{ flex: 1 }}>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 700, fontSize: '1.18rem', color: '#2563eb' }}
          >
            {repo.name}
          </a>
          <p className="secondary">
            {repo.description || 'No description'}
          </p>
          <div className="secondary" style={{ marginTop: 11 }}>
            <span style={{ marginRight: 17 }}>
              ⭐ {repo.stargazers_count}
            </span>
            <span>{repo.language || 'N/A'}</span>
          </div>
        </div>
        <span
          className="star"
          onClick={onToggleBookmark}
          title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          tabIndex={0}
          role="button"
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          {isBookmarked ? '★' : '☆'}
        </span>
      </article>
    );
  }
);

export default RepositoryCard;
