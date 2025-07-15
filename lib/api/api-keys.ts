import { apiClient } from '../api-client';
import type { AsyncResult } from '@/types/common';

export interface ApiKey {
  id: string;
  key: string;
  name: string;
  requests: string;
  created: string;
  lastUsed?: string;
  status: 'active' | 'inactive' | 'revoked';
}

export interface CreateApiKeyRequest {
  name: string;
  description?: string;
}

export interface CreateApiKeyResponse {
  id: string;
  key: string;
  name: string;
  created: string;
}

export interface ApiKeyUsageStats {
  totalRequests: number;
  requestsToday: number;
  lastUsed?: string;
  endpoints: {
    name: string;
    requests: number;
  }[];
}

/**
 * API Keys service for managing user API keys
 */
export class ApiKeysService {
  /**
   * Get all API keys for the current user
   */
  async getApiKeys(): Promise<AsyncResult<ApiKey[], Error>> {
    return apiClient.get<ApiKey[]>('/api/keys');
  }

  /**
   * Create a new API key
   */
  async createApiKey(request: CreateApiKeyRequest): Promise<AsyncResult<CreateApiKeyResponse, Error>> {
    return apiClient.post<CreateApiKeyResponse>('/api/keys', request);
  }

  /**
   * Delete an API key
   */
  async deleteApiKey(keyId: string): Promise<AsyncResult<void, Error>> {
    return apiClient.delete(`/api/keys/${keyId}`);
  }

  /**
   * Get usage statistics for an API key
   */
  async getApiKeyUsage(keyId: string): Promise<AsyncResult<ApiKeyUsageStats, Error>> {
    return apiClient.get<ApiKeyUsageStats>(`/api/keys/${keyId}/usage`);
  }

  /**
   * Regenerate an API key
   */
  async regenerateApiKey(keyId: string): Promise<AsyncResult<CreateApiKeyResponse, Error>> {
    return apiClient.post<CreateApiKeyResponse>(`/api/keys/${keyId}/regenerate`);
  }

  /**
   * Update API key settings
   */
  async updateApiKey(keyId: string, updates: Partial<Pick<ApiKey, 'name' | 'status'>>): Promise<AsyncResult<ApiKey, Error>> {
    return apiClient.patch<ApiKey>(`/api/keys/${keyId}`, updates);
  }
}

// Export singleton instance
export const apiKeysService = new ApiKeysService();