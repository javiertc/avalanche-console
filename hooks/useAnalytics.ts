import { useState, useEffect } from 'react';
import { analyticsService } from '@/lib/api';
import type { UsageMetrics, ApiUsageData, EndpointUsage } from '@/lib/api/analytics';

interface UseAnalyticsOptions {
  timeRange?: '24h' | '7d' | '30d' | '90d';
  apiKeyId?: string;
  endpoint?: string;
}

interface UseAnalyticsReturn {
  metrics: UsageMetrics | null;
  usageData: ApiUsageData[];
  endpointUsage: EndpointUsage[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAnalytics(options: UseAnalyticsOptions = {}): UseAnalyticsReturn {
  const [metrics, setMetrics] = useState<UsageMetrics | null>(null);
  const [usageData, setUsageData] = useState<ApiUsageData[]>([]);
  const [endpointUsage, setEndpointUsage] = useState<EndpointUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const filters = {
        timeRange: options.timeRange,
        apiKeyId: options.apiKeyId,
        endpoint: options.endpoint,
      };

      // Fetch metrics
      const metricsResult = await analyticsService.getUsageMetrics(filters);
      if (metricsResult.success) {
        setMetrics(metricsResult.data);
      } else {
        throw new Error(metricsResult.error.message);
      }

      // Fetch usage over time
      const usageResult = await analyticsService.getUsageOverTime(filters);
      if (usageResult.success) {
        setUsageData(usageResult.data);
      } else {
        throw new Error(usageResult.error.message);
      }

      // Fetch endpoint usage
      const endpointResult = await analyticsService.getEndpointUsage(filters);
      if (endpointResult.success) {
        setEndpointUsage(endpointResult.data);
      } else {
        throw new Error(endpointResult.error.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [options.timeRange, options.apiKeyId, options.endpoint]);

  return {
    metrics,
    usageData,
    endpointUsage,
    loading,
    error,
    refetch: fetchAnalytics,
  };
}