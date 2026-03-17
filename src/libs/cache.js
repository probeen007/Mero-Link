// src/libs/cache.js
// Simple in-memory cache with TTL for production optimization

class Cache {
  constructor() {
    this.cache = new Map();
    this.timers = new Map();
  }

  set(key, value, ttl = 300000) { // 5 minutes default TTL
    // Clear existing timer
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
    }

    // Set value
    this.cache.set(key, value);

    // Set expiration timer
    const timer = setTimeout(() => {
      this.cache.delete(key);
      this.timers.delete(key);
    }, ttl);

    this.timers.set(key, timer);
  }

  get(key) {
    return this.cache.get(key);
  }

  has(key) {
    return this.cache.has(key);
  }

  delete(key) {
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
      this.timers.delete(key);
    }
    return this.cache.delete(key);
  }

  clear() {
    // Clear all timers
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }
    this.cache.clear();
    this.timers.clear();
  }

  size() {
    return this.cache.size;
  }
}

// Export singleton instance
export const cache = new Cache();

// Cache utility functions
export function cacheKey(...parts) {
  return parts.join(':');
}

export function getCachedOrFetch(key, fetchFn, ttl = 300000) {
  const cached = cache.get(key);
  if (cached) {
    return Promise.resolve(cached);
  }

  return fetchFn().then(result => {
    cache.set(key, result, ttl);
    return result;
  });
}

// Cleanup on process exit
if (typeof process !== 'undefined') {
  process.on('exit', () => cache.clear());
  process.on('SIGINT', () => {
    cache.clear();
    process.exit(0);
  });
}
