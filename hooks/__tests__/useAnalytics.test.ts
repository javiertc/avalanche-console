import { renderHook, act } from '@testing-library/react';
import { useAnalytics } from '../useAnalytics';

// Mock fetch
global.fetch = jest.fn();

describe('useAnalytics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockReset();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useAnalytics());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it('should fetch analytics data successfully', async () => {
    const mockData = {
      usage: { requests: 1000, bandwidth: '1GB' },
      endpoints: { '/api/v1': 500, '/api/v2': 500 }
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    const { result } = renderHook(() => useAnalytics());

    // Wait for the effect to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith('/api/analytics/usage');
  });

  it('should handle fetch error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useAnalytics());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to load analytics data');
    expect(result.current.data).toBeNull();
  });

  it('should handle non-ok response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    });

    const { result } = renderHook(() => useAnalytics());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to load analytics data');
    expect(result.current.data).toBeNull();
  });

  it('should not fetch when unmounted', () => {
    const { unmount } = renderHook(() => useAnalytics());
    
    unmount();

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should handle component unmount during fetch', async () => {
    let resolveFetch: (value: any) => void;
    const fetchPromise = new Promise(resolve => {
      resolveFetch = resolve;
    });

    (global.fetch as jest.Mock).mockReturnValueOnce(fetchPromise);

    const { result, unmount } = renderHook(() => useAnalytics());

    expect(result.current.loading).toBe(true);

    // Unmount before fetch completes
    unmount();

    // Complete the fetch after unmount
    act(() => {
      resolveFetch!({
        ok: true,
        json: async () => ({ data: 'test' })
      });
    });

    // State should not update after unmount
    expect(result.current.loading).toBe(true);
  });
}); 