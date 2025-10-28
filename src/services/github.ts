import axios from 'axios';
import type { Repository } from '../types/github';

const BASE_URL = 'https://api.github.com/search/repositories';

export async function searchRepositories(query: string): Promise<Repository[]> {
  if (!query.trim()) return [];
  const response = await axios.get(BASE_URL, {
    params: { q: query, per_page: 30 },
  });
  return response.data.items;
}
