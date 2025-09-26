// src/app/api/health/route.js
// Health check endpoint for production monitoring

import mongoose from 'mongoose';
import dbConnect from '@/libs/mongoClient';
import { NextResponse } from 'next/server';

// Track last DB error globally (can be set in dbConnect catch blocks elsewhere)
if (!global.__lastDbError) {
  global.__lastDbError = null;
}

function mapReadyState(state) {
  switch (state) {
    case 0: return 'disconnected';
    case 1: return 'connected';
    case 2: return 'connecting';
    case 3: return 'disconnecting';
    default: return 'unknown';
  }
}

export async function GET() {
  const healthCheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
    checks: {
      database: 'unknown',
      memory: 'unknown',
      uptime: process.uptime(),
      dbState: mapReadyState(mongoose.connection.readyState),
      lastDbError: global.__lastDbError ? {
        message: global.__lastDbError.message,
        at: global.__lastDbError.at
      } : null
    }
  };

  try {
    // Check database connection
    if (mongoose.connection.readyState === 1) {
      healthCheck.checks.database = 'connected';
    } else {
      await dbConnect();
      healthCheck.checks.database = 'connected';
    }
  } catch (error) {
    healthCheck.checks.database = 'error';
    healthCheck.status = 'degraded';
    global.__lastDbError = { message: error.message, at: new Date().toISOString() };
  }

  // Memory usage check
  if (typeof process !== 'undefined' && process.memoryUsage) {
    const memory = process.memoryUsage();
    healthCheck.checks.memory = {
      rss: `${(memory.rss / 1024 / 1024).toFixed(2)}MB`,
      heapUsed: `${(memory.heapUsed / 1024 / 1024).toFixed(2)}MB`,
      heapTotal: `${(memory.heapTotal / 1024 / 1024).toFixed(2)}MB`,
    };

    // Alert if memory usage is high (>400MB)
    if (memory.heapUsed > 400 * 1024 * 1024) {
      healthCheck.status = 'warning';
      healthCheck.alerts = ['High memory usage detected'];
    }
  }

  const statusCode = healthCheck.status === 'ok' ? 200 : 
                    healthCheck.status === 'warning' ? 200 : 503;

  return NextResponse.json(healthCheck, { status: statusCode });
}