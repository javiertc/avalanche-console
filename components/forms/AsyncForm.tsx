import React, { useState, useCallback, memo } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, AlertTriangle } from 'lucide-react'

interface AsyncFormProps {
  children: React.ReactNode
  onSubmit: (formData: FormData) => Promise<void>
  submitButtonText?: string
  loadingText?: string
  className?: string
  disabled?: boolean
  resetOnSuccess?: boolean
}

interface AsyncFormState {
  isLoading: boolean
  error: string | null
  isSuccess: boolean
}

/**
 * AsyncForm - A reusable form component with built-in loading, error, and success states
 * Handles form submission with proper error boundaries and user feedback
 */
export const AsyncForm = memo(function AsyncForm({
  children,
  onSubmit,
  submitButtonText = 'Submit',
  loadingText = 'Submitting...',
  className = '',
  disabled = false,
  resetOnSuccess = false
}: AsyncFormProps) {
  const [state, setState] = useState<AsyncFormState>({
    isLoading: false,
    error: null,
    isSuccess: false
  })

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    // Reset previous states
    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      isSuccess: false
    }))

    try {
      const formData = new FormData(event.currentTarget)
      await onSubmit(formData)
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        isSuccess: true
      }))

      // Reset form if requested
      if (resetOnSuccess) {
        ;(event.target as HTMLFormElement).reset()
      }

      // Clear success message after 3 seconds
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          isSuccess: false
        }))
      }, 3000)

    } catch (error: unknown) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: (error as Error).message || 'An unexpected error occurred'
      }))
    }
  }, [onSubmit, resetOnSuccess])

  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null
    }))
  }, [])

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
      
      {/* Error Display */}
      {state.error && (
        <Alert variant="destructive" className="mt-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{state.error}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearError}
              className="ml-2 h-6 px-2 text-xs"
            >
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Success Display */}
      {state.isSuccess && (
        <Alert className="mt-4 border-green-200 bg-green-50 text-green-800">
          <AlertDescription>
            Form submitted successfully!
          </AlertDescription>
        </Alert>
      )}

      {/* Submit Button */}
      <div className="mt-6">
        <Button
          type="submit"
          disabled={disabled || state.isLoading}
          className="w-full"
        >
          {state.isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {loadingText}
            </>
          ) : (
            submitButtonText
          )}
        </Button>
      </div>
    </form>
  )
})

// Hook for form state management (can be used independently)
export function useAsyncForm() {
  const [state, setState] = useState<AsyncFormState>({
    isLoading: false,
    error: null,
    isSuccess: false
  })

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }))
  }, [])

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error, isLoading: false }))
  }, [])

  const setSuccess = useCallback((success: boolean) => {
    setState(prev => ({ ...prev, isSuccess: success, isLoading: false }))
  }, [])

  const reset = useCallback(() => {
    setState({ isLoading: false, error: null, isSuccess: false })
  }, [])

  return {
    ...state,
    setLoading,
    setError,
    setSuccess,
    reset
  }
} 