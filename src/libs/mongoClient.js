
import mongoose from "mongoose";

if (!process.env.MONGO_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGO_URI"')
}

const uri = process.env.MONGO_URI

// Production-optimized Mongoose connection options
const options = {
  // Connection Pool Settings
  maxPoolSize: 10, // Maintain up to 10 socket connections
  minPoolSize: 5,  // Maintain a minimum of 5 socket connections
  maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
  
  // Timeout Settings
  serverSelectionTimeoutMS: 15000, // Keep trying to send operations for 15 seconds (increased)
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  connectTimeoutMS: 15000, // Give up initial connection after 15 seconds (increased)
  
  // Performance & Reliability
  heartbeatFrequencyMS: 10000, // Send a ping to server every 10 seconds
  retryWrites: true, // Automatically retry failed writes
  retryReads: true,  // Automatically retry failed reads
  
  // Compression
  compressors: ['snappy', 'zlib'], // Enable compression for better performance
  
  // Buffer Settings
  bufferMaxEntries: 0, // Disable mongoose buffering in production
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
    cached.promise = mongoose.connect(uri, options).then((mongoose) => {
      console.log('📊 MongoDB connected successfully');
      return mongoose
    }).catch((error) => {
      console.error('❌ MongoDB connection error:', error);
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