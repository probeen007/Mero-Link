export function jsonResponse(payload, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
  });
}

export function ok(payload = {}) {
  return jsonResponse(payload, 200);
}

export function created(payload = {}) {
  return jsonResponse(payload, 201);
}

export function badRequest(message = 'Bad request', extra = {}) {
  return jsonResponse({ error: message, ...extra }, 400);
}

export function unauthorized(message = 'Unauthorized', extra = {}) {
  return jsonResponse({ error: message, ...extra }, 401);
}

export function forbidden(message = 'Forbidden', extra = {}) {
  return jsonResponse({ error: message, ...extra }, 403);
}

export function notFound(message = 'Not found', extra = {}) {
  return jsonResponse({ error: message, ...extra }, 404);
}

export function tooManyRequests(message = 'Too many requests', extra = {}) {
  return jsonResponse({ error: message, ...extra }, 429);
}

export function serverError(message = 'Internal server error', extra = {}) {
  return jsonResponse({ error: message, ...extra }, 500);
}

export function isValidObjectId(value) {
  return typeof value === 'string' && /^[a-f\d]{24}$/i.test(value);
}

export function isLikelyUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}
