import { useState, useCallback } from 'react'

interface UseLoadingReturn {
  isLoading: boolean
  error: string | null
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  withLoading: <T>(fn: () => Promise<T>) => Promise<T | null>
}

export function useLoading(initialLoading = false): UseLoadingReturn {
  const [isLoading, setIsLoading] = useState(initialLoading)
  const [error, setError] = useState<string | null>(null)

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading)
    if (loading) {
      setError(null)
    }
  }, [])

  const withLoading = useCallback(async <T>(fn: () => Promise<T>): Promise<T | null> => {
    try {
      setLoading(true)
      const result = await fn()
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }, [setLoading])

  return {
    isLoading,
    error,
    setLoading,
    setError,
    withLoading
  }
} 