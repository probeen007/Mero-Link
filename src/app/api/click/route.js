import { Event } from '@/models/Event';
import dbConnect from '@/libs/mongoClient';
import { logger } from '@/libs/logger';
import { rateLimit } from '@/libs/rateLimit';
import { badRequest, created, serverError, tooManyRequests } from '@/libs/apiResponse';

const clickRateLimit = rateLimit(600, 5 * 60 * 1000);

function correlationId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export async function POST(req) {
  const cid = correlationId();
  const start = performance.now();

  try {
    if (!clickRateLimit(req)) {
      return tooManyRequests('Too many requests', { success: false, cid });
    }

    await dbConnect();
    const url = new URL(req.url);
    const encoded = url.searchParams.get('url');
    const page = url.searchParams.get('page');

    if (!encoded || !page) {
      logger.warn('click route missing params', { cid, hasEncoded: !!encoded, page });
      return badRequest('Missing parameters', { success: false, cid });
    }

    if (typeof page !== 'string' || page.length > 120) {
      return badRequest('Invalid page parameter', { success: false, cid });
    }

    let clickedLink = '';
    try {
      clickedLink = Buffer.from(encoded, 'base64').toString('utf8');
    } catch (e) {
      logger.warn('click route invalid base64', { cid, encoded });
      return badRequest('Invalid link encoding', { success: false, cid });
    }

    if (!clickedLink || clickedLink.length > 2000) {
      return badRequest('Invalid link value', { success: false, cid });
    }

    await Event.create({ type: 'click', uri: clickedLink, page });
    const ms = (performance.now() - start).toFixed(2);
    logger.debug('click event logged', { cid, page, uri: clickedLink, ms });
    return created({ success: true, cid });
  } catch (error) {
    const ms = (performance.now() - start).toFixed(2);
    logger.error('click route error', { cid, error: error.message, ms });
    return serverError('Internal server error', { success: false, cid });
  }
}
