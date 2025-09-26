import { Page } from '@/models/Page';
import { User } from '@/models/User';
import dbConnect from '@/libs/mongoClient';
import { logger } from '@/libs/logger';

// Simple correlation id generator (avoids dependency) - format: ts-rand
function correlationId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function GET(request) {
  const cid = correlationId();
  const start = performance.now();

  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const uri = searchParams.get('uri');

    if (!uri) {
      logger.warn('livePageData missing uri', { cid });
      return new Response(JSON.stringify({ error: 'URI parameter required', cid }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const page = await Page.findOne({ uri }).lean();
    if (!page) {
      logger.info('livePageData page not found', { cid, uri });
      return new Response(JSON.stringify({ error: 'Page not found', cid }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const user = await User.findOne({ email: page.owner }).lean();

    page._id = page._id.toString();
    if (user) user._id = user._id.toString();

    const responseData = {
      page,
      user,
      lastUpdated: new Date().toISOString(),
      cid
    };

    const duration = performance.now() - start;
    if (duration > 1000) {
      logger.warn('livePageData slow response', { cid, uri, ms: duration.toFixed(2) });
    } else {
      logger.debug('livePageData served', { cid, uri, ms: duration.toFixed(2) });
    }

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    const duration = performance.now() - start;
    logger.error('livePageData error', { cid, ms: duration.toFixed(2), error: error.message, stack: process.env.NODE_ENV === 'production' ? undefined : error.stack });
    return new Response(JSON.stringify({ error: 'Internal server error', cid }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}