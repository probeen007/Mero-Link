// src/libs/correlation.js
// Lightweight correlation / request ID helpers for logging & tracing

export function generateCorrelationId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

// Attach correlation id to a context object (mutable) if absent
export function ensureCorrelation(context = {}) {
  if (!context.cid) context.cid = generateCorrelationId();
  return context.cid;
}

export function withCorrelation(fn) {
  return async (...args) => {
    const cid = generateCorrelationId();
    return fn(cid, ...args);
  };
}
