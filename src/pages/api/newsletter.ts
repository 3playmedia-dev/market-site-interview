import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Please provide a valid email address',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Simulate successful subscription
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thanks for subscribing! Check your inbox.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred. Please try again.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
