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
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 15000, // Increased to match main MongoDB client
  socketTimeoutMS: 45000,
  connectTimeoutMS: 15000, // Increased to match main MongoDB client
  heartbeatFrequencyMS: 10000,
  retryWrites: true,
  retryReads: true,
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
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise for NextAuth
export default clientPromise