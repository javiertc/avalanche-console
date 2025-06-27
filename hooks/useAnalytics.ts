import useSWR from 'swr';
import type { ApiUsageData, EndpointUsageData } from '@/types/analytics';
import { API_ENDPOINTS } from '@/lib/constants';

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
  }
  return res.json();
});

export function useApiUsage() {
  const { data, error, isLoading } = useSWR<ApiUsageData[]>(API_ENDPOINTS.ANALYTICS_USAGE, fetcher, {
    refreshInterval: 60000, // Refresh every minute
    revalidateOnFocus: false,
  });

  return {
    data,
    isLoading,
    error,
  };
}

export function useEndpointUsage() {
  const { data, error, isLoading } = useSWR<EndpointUsageData[]>(API_ENDPOINTS.ANALYTICS_ENDPOINTS, fetcher, {
    refreshInterval: 60000, // Refresh every minute
    revalidateOnFocus: false,
  });

  return {
    data,
    isLoading,
    error,
  };
} 