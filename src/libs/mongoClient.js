
import mongoose from "mongoose";

// Global diagnostics object for health & debugging
if (!global.__mongoMetrics) {
  global.__mongoMetrics = {
    lastAttemptAt: null,
    lastSuccessAt: null,
    lastErrorAt: null,
    lastErrorMessage: null,
    attemptCount: 0,
    consecutiveFailures: 0,
  };
}

if (!process.env.MONGO_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGO_URI"')
}

const uri = process.env.MONGO_URI

// Production-optimized Mongoose connection options
const options = {
  // Connection Pool Settings
  maxPoolSize: 10, // Maintain up to 10 socket connections
  minPoolSize: 0,  // In serverless, let the pool scale to zero when idle
  maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
  
  // Timeout Settings
  serverSelectionTimeoutMS: 30000, // Allow more time for cold starts / elections
  socketTimeoutMS: 60000, // Close sockets after 60 seconds of inactivity
  connectTimeoutMS: 30000, // Allow longer initial connect on cold start
  
  // Performance & Reliability
  heartbeatFrequencyMS: 10000, // Send a ping to server every 10 seconds
  retryWrites: true, // Automatically retry failed writes
  retryReads: true,  // Automatically retry failed reads
  
  // Compression
  compressors: ['snappy', 'zlib'], // Enable compression for better performance
  
  // NOTE: bufferMaxEntries removed (deprecated in modern drivers); Mongoose buffering is controlled via mongoose.set('bufferCommands', false) if needed
  
  // Networking
  family: 4, // Prefer IPv4 to avoid IPv6 DNS issues in some platforms
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    // Exponential backoff retry: 3 attempts (0.5s, 1s, 2s)
    const connectWithRetry = async () => {
      const delays = [500, 1000, 2000];
      let lastError;
      for (let i = 0; i < delays.length; i++) {
        try {
          global.__mongoMetrics.attemptCount += 1;
          global.__mongoMetrics.lastAttemptAt = new Date().toISOString();
          const m = await mongoose.connect(uri, options);
          console.log('📊 MongoDB connected successfully');
          global.__mongoMetrics.lastSuccessAt = new Date().toISOString();
          global.__mongoMetrics.consecutiveFailures = 0;
          global.__mongoMetrics.lastErrorMessage = null;
          return m;
        } catch (err) {
          lastError = err;
          console.error(`❌ MongoDB connection attempt ${i + 1} failed:`, err?.message || err);
          global.__mongoMetrics.lastErrorAt = new Date().toISOString();
          global.__mongoMetrics.lastErrorMessage = err?.message || String(err);
          global.__mongoMetrics.consecutiveFailures += 1;
          // Only wait if there is another attempt
          if (i < delays.length - 1) {
            await new Promise(res => setTimeout(res, delays[i]));
          }
        }
      }
      throw lastError;
    };

    cached.promise = connectWithRetry().catch((error) => {
      cached.promise = null;
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect