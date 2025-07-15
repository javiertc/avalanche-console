import { useCallback, useState } from 'react';
import { errorLogger } from '@/lib/error-logger';
import { useToast } from './use-toast';

interface ErrorState {
  error: Error | null;
  isError: boolean;
  errorId?: string;
}

interface UseErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
  component?: string;
  onError?: (error: Error, errorId: string) => void;
}

export function useErrorHandler(options: UseErrorHandlerOptions = {}) {
  const {
    showToast = true,
    logError = true,
    component,
    onError,
  } = options;

  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    isError: false,
  });

  const { toast } = useToast();

  const handleError = useCallback((error: Error | string, context?: Record<string, unknown>) => {
    const errorObj = typeof error === 'string' ? new Error(error) : error;
    
    let errorId: string | undefined;

    // Log error if enabled
    if (logError) {
      errorId = errorLogger.log(errorObj, {
        component,
        ...context,
      });
    }

    // Update error state
    setErrorState({
      error: errorObj,
      isError: true,
      errorId,
    });

    // Show toast notification if enabled
    if (showToast) {
      toast({
        title: 'Error',
        description: errorObj.message,
        variant: 'destructive',
      });
    }

    // Call custom error handler if provided
    if (onError && errorId) {
      onError(errorObj, errorId);
    }

    return errorId;
  }, [logError, showToast, component, onError, toast]);

  const clearError = useCallback(() => {
    setErrorState({
      error: null,
      isError: false,
      errorId: undefined,
    });
  }, []);

  const handleAsyncOperation = useCallback(async <T>(
    operation: () => Promise<T>,
    errorMessage?: string
  ): Promise<T | null> => {
    try {
      clearError();
      return await operation();
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      handleError(errorMessage || errorObj.message);
      return null;
    }
  }, [handleError, clearError]);

  return {
    error: errorState.error,
    isError: errorState.isError,
    errorId: errorState.errorId,
    handleError,
    clearError,
    handleAsyncOperation,
  };
}

// Specialized hooks for common use cases
export function useApiErrorHandler(component?: string) {
  return useErrorHandler({
    component,
    showToast: true,
    logError: true,
  });
}

export function useFormErrorHandler(component?: string) {
  return useErrorHandler({
    component,
    showToast: true,
    logError: false, // Form errors are usually user errors, not system errors
  });
}

export function useSilentErrorHandler(component?: string) {
  return useErrorHandler({
    component,
    showToast: false,
    logError: true,
  });
}