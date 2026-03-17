// src/libs/errorHandler.js
// Centralized error handling for API routes

import { logger } from './logger';

export class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

export function handleApiError(error, req) {
  const errorId = Date.now().toString(36) + Math.random().toString(36).substr(2);
  
  logger.error('API Error', {
    errorId,
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    userAgent: req.headers['user-agent'],
    ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
  });

  // Determine status code
  let statusCode = 500;
  let message = 'Internal server error';

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
  } else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  } else if (error.code === 11000) {
    statusCode = 409;
    message = 'Duplicate entry';
  } else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  return Response.json(
    {
      error: message,
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
        errorId,
      }),
    },
    { status: statusCode }
  );
}

// Async error wrapper for API routes
export function asyncHandler(fn) {
  return async (req, ...args) => {
    try {
      return await fn(req, ...args);
    } catch (error) {
      return handleApiError(error, req);
    }
  };
}

// Database connection error handler
export function handleDbError(error) {
  logger.error('Database connection error', {
    message: error.message,
    stack: error.stack,
  });

  if (process.env.NODE_ENV === 'production') {
    // In production, exit the process to trigger a restart
    process.exit(1);
  }
}
