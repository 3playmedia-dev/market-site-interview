import type { APIRoute } from 'astro';

const posts = [
  {
    id: 1,
    title: 'Getting Started with Astro',
    excerpt: 'Learn how to build blazing fast websites with Astro and React islands.',
    author: 'Jane Developer',
    date: '2024-01-15',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'The Power of CSS Variables',
    excerpt: 'How modern CSS custom properties enable dynamic theming without JavaScript.',
    author: 'Alex Designer',
    date: '2024-01-12',
    readTime: '4 min read',
  },
  {
    id: 3,
    title: 'React Query Best Practices',
    excerpt: 'Patterns for managing server state in React applications effectively.',
    author: 'Sam Engineer',
    date: '2024-01-10',
    readTime: '7 min read',
  },
  {
    id: 4,
    title: 'Accessibility First Development',
    excerpt: 'Building inclusive web experiences that work for everyone.',
    author: 'Jordan UX',
    date: '2024-01-08',
    readTime: '6 min read',
  },
];

export const GET: APIRoute = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
