import axios from 'axios';

interface SearchResult {
  title: string;
  description: string;
  url: string;
  source: string;
}

export async function searchCompanyInfo(query: string): Promise<SearchResult[]> {
  try {
    const response = await fetch('/api/perplexity/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `${query} 医疗行业 组织架构 岗位体系`,
        max_results: 5
      }),
    });

    if (!response.ok) {
      throw new Error('搜索请求失败');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Perplexity search error:', error);
    throw error;
  }
} 