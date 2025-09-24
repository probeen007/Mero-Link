// src/app/api/health/route.js
// Health check endpoint for production monitoring

import mongoose from 'mongoose';
import dbConnect from '@/libs/mongoClient';
import { NextResponse } from 'next/server';

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