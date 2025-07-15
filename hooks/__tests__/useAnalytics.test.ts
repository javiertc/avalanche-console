import { renderHook, act } from '@testing-library/react';
import { useAnalytics } from '../useAnalytics';

// Mock the analytics service
jest.mock('@/lib/api', () => ({
  analyticsService: {
    getUsageMetrics: jest.fn(),
    getUsageOverTime: jest.fn(),
    getEndpointUsage: jest.fn()
  }
}));

// Import the mocked service
import { analyticsService } from '@/lib/api';

describe('useAnalytics', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    (analyticsService.getUsageMetrics as jest.Mock).mockResolvedValue({ success: true, data: null });
    (analyticsService.getUsageOverTime as jest.Mock).mockResolvedValue({ success: true, data: [] });
    (analyticsService.getEndpointUsage as jest.Mock).mockResolvedValue({ success: true, data: [] });
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useAnalytics());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.metrics).toBeNull();
    expect(result.current.usageData).toEqual([]);
    expect(result.current.endpointUsage).toEqual([]);
  });

  it('should fetch analytics data successfully', async () => {
    // Mock the analytics service responses
    const mockMetrics = { totalRequests: 1000, avgResponseTime: 150, errorRate: 0.5, successRate: 99.5, requestsPerSecond: 4.2 };
    const mockUsageData = [{ date: '2024-01-01', value: 100 }];
    const mockEndpointUsage = [{ endpoint: '/api/v1', requests: 500, avgResponseTime: 120, errorRate: 0.1 }];

    // Set up mock responses
    (analyticsService.getUsageMetrics as jest.Mock).mockResolvedValue({ success: true, data: mockMetrics });
    (analyticsService.getUsageOverTime as jest.Mock).mockResolvedValue({ success: true, data: mockUsageData });
    (analyticsService.getEndpointUsage as jest.Mock).mockResolvedValue({ success: true, data: mockEndpointUsage });

    const { result } = renderHook(() => useAnalytics());

    // Wait for the effect to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.metrics).toEqual(mockMetrics);
    expect(result.current.usageData).toEqual(mockUsageData);
    expect(result.current.endpointUsage).toEqual(mockEndpointUsage);
  });

  it('should handle fetch error', async () => {
    // Mock failed API responses
    (analyticsService.getUsageMetrics as jest.Mock).mockRejectedValue(new Error('Network error'));
    
    const { result } = renderHook(() => useAnalytics());

    // Wait for the effect to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Network error');
    expect(result.current.metrics).toBeNull();
  });

  it('should handle non-ok response', async () => {
    // Mock failed API responses
    (analyticsService.getUsageMetrics as jest.Mock).mockResolvedValue({ 
      success: false, 
      error: { message: 'Server error' } 
    });

    const { result } = renderHook(() => useAnalytics());

    // Wait for the effect to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Server error');
    expect(result.current.metrics).toBeNull();
  });

  // Additional tests can be added here as needed
}); 