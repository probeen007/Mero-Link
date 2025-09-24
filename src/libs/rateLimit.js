// src/libs/rateLimit.js
const rateLimitMap = new Map();

export function rateLimit(limit = 100, windowMs = 15 * 60 * 1000) {
  return function(request) {
    const ip = getClientIP(request);
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean up old entries
    const requestData = rateLimitMap.get(ip) || [];
    const validRequests = requestData.filter(timestamp => timestamp > windowStart);
    
    if (validRequests.length >= limit) {
      return false; // Rate limit exceeded
    }
    
    // Add current request
    validRequests.push(now);
    rateLimitMap.set(ip, validRequests);
    
    return true; // Request allowed
  };
}

function getClientIP(request) {
  // Get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  return realIP || cfConnectingIP || 'unknown';
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  const cutoff = now - (60 * 60 * 1000); // 1 hour ago
  
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const validTimestamps = timestamps.filter(timestamp => timestamp > cutoff);
    if (validTimestamps.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, validTimestamps);
    }
  }
}, 10 * 60 * 1000); // Clean every 10 minutes