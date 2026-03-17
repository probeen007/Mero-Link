// src/libs/performance.js
// Performance monitoring utilities for production

export function measurePerformance(name, fn) {
  return async (...args) => {
    const start = performance.now();
    
    try {
      const result = await fn(...args);
      const end = performance.now();
      const duration = end - start;
      
      console.log(`⚡ ${name}: ${duration.toFixed(2)}ms`);
      
      // Log slow operations (>1000ms)
      if (duration > 1000) {
        console.warn(`🐌 Slow operation detected: ${name} took ${duration.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const end = performance.now();
      const duration = end - start;
      console.error(`❌ ${name} failed after ${duration.toFixed(2)}ms:`, error);
      throw error;
    }
  };
}

export class PerformanceTimer {
  constructor(name) {
    this.name = name;
    this.start = performance.now();
  }

  end() {
    const duration = performance.now() - this.start;
    console.log(`⚡ ${this.name}: ${duration.toFixed(2)}ms`);
    return duration;
  }
}

// Memory usage monitoring
export function logMemoryUsage() {
  if (typeof process !== 'undefined' && process.memoryUsage) {
    const memory = process.memoryUsage();
    console.log('📊 Memory Usage:', {
      rss: `${(memory.rss / 1024 / 1024).toFixed(2)}MB`,
      heapTotal: `${(memory.heapTotal / 1024 / 1024).toFixed(2)}MB`,
      heapUsed: `${(memory.heapUsed / 1024 / 1024).toFixed(2)}MB`,
      external: `${(memory.external / 1024 / 1024).toFixed(2)}MB`,
    });
  }
}

// Database query optimization
export function optimizeMongooseQuery(query) {
  return query
    .lean() // Return plain JavaScript objects instead of Mongoose documents
    .maxTimeMS(5000) // Set maximum execution time
    .hint({ _id: 1 }); // Use index hint when appropriate
}
