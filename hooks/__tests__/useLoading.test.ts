import { renderHook, act } from '@testing-library/react'
import { useLoading } from '../useLoading'

describe('useLoading', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useLoading())

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('initializes with custom loading state', () => {
    const { result } = renderHook(() => useLoading(true))

    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBe(null)
  })

  it('updates loading state', () => {
    const { result } = renderHook(() => useLoading())

    act(() => {
      result.current.setLoading(true)
    })

    expect(result.current.isLoading).toBe(true)

    act(() => {
      result.current.setLoading(false)
    })

    expect(result.current.isLoading).toBe(false)
  })

  it('clears error when loading starts', () => {
    const { result } = renderHook(() => useLoading())

    // Set an error first
    act(() => {
      result.current.setError('Test error')
    })

    expect(result.current.error).toBe('Test error')

    // Start loading
    act(() => {
      result.current.setLoading(true)
    })

    expect(result.current.error).toBe(null)
    expect(result.current.isLoading).toBe(true)
  })

  it('handles successful async operation with withLoading', async () => {
    const { result } = renderHook(() => useLoading())
    const mockAsyncFn = jest.fn().mockResolvedValue('success')

    let response
    await act(async () => {
      response = await result.current.withLoading(mockAsyncFn)
    })

    expect(mockAsyncFn).toHaveBeenCalled()
    expect(response).toBe('success')
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('handles failed async operation with withLoading', async () => {
    const { result } = renderHook(() => useLoading())
    const mockError = new Error('Test error')
    const mockAsyncFn = jest.fn().mockRejectedValue(mockError)

    let response
    await act(async () => {
      response = await result.current.withLoading(mockAsyncFn)
    })

    expect(mockAsyncFn).toHaveBeenCalled()
    expect(response).toBe(null)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe('Test error')
  })

  it('handles non-Error objects in withLoading', async () => {
    const { result } = renderHook(() => useLoading())
    const mockAsyncFn = jest.fn().mockRejectedValue('String error')

    await act(async () => {
      await result.current.withLoading(mockAsyncFn)
    })

    expect(result.current.error).toBe('An unexpected error occurred')
  })

  it('sets error correctly', () => {
    const { result } = renderHook(() => useLoading())

    act(() => {
      result.current.setError('Custom error message')
    })

    expect(result.current.error).toBe('Custom error message')
    expect(result.current.isLoading).toBe(false)
  })
}) 