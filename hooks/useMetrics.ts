import useSWR from 'swr';
import { METRICS_API_BASE_URL, type MetricsResponse } from '@/constants/metrics';

interface MetricsParams {
  chainId: string;
  metricType: string;
  startTimestamp: number;
  endTimestamp: number;
  timeInterval: string;
  pageSize?: number;
}

const fetcher = async (url: string): Promise<MetricsResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch metrics: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

const buildMetricsUrl = (params: MetricsParams): string => {
  const { chainId, metricType, startTimestamp, endTimestamp, timeInterval, pageSize = 100 } = params;
  
  const url = new URL(`${METRICS_API_BASE_URL}/chains/${chainId}/metrics/${metricType}`);
  url.searchParams.set('startTimestamp', startTimestamp.toString());
  url.searchParams.set('endTimestamp', endTimestamp.toString());
  url.searchParams.set('timeInterval', timeInterval);
  url.searchParams.set('pageSize', pageSize.toString());
  
  return url.toString();
};

export function useMetrics(params: MetricsParams | null) {
  const url = params ? buildMetricsUrl(params) : null;
  
  const { data, error, isLoading, mutate } = useSWR<MetricsResponse>(
    url,
    fetcher,
    {
      refreshInterval: 60000, // Refresh every minute
      revalidateOnFocus: false,
      dedupingInterval: 30000, // Dedupe requests within 30 seconds
    }
  );

  return {
    data: data?.results || [],
    error,
    isLoading,
    refresh: mutate,
  };
}

// Helper function to get timestamp ranges
export function getTimeRange(range: string): { start: number; end: number } {
  const now = Math.floor(Date.now() / 1000);
  
  switch (range) {
    case '1d':
      return { start: now - 24 * 60 * 60, end: now };
    case '7d':
      return { start: now - 7 * 24 * 60 * 60, end: now };
    case '30d':
      return { start: now - 30 * 24 * 60 * 60, end: now };
    case '90d':
      return { start: now - 90 * 24 * 60 * 60, end: now };
    default:
      return { start: now - 7 * 24 * 60 * 60, end: now };
  }
} 