import { useEffect, useRef, useCallback } from 'react'

interface PerformanceMetrics {
  renderCount: number
  lastRenderTime: number
  averageRenderTime: number
  totalRenderTime: number
}

/**
 * Hook for monitoring component performance
 * Tracks render counts and timing for development optimization
 */
export function usePerformance(componentName?: string) {
  const renderCount = useRef(0)
  const renderTimes = useRef<number[]>([])
  const startTime = useRef<number>(0)
  const isProduction = process.env.NODE_ENV === 'production'

  // Start timing before render
  useEffect(() => {
    startTime.current = performance.now()
  })

  // End timing after render
  useEffect(() => {
    if (isProduction) return

    const endTime = performance.now()
    const renderTime = endTime - startTime.current
    
    renderCount.current += 1
    renderTimes.current.push(renderTime)

    // Keep only last 100 render times to prevent memory leaks
    if (renderTimes.current.length > 100) {
      renderTimes.current = renderTimes.current.slice(-100)
    }

    if (componentName && renderTime > 16) { // Warn if render takes longer than 16ms
      console.warn(`[Performance] ${componentName} render took ${renderTime.toFixed(2)}ms`)
    }
  })

  const getMetrics = useCallback((): PerformanceMetrics => {
    const times = renderTimes.current
    const totalTime = times.reduce((sum, time) => sum + time, 0)
    const averageTime = times.length > 0 ? totalTime / times.length : 0
    const lastTime = times[times.length - 1] || 0

    return {
      renderCount: renderCount.current,
      lastRenderTime: lastTime,
      averageRenderTime: averageTime,
      totalRenderTime: totalTime
    }
  }, [])

  const logMetrics = useCallback(() => {
    if (isProduction) return

    const metrics = getMetrics()
    console.table({
      Component: componentName || 'Unknown',
      'Render Count': metrics.renderCount,
      'Last Render (ms)': metrics.lastRenderTime.toFixed(2),
      'Average Render (ms)': metrics.averageRenderTime.toFixed(2),
      'Total Render Time (ms)': metrics.totalRenderTime.toFixed(2)
    })
  }, [componentName, getMetrics, isProduction])

  return {
    getMetrics,
    logMetrics,
    renderCount: renderCount.current
  }
}

/**
 * Hook for measuring async operation performance
 */
export function useAsyncPerformance() {
  const measureAsync = useCallback(async <T>(
    operation: () => Promise<T>,
    operationName?: string
  ): Promise<T> => {
    const startTime = performance.now()
    
    try {
      const result = await operation()
      const endTime = performance.now()
      const duration = endTime - startTime

      if (process.env.NODE_ENV !== 'production') {
        console.log(`[Async Performance] ${operationName || 'Operation'} took ${duration.toFixed(2)}ms`)
      }

      return result
    } catch (error) {
      const endTime = performance.now()
      const duration = endTime - startTime

      if (process.env.NODE_ENV !== 'production') {
        console.error(`[Async Performance] ${operationName || 'Operation'} failed after ${duration.toFixed(2)}ms`, error)
      }

      throw error
    }
  }, [])

  return { measureAsync }
} 