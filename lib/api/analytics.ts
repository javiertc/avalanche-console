import { apiClient } from '../api-client';
import type { AsyncResult } from '@/types/common';

export interface ApiUsageData {
  date: string;
  value: number;
  endpoint?: string;
  apiKey?: string;
}

export interface UsageMetrics {
  totalRequests: number;
  avgResponseTime: number;
  errorRate: number;
  successRate: number;
  requestsPerSecond: number;
}

export interface EndpointUsage {
  endpoint: string;
  requests: number;
  avgResponseTime: number;
  errorRate: number;
}

export interface ApiKeyUsage {
  keyId: string;
  keyName: string;
  requests: number;
  lastUsed?: string;
}

export interface AnalyticsFilters {
  startDate?: string;
  endDate?: string;
  apiKeyId?: string;
  endpoint?: string;
  timeRange?: '24h' | '7d' | '30d' | '90d';
}

/**
 * Analytics service for API usage metrics and statistics
 */
export class AnalyticsService {
  /**
   * Get overall usage metrics
   */
  async getUsageMetrics(filters?: AnalyticsFilters): Promise<AsyncResult<UsageMetrics, Error>> {
    const params = this.buildQueryParams(filters);
    return apiClient.get<UsageMetrics>('/api/analytics/metrics', params);
  }

  /**
   * Get API usage data over time
   */
  async getUsageOverTime(filters?: AnalyticsFilters): Promise<AsyncResult<ApiUsageData[], Error>> {
    const params = this.buildQueryParams(filters);
    return apiClient.get<ApiUsageData[]>('/api/analytics/usage-over-time', params);
  }

  /**
   * Get usage by endpoint
   */
  async getEndpointUsage(filters?: AnalyticsFilters): Promise<AsyncResult<EndpointUsage[], Error>> {
    const params = this.buildQueryParams(filters);
    return apiClient.get<EndpointUsage[]>('/api/analytics/endpoints', params);
  }

  /**
   * Get usage by API key
   */
  async getApiKeyUsage(filters?: AnalyticsFilters): Promise<AsyncResult<ApiKeyUsage[], Error>> {
    const params = this.buildQueryParams(filters);
    return apiClient.get<ApiKeyUsage[]>('/api/analytics/api-keys', params);
  }

  /**
   * Get Data API specific metrics
   */
  async getDataApiMetrics(filters?: AnalyticsFilters): Promise<AsyncResult<{
    usage: ApiUsageData[];
    endpoints: EndpointUsage[];
  }, Error>> {
    const params = this.buildQueryParams({ ...filters, service: 'data-api' });
    return apiClient.get('/api/analytics/data-api', params);
  }

  /**
   * Get Metrics API specific metrics
   */
  async getMetricsApiMetrics(filters?: AnalyticsFilters): Promise<AsyncResult<{
    usage: ApiUsageData[];
    endpoints: EndpointUsage[];
  }, Error>> {
    const params = this.buildQueryParams({ ...filters, service: 'metrics-api' });
    return apiClient.get('/api/analytics/metrics-api', params);
  }

  /**
   * Get Webhooks API specific metrics
   */
  async getWebhooksApiMetrics(filters?: AnalyticsFilters): Promise<AsyncResult<{
    usage: ApiUsageData[];
    webhooks: {
      id: string;
      url: string;
      events: string[];
      deliveries: number;
      successRate: number;
    }[];
  }, Error>> {
    const params = this.buildQueryParams({ ...filters, service: 'webhooks-api' });
    return apiClient.get('/api/analytics/webhooks-api', params);
  }

  private buildQueryParams(filters?: AnalyticsFilters & { service?: string }): Record<string, string> {
    if (!filters) return {};
    
    const params: Record<string, string> = {};
    
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;
    if (filters.apiKeyId) params.apiKeyId = filters.apiKeyId;
    if (filters.endpoint) params.endpoint = filters.endpoint;
    if (filters.timeRange) params.timeRange = filters.timeRange;
    if (filters.service) params.service = filters.service;
    
    return params;
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();