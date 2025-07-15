interface ErrorContext {
  userId?: string;
  sessionId?: string;
  component?: string;
  action?: string;
  metadata?: Record<string, unknown>;
  componentStack?: string;
  endpoint?: string;
  status?: number;
  type?: string;
  boundary?: string;
  level?: string;
}

interface ErrorLog {
  id: string;
  message: string;
  stack?: string;
  timestamp: string;
  userAgent: string;
  url: string;
  level: 'error' | 'warn' | 'info';
  context: ErrorContext;
  fingerprint?: string;
  componentStack?: string;
  errorInfo?: unknown;
}

class ErrorLogger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private logs: ErrorLog[] = [];
  private maxLogs = 100; // Keep last 100 errors in memory
  private errorCounts = new Map<string, number>(); // Track error frequency

  log(
    error: Error | string, 
    context: ErrorContext = {}, 
    level: 'error' | 'warn' | 'info' = 'error'
  ): string {
    const errorId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const message = typeof error === 'string' ? error : error.message;
    const stack = typeof error === 'object' ? error.stack : undefined;
    
    // Create fingerprint for error deduplication
    const fingerprint = this.createFingerprint(message, stack, context.component);
    
    const errorLog: ErrorLog = {
      id: errorId,
      message,
      stack,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
      url: typeof window !== 'undefined' ? window.location.href : 'server',
      level,
      context,
      fingerprint,
      componentStack: context.componentStack,
      errorInfo: context
    };

    // Track error frequency
    const currentCount = this.errorCounts.get(fingerprint) || 0;
    this.errorCounts.set(fingerprint, currentCount + 1);

    // In development, log to console
    if (this.isDevelopment) {
      const consoleMethod = level === 'error' ? console.error : 
                           level === 'warn' ? console.warn : console.info;
      consoleMethod(`🚨 [${level.toUpperCase()}] Error logged:`, {
        ...errorLog,
        count: this.errorCounts.get(fingerprint)
      });
    }

    // Store in memory (with size limit)
    this.logs.push(errorLog);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // In production, send to logging service
    if (!this.isDevelopment) {
      this.sendToLoggingService(errorLog);
    }

    return errorId;
  }

  /**
   * Log an error with React error info
   */
  logReactError(
    error: Error,
    errorInfo: React.ErrorInfo,
    additionalContext: ErrorContext = {}
  ): string {
    return this.log(error, {
      ...additionalContext,
      componentStack: errorInfo.componentStack || undefined,
    });
  }

  /**
   * Log API errors with additional context
   */
  logApiError(
    endpoint: string,
    status: number,
    message: string,
    context: ErrorContext = {}
  ): string {
    return this.log(
      `API Error: ${endpoint} returned ${status} - ${message}`,
      { ...context, endpoint, status, type: 'api_error' },
      'error'
    );
  }

  /**
   * Create fingerprint for error deduplication
   */
  private createFingerprint(message: string, stack?: string, component?: string): string {
    const key = `${message}-${component || 'unknown'}`;
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      const char = key.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  private async sendToLoggingService(errorLog: ErrorLog) {
    // Here you would send to your logging service
    // For now, we'll just store in localStorage as a simple solution
    if (typeof window !== 'undefined') {
      try {
        const existingLogs = localStorage.getItem('error_logs');
        const logs = existingLogs ? JSON.parse(existingLogs) : [];
        logs.push(errorLog);
        
        // Keep only last 50 errors in localStorage
        if (logs.length > 50) {
          logs.splice(0, logs.length - 50);
        }
        
        localStorage.setItem('error_logs', JSON.stringify(logs));
      } catch {
        // Silently fail if localStorage is full or unavailable
      }
    }

    // You could also send to a backend endpoint
    // try {
    //   await fetch('/api/logs/error', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(errorLog)
    //   });
    // } catch (e) {
    //   // Silently fail to avoid infinite error loops
    // }
  }

  getRecentErrors(): ErrorLog[] {
    return this.logs.slice(-10); // Get last 10 errors
  }

  clearErrors() {
    this.logs = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem('error_logs');
    }
  }

  // Performance monitoring
  logPerformance(metric: string, value: number, metadata?: unknown) {
    if (this.isDevelopment) {
      console.log(`📊 Performance metric: ${metric}`, { value, metadata });
    }
    
    // In production, you could send to analytics
    // this.sendPerformanceMetric({ metric, value, metadata });
  }
}

// Export singleton instance
export const errorLogger = new ErrorLogger(); 