import type { APIRoute } from 'astro';

const testimonials = [
  {
    id: 1,
    quote: "TestCo completely transformed how our team ships products. We've cut our release cycle in half.",
    author: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'Streamline Inc',
  },
  {
    id: 2,
    quote: "The analytics alone paid for itself in the first month. We finally understand our users.",
    author: 'Marcus Johnson',
    role: 'Product Manager',
    company: 'GrowthLab',
  },
  {
    id: 3,
    quote: "I was skeptical at first, but the onboarding was seamless. Our whole team was productive within a day.",
    author: 'Emily Rodriguez',
    role: 'CTO',
    company: 'Nova Startup',
  },
  {
    id: 4,
    quote: "Best decision we made this year. The collaboration features are exactly what we needed.",
    author: 'David Park',
    role: 'Engineering Lead',
    company: 'TechForward',
  },
  {
    id: 5,
    quote: "Support team is incredible. Any time we've had questions, they've responded within hours.",
    author: 'Lisa Thompson',
    role: 'Director of Operations',
    company: 'ScaleUp Co',
  },
];

export const GET: APIRoute = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  return new Response(JSON.stringify(testimonials), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
