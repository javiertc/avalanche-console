interface ErrorLog {
  message: string;
  stack?: string;
  timestamp: string;
  userAgent: string;
  url: string;
  componentStack?: string;
  errorInfo?: unknown;
}

class ErrorLogger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private logs: ErrorLog[] = [];
  private maxLogs = 100; // Keep last 100 errors in memory

  log(error: Error, errorInfo?: unknown) {
    const errorLog: ErrorLog = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
      url: typeof window !== 'undefined' ? window.location.href : 'server',
      componentStack: errorInfo?.componentStack,
      errorInfo
    };

    // In development, log to console
    if (this.isDevelopment) {
      console.error('🚨 Error logged:', errorLog);
      return;
    }

    // Store in memory (with size limit)
    this.logs.push(errorLog);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // In production, you could send to your logging service
    this.sendToLoggingService(errorLog);
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