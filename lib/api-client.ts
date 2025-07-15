import { ApiError } from './api-error';
import type { AsyncResult } from '@/types/common';

/**
 * Type-safe API client for making requests to the backend
 * Centralizes error handling, authentication, and response parsing
 */
export class APIClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || process.env.NEXT_PUBLIC_API_URL || '';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Set authorization header for authenticated requests
   */
  setAuthToken(token: string) {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      'Authorization': `Bearer ${token}`,
    };
  }

  /**
   * Clear authorization header
   */
  clearAuthToken() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { Authorization, ...headers } = this.defaultHeaders as Record<string, string>;
    this.defaultHeaders = headers;
  }

  /**
   * Generic request method with error handling
   */
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<AsyncResult<T, ApiError>> {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
      });

      // Handle non-OK responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.error || `HTTP ${response.status}`,
          response.status,
          errorData.code,
          errorData.details
        );
      }

      // Parse JSON response
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      // If it's already an ApiError, return it
      if (error instanceof ApiError) {
        return { success: false, error };
      }

      // Network or other errors
      const message = error instanceof Error ? error.message : 'Network error';
      return {
        success: false,
        error: new ApiError(message, 500, 'NETWORK_ERROR'),
      };
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<AsyncResult<T, ApiError>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request<T>(`${endpoint}${queryString}`, {
      method: 'GET',
    });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: unknown): Promise<AsyncResult<T, ApiError>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: unknown): Promise<AsyncResult<T, ApiError>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<AsyncResult<T, ApiError>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: unknown): Promise<AsyncResult<T, ApiError>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// Create singleton instance
export const apiClient = new APIClient();

// Example usage in components:
/*
const { data, error } = await apiClient.get<ApiUsageData[]>('/api/analytics/usage');

if (!data) {
  console.error('Failed to fetch usage data:', error);
  return;
}

// Use the typed data
data.forEach(item => {
  console.log(item.date, item.total);
});
*/ 