// src/app/api/cache-metrics/route.js
// Cache monitoring endpoint - development/admin only

import { cacheMonitor } from '@/libs/cacheMonitor';

export async function GET(request) {
  // For security, only allow in development or with admin token
  // In production, wrap this with proper authentication
  if (process.env.NODE_ENV === 'production') {
    // Optional: Check for admin token header
    const token = request.headers.get('x-cache-admin-token');
    if (!token || token !== process.env.CACHE_ADMIN_TOKEN) {
      return new Response('Unauthorized', { status: 401 });
    }
  }

  const metrics = cacheMonitor.getMetrics();
  
  return new Response(
    JSON.stringify({
      success: true,
      data: {
        ...metrics,
        topKeys: cacheMonitor.getTopKeys(10)
      }
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

export async function POST(request) {
  // Reset metrics endpoint
  if (process.env.NODE_ENV === 'production') {
    return new Response('Not allowed in production', { status: 403 });
  }

  const action = request.headers.get('x-cache-action');
  
  if (action === 'reset') {
    cacheMonitor.reset();
    return new Response(
      JSON.stringify({ success: true, message: 'Cache metrics reset' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  return new Response('Invalid action', { status: 400 });
}
