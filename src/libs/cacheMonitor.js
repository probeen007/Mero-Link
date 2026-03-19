// src/libs/cacheMonitor.js
// Cache monitoring and metrics tracking

class CacheMonitor {
  constructor() {
    this.metrics = {
      hits: 0,
      misses: 0,
      evictions: 0,
      sets: 0,
      deletes: 0,
      byKey: {} // Track metrics per cache key
    };
  }

  recordHit(key) {
    this.metrics.hits++;
    if (!this.metrics.byKey[key]) this.metrics.byKey[key] = { hits: 0, misses: 0 };
    this.metrics.byKey[key].hits++;
  }

  recordMiss(key) {
    this.metrics.misses++;
    if (!this.metrics.byKey[key]) this.metrics.byKey[key] = { hits: 0, misses: 0 };
    this.metrics.byKey[key].misses++;
  }

  recordSet(key) {
    this.metrics.sets++;
  }

  recordDelete(key) {
    this.metrics.deletes++;
  }

  recordEviction(key) {
    this.metrics.evictions++;
  }

  getHitRate() {
    const total = this.metrics.hits + this.metrics.misses;
    return total === 0 ? 0 : ((this.metrics.hits / total) * 100).toFixed(2);
  }

  getMetrics() {
    return {
      ...this.metrics,
      hitRate: this.getHitRate(),
      totalRequests: this.metrics.hits + this.metrics.misses,
      timestamp: new Date().toISOString()
    };
  }

  getKeyMetrics(key) {
    return this.metrics.byKey[key] || { hits: 0, misses: 0 };
  }

  reset() {
    this.metrics = {
      hits: 0,
      misses: 0,
      evictions: 0,
      sets: 0,
      deletes: 0,
      byKey: {}
    };
  }

  // Get top performing keys by hit rate
  getTopKeys(limit = 5) {
    return Object.entries(this.metrics.byKey)
      .sort(([, a], [, b]) => {
        const rateA = a.hits / (a.hits + a.misses) || 0;
        const rateB = b.hits / (b.hits + b.misses) || 0;
        return rateB - rateA;
      })
      .slice(0, limit)
      .map(([key, stats]) => ({
        key,
        hits: stats.hits,
        misses: stats.misses,
        hitRate: ((stats.hits / (stats.hits + stats.misses)) * 100).toFixed(2)
      }));
  }
}

export const cacheMonitor = new CacheMonitor();
