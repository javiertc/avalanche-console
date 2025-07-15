import { NextRequest, NextResponse } from 'next/server';

interface ErrorReport {
  id: string;
  message: string;
  stack?: string;
  timestamp: string;
  level: 'error' | 'warn' | 'info';
  context: {
    userId?: string;
    sessionId?: string;
    component?: string;
    action?: string;
    metadata?: Record<string, unknown>;
    componentStack?: string;
  };
  userAgent?: string;
  url?: string;
  fingerprint?: string;
}

// In-memory storage for demo purposes
// In production, you'd use a proper database or logging service
let errorReports: ErrorReport[] = [];
const MAX_ERRORS = 1000;

export async function POST(request: NextRequest) {
  try {
    const errorReport: ErrorReport = await request.json();
    
    // Validate required fields
    if (!errorReport.message || !errorReport.timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields: message, timestamp' },
        { status: 400 }
      );
    }

    // Add to storage
    errorReports.unshift(errorReport);
    
    // Keep only the most recent errors
    if (errorReports.length > MAX_ERRORS) {
      errorReports = errorReports.slice(0, MAX_ERRORS);
    }

    // In production, you would:
    // 1. Send to external logging service (Sentry, LogRocket, etc.)
    // 2. Store in database
    // 3. Trigger alerts for critical errors
    // 4. Aggregate similar errors

    console.log(`[ERROR MONITORING] Received error report:`, {
      id: errorReport.id,
      message: errorReport.message,
      component: errorReport.context.component,
      level: errorReport.level,
    });

    return NextResponse.json({ success: true, id: errorReport.id });
  } catch (error) {
    console.error('Failed to process error report:', error);
    return NextResponse.json(
      { error: 'Failed to process error report' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const level = searchParams.get('level');
    const component = searchParams.get('component');

    let filteredErrors = errorReports;

    // Filter by level if specified
    if (level) {
      filteredErrors = filteredErrors.filter(error => error.level === level);
    }

    // Filter by component if specified
    if (component) {
      filteredErrors = filteredErrors.filter(error => 
        error.context.component === component
      );
    }

    // Limit results
    const results = filteredErrors.slice(0, limit);

    // Generate summary statistics
    const stats = {
      total: errorReports.length,
      byLevel: errorReports.reduce((acc, error) => {
        acc[error.level] = (acc[error.level] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      byComponent: errorReports.reduce((acc, error) => {
        const component = error.context.component || 'unknown';
        acc[component] = (acc[component] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      recentCount: errorReports.filter(error => 
        Date.now() - new Date(error.timestamp).getTime() < 24 * 60 * 60 * 1000
      ).length,
    };

    return NextResponse.json({
      errors: results,
      stats,
      pagination: {
        total: filteredErrors.length,
        limit,
        hasMore: filteredErrors.length > limit,
      },
    });
  } catch (error) {
    console.error('Failed to fetch error reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch error reports' },
      { status: 500 }
    );
  }
}