/**
 * React Best Practices Demo Component
 * 
 * This component demonstrates the implementation of React.js best practices:
 * 1. Performance Optimizations (memo, useMemo, useCallback)
 * 2. Custom Hooks for Reusable Logic
 * 3. Error Boundaries and Error Handling
 * 4. Proper TypeScript Integration
 * 5. Accessibility Features
 * 6. Loading States and User Feedback
 * 7. Component Composition
 * 8. Separation of Concerns
 */

import React, { memo, useMemo, useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, CheckCircle, Loader2 } from 'lucide-react'
import { usePerformance } from '@/hooks/usePerformance'
import { useAsyncForm } from '@/components/forms/AsyncForm'
import { withErrorBoundary } from '@/components/common/withErrorBoundary'

// ✅ Best Practice: Proper TypeScript interfaces
interface BestPractice {
  id: string
  title: string
  description: string
  implemented: boolean
  category: 'performance' | 'accessibility' | 'architecture' | 'ux'
}

interface BestPracticesDemoProps {
  showPerformanceMetrics?: boolean
}

// ✅ Best Practice: Constants outside component to prevent recreation
const BEST_PRACTICES: BestPractice[] = [
  {
    id: '1',
    title: 'React.memo for Performance',
    description: 'Prevent unnecessary re-renders with React.memo',
    implemented: true,
    category: 'performance'
  },
  {
    id: '2',
    title: 'Custom Hooks',
    description: 'Reusable logic extracted into custom hooks',
    implemented: true,
    category: 'architecture'
  },
  {
    id: '3',
    title: 'Error Boundaries',
    description: 'Graceful error handling with error boundaries',
    implemented: true,
    category: 'ux'
  },
  {
    id: '4',
    title: 'Accessibility Features',
    description: 'ARIA labels, semantic HTML, keyboard navigation',
    implemented: true,
    category: 'accessibility'
  },
  {
    id: '5',
    title: 'Loading States',
    description: 'Proper loading and error states for better UX',
    implemented: true,
    category: 'ux'
  },
  {
    id: '6',
    title: 'Performance Monitoring',
    description: 'Track component render performance',
    implemented: true,
    category: 'performance'
  }
]

const CATEGORY_COLORS = {
  performance: 'bg-blue-100 text-blue-800',
  accessibility: 'bg-green-100 text-green-800',
  architecture: 'bg-purple-100 text-purple-800',
  ux: 'bg-orange-100 text-orange-800'
} as const

// ✅ Best Practice: Memoized sub-components
const BestPracticeItem = memo(function BestPracticeItem({ 
  practice 
}: { 
  practice: BestPractice 
}) {
  return (
    <div className="flex items-start space-x-3 p-4 rounded-lg border bg-card">
      <div className="flex-shrink-0 mt-1">
        {practice.implemented ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <h3 className="text-sm font-medium text-foreground">
            {practice.title}
          </h3>
          <Badge 
            variant="secondary" 
            className={CATEGORY_COLORS[practice.category]}
          >
            {practice.category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {practice.description}
        </p>
      </div>
    </div>
  )
})

// ✅ Best Practice: Main component with memo and performance monitoring
const ReactBestPracticesDemo = memo(function ReactBestPracticesDemo({ 
  showPerformanceMetrics = false 
}: BestPracticesDemoProps) {
  const [filter, setFilter] = useState<string>('all')
  const { isLoading, setLoading } = useAsyncForm()
  
  // ✅ Best Practice: Performance monitoring
  const { getMetrics, logMetrics } = usePerformance('ReactBestPracticesDemo')

  // ✅ Best Practice: Memoized filtered data
  const filteredPractices = useMemo(() => {
    if (filter === 'all') return BEST_PRACTICES
    return BEST_PRACTICES.filter(practice => practice.category === filter)
  }, [filter])

  // ✅ Best Practice: Memoized statistics
  const stats = useMemo(() => {
    const total = BEST_PRACTICES.length
    const implemented = BEST_PRACTICES.filter(p => p.implemented).length
    const percentage = Math.round((implemented / total) * 100)
    
    return { total, implemented, percentage }
  }, [])

  // ✅ Best Practice: Memoized event handlers
  const handleFilterChange = useCallback((newFilter: string) => {
    setFilter(newFilter)
  }, [])

  const handlePerformanceTest = useCallback(async () => {
    setLoading(true)
    
    // Simulate some work
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setLoading(false)
    logMetrics()
  }, [setLoading, logMetrics])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          React Best Practices Implementation
        </h1>
        <p className="text-muted-foreground">
          Demonstrating modern React development patterns and optimizations
        </p>
      </div>

      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {stats.implemented}/{stats.total}
              </div>
              <div className="text-sm text-muted-foreground">
                Practices Implemented
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.percentage}%
              </div>
              <div className="text-sm text-muted-foreground">
                Completion Rate
              </div>
            </div>
            <div className="text-center">
              <Button
                onClick={handlePerformanceTest}
                disabled={isLoading}
                variant="outline"
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing...
                  </>
                ) : (
                  'Test Performance'
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'performance', 'accessibility', 'architecture', 'ux'].map((category) => (
          <Button
            key={category}
            variant={filter === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Best Practices List */}
      <div className="space-y-3">
        {filteredPractices.map((practice) => (
          <BestPracticeItem key={practice.id} practice={practice} />
        ))}
      </div>

      {/* Performance Metrics (Development Only) */}
      {showPerformanceMetrics && process.env.NODE_ENV !== 'production' && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={logMetrics} variant="outline" size="sm">
              Log Metrics to Console
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
})

// ✅ Best Practice: Export with error boundary
export default withErrorBoundary(ReactBestPracticesDemo, {
  onError: (error, errorInfo) => {
    console.error('ReactBestPracticesDemo error:', error, errorInfo)
  }
}) 