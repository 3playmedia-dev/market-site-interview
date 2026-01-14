/**
 * API Client utilities
 *
 * Provides typed fetch wrappers for our API endpoints.
 */

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
}

export interface Stats {
  activeUsers: number;
  totalPosts: number;
  engagement: number;
}

export interface NewsletterResponse {
  success: boolean;
  message: string;
}

class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new ApiError(
      `API error: ${response.statusText}`,
      response.status
    );
  }
  return response.json();
}

export const api = {
  posts: {
    list: async (): Promise<Post[]> => {
      const response = await fetch('/api/posts');
      return handleResponse<Post[]>(response);
    },
  },

  stats: {
    get: async (): Promise<Stats> => {
      const response = await fetch('/api/stats');
      return handleResponse<Stats>(response);
    },
  },

  newsletter: {
    subscribe: async (email: string): Promise<NewsletterResponse> => {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      return handleResponse<NewsletterResponse>(response);
    },
  },
};
