import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Generate some dynamic stats
  const stats = {
    activeUsers: Math.floor(Math.random() * 500) + 1000,
    totalPosts: 847,
    engagement: Math.floor(Math.random() * 10) + 85,
  };

  return new Response(JSON.stringify(stats), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
