import { z } from 'zod';

/**
 * Custom error class for API errors with proper typing and status codes
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static badRequest(message: string, details?: unknown) {
    return new ApiError(message, 400, 'BAD_REQUEST', details);
  }

  static unauthorized(message = 'Authentication required') {
    return new ApiError(message, 401, 'UNAUTHORIZED');
  }

  static forbidden(message = 'Access denied') {
    return new ApiError(message, 403, 'FORBIDDEN');
  }

  static notFound(resource: string) {
    return new ApiError(`${resource} not found`, 404, 'NOT_FOUND');
  }

  static conflict(message: string) {
    return new ApiError(message, 409, 'CONFLICT');
  }

  static tooManyRequests(message = 'Too many requests') {
    return new ApiError(message, 429, 'RATE_LIMITED');
  }

  static internal(message = 'Internal server error') {
    return new ApiError(message, 500, 'INTERNAL_ERROR');
  }
}

/**
 * Type guard to check if an error is an ApiError
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * Centralized error handler for API routes
 */
export function handleApiError(error: unknown): Response {
  console.error('API Error:', error);

  // Handle Zod validation errors
  if (error instanceof z.ZodError) {
    return Response.json(
      {
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      },
      { status: 400 }
    );
  }

  // Handle our custom API errors
  if (isApiError(error)) {
    const body: Record<string, unknown> = {
      error: error.message,
      code: error.code
    };
    
    if (error.details !== undefined) {
      body.details = error.details;
    }
    
    return Response.json(body, { status: error.statusCode });
  }

  // Handle other errors
  const message = error instanceof Error ? error.message : 'An unexpected error occurred';
  
  return Response.json(
    {
      error: message,
      code: 'INTERNAL_ERROR'
    },
    { status: 500 }
  );
}

/**
 * Wrapper for API route handlers with automatic error handling
 */
export function withApiErrorHandler<T extends any[], R>(
  handler: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<Response> => {
    try {
      const result = await handler(...args);
      return result as Response;
    } catch (error) {
      return handleApiError(error);
    }
  };
} 