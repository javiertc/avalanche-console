import { apiClient } from '../api-client';
import type { AsyncResult } from '@/types/common';

export interface SystemService {
  name: string;
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  uptime: number;
  responseTime?: number;
  lastChecked: string;
  incidents?: {
    id: string;
    title: string;
    status: string;
    createdAt: string;
  }[];
}

export interface SystemHealth {
  overall: 'healthy' | 'degraded' | 'unhealthy';
  services: SystemService[];
  lastUpdated: string;
}

export interface ServiceMetrics {
  serviceName: string;
  uptime: number;
  responseTime: number;
  errorRate: number;
  requestsPerMinute: number;
  lastIncident?: {
    title: string;
    resolvedAt: string;
  };
}

/**
 * System service for monitoring service health and status
 */
export class SystemService {
  /**
   * Get overall system health status
   */
  async getSystemHealth(): Promise<AsyncResult<SystemHealth, Error>> {
    return apiClient.get<SystemHealth>('/api/system/health');
  }

  /**
   * Get detailed metrics for a specific service
   */
  async getServiceMetrics(serviceName: string): Promise<AsyncResult<ServiceMetrics, Error>> {
    return apiClient.get<ServiceMetrics>(`/api/system/services/${serviceName}/metrics`);
  }

  /**
   * Get service incidents
   */
  async getServiceIncidents(serviceName?: string): Promise<AsyncResult<{
    id: string;
    title: string;
    description: string;
    status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
    impact: 'minor' | 'major' | 'critical';
    services: string[];
    createdAt: string;
    updatedAt: string;
    resolvedAt?: string;
  }[], Error>> {
    const params: Record<string, string> = {};
    if (serviceName) {
      params.service = serviceName;
    }
    return apiClient.get('/api/system/incidents', params);
  }

  /**
   * Subscribe to system status updates (WebSocket)
   */
  subscribeToStatusUpdates(callback: (status: SystemHealth) => void): () => void {
    // In a real implementation, this would establish a WebSocket connection
    // For now, we'll simulate with polling
    const interval = setInterval(async () => {
      const result = await this.getSystemHealth();
      if (result.success) {
        callback(result.data);
      }
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }
}

// Export singleton instance
export const systemService = new SystemService();