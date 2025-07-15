"use client"

import React from 'react'
import { AlertTriangle, RefreshCw, Bug, Copy } from 'lucide-react'
import { Button } from './button'
import { Alert, AlertDescription, AlertTitle } from './alert'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible'
import { copyToClipboard } from '@/lib/utils'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
  errorId?: string
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void; errorId?: string }>
  onError?: (error: Error, errorInfo: React.ErrorInfo, errorId: string) => void
  level?: 'page' | 'section' | 'component'
  name?: string
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryCount = 0
  private maxRetries = 3

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    return { hasError: true, error, errorId }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo })
    
    const errorId = this.state.errorId || `error_${Date.now()}`
    
    // Enhanced error logging
    const errorDetails = {
      errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      boundary: this.props.name || 'Unknown',
      level: this.props.level || 'component',
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'Unknown',
      retryCount: this.retryCount,
    }

    console.error('ErrorBoundary caught an error:', errorDetails)
    
    // Call optional error handler
    this.props.onError?.(error, errorInfo, errorId)
    
    // Log error using our error logger
    import('@/lib/error-logger').then(({ errorLogger }) => {
      errorLogger.logReactError(error, errorInfo, {
        component: this.props.name,
        boundary: this.props.name || 'Unknown',
        level: this.props.level || 'component',
      });
    });

    // Send to analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: this.props.level === 'page',
        custom_map: { error_id: errorId }
      })
    }
  }

  resetError = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++
      this.setState({ hasError: false, error: undefined, errorInfo: undefined })
    }
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent 
          error={this.state.error} 
          resetError={this.resetError}
          errorId={this.state.errorId}
          canRetry={this.retryCount < this.maxRetries}
          retryCount={this.retryCount}
          maxRetries={this.maxRetries}
          level={this.props.level}
          errorInfo={this.state.errorInfo}
        />
      )
    }

    return this.props.children
  }
}

interface ErrorFallbackProps {
  error?: Error
  resetError: () => void
  errorId?: string
  canRetry?: boolean
  retryCount?: number
  maxRetries?: number
  level?: 'page' | 'section' | 'component'
  errorInfo?: React.ErrorInfo
}

function DefaultErrorFallback({ 
  error, 
  resetError, 
  errorId, 
  canRetry = true, 
  retryCount = 0, 
  maxRetries = 3,
  level = 'component',
  errorInfo 
}: ErrorFallbackProps) {
  const handleCopyError = () => {
    const errorDetails = {
      errorId,
      message: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
    }
    
    copyToClipboard(JSON.stringify(errorDetails, null, 2))
  }

  const isPageLevel = level === 'page'

  return (
    <div className={`flex items-center justify-center p-6 ${isPageLevel ? 'min-h-screen' : 'min-h-[200px]'}`}>
      <div className={`w-full ${isPageLevel ? 'max-w-2xl' : 'max-w-md'}`}>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>
            {isPageLevel ? 'Page Error' : 'Something went wrong'}
          </AlertTitle>
          <AlertDescription className="mt-2">
            {error?.message || 'An unexpected error occurred. Please try refreshing the page.'}
            {errorId && (
              <div className="text-xs text-muted-foreground font-mono mt-2">
                Error ID: {errorId}
              </div>
            )}
          </AlertDescription>
        </Alert>
        
        <div className="mt-4 flex gap-2 justify-center">
          {canRetry && (
            <Button onClick={resetError} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again ({maxRetries - retryCount} left)
            </Button>
          )}
          <Button onClick={handleCopyError} variant="ghost" size="sm" className="gap-2">
            <Copy className="h-4 w-4" />
            Copy Error
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && error && (
          <div className="mt-4">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-full gap-2">
                  <Bug className="h-4 w-4" />
                  Show Error Details
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className="bg-muted p-3 rounded-md text-xs font-mono overflow-auto max-h-40">
                  <div className="text-destructive font-semibold mb-2">
                    {error.message}
                  </div>
                  <pre className="whitespace-pre-wrap text-muted-foreground">
                    {error.stack}
                  </pre>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}

        {!canRetry && (
          <div className="mt-4 text-sm text-muted-foreground text-center">
            Maximum retry attempts reached. Please refresh the page.
          </div>
        )}
      </div>
    </div>
  )
}

function ErrorMessage({ 
  error, 
  onRetry, 
  className 
}: { 
  error: string | null
  onRetry?: () => void
  className?: string 
}) {
  if (!error) return null

  return (
    <Alert variant="destructive" className={className}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="mt-2 flex items-center justify-between">
        <span>{error}</span>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm" className="ml-2">
            <RefreshCw className="h-3 w-3 mr-1" />
            Retry
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}

// Specialized error boundaries for different contexts
export const PageErrorBoundary: React.FC<{ children: React.ReactNode; name?: string }> = ({ 
  children, 
  name 
}) => (
  <ErrorBoundary level="page" name={name}>
    {children}
  </ErrorBoundary>
)

export const SectionErrorBoundary: React.FC<{ children: React.ReactNode; name?: string }> = ({ 
  children, 
  name 
}) => (
  <ErrorBoundary level="section" name={name}>
    {children}
  </ErrorBoundary>
)

export const ComponentErrorBoundary: React.FC<{ children: React.ReactNode; name?: string }> = ({ 
  children, 
  name 
}) => (
  <ErrorBoundary level="component" name={name}>
    {children}
  </ErrorBoundary>
)

export { ErrorBoundary, ErrorMessage, DefaultErrorFallback } 