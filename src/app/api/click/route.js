import { Event } from '@/models/Event';
import dbConnect from '@/libs/mongoClient';
import { logger } from '@/libs/logger';

function correlationId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export async function POST(req) {
  const cid = correlationId();
  const start = performance.now();

  try {
    await dbConnect();
    const url = new URL(req.url);
    const encoded = url.searchParams.get('url');
    const page = url.searchParams.get('page');

    if (!encoded || !page) {
      logger.warn('click route missing params', { cid, hasEncoded: !!encoded, page });
      return new Response(JSON.stringify({ success: false, error: 'Missing parameters', cid }), { status: 400 });
    }

    let clickedLink = '';
    try {
      clickedLink = Buffer.from(encoded, 'base64').toString('utf8');
    } catch (e) {
      logger.warn('click route invalid base64', { cid, encoded });
      return new Response(JSON.stringify({ success: false, error: 'Invalid link encoding', cid }), { status: 400 });
    }

    await Event.create({ type: 'click', uri: clickedLink, page });
    const ms = (performance.now() - start).toFixed(2);
    logger.debug('click event logged', { cid, page, uri: clickedLink, ms });
    return new Response(JSON.stringify({ success: true, cid }), { status: 201 });
  } catch (error) {
    const ms = (performance.now() - start).toFixed(2);
    logger.error('click route error', { cid, error: error.message, ms });
    return new Response(JSON.stringify({ success: false, error: 'Internal server error', cid }), { status: 500 });
  }
}