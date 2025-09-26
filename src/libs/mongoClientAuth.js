// src/libs/mongoClientAuth.js
// Separate MongoDB client specifically for NextAuth adapter

import { MongoClient } from "mongodb"

if (!process.env.MONGO_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGO_URI"')
}

const uri = process.env.MONGO_URI

// Optimized options for NextAuth MongoDB adapter
const options = {
  maxPoolSize: 10,
  minPoolSize: 0, // allow scaling to zero in serverless idle periods
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 30000, // give more time for elections / cold starts
  socketTimeoutMS: 60000,
  connectTimeoutMS: 30000,
  heartbeatFrequencyMS: 10000,
  retryWrites: true,
  retryReads: true,
  family: 4, // prefer IPv4 to avoid IPv6 DNS issues on some platforms
}

let client
let clientPromise

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global
  
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  const connectWithRetry = async () => {
    const delays = [500, 1000, 2000]
    let lastError
    for (let i = 0; i < delays.length; i++) {
      try {
        return await client.connect()
      } catch (err) {
        lastError = err
        if (i < delays.length - 1) {
          await new Promise(res => setTimeout(res, delays[i]))
        }
      }
    }
    throw lastError
  }
  clientPromise = connectWithRetry()
}

// Export a module-scoped MongoClient promise for NextAuth
export default clientPromise