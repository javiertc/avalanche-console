import { NextRequest, NextResponse } from 'next/server';
import type { UsageMetrics } from '@/lib/api/analytics';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '24h';
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Generate mock metrics based on time range
    const baseMetrics = {
      totalRequests: 12345,
      avgResponseTime: 156,
      errorRate: 0.55,
      successRate: 99.45,
      requestsPerSecond: 4.2,
    };

    // Adjust metrics based on time range
    const multipliers = {
      '24h': 1,
      '7d': 7,
      '30d': 30,
      '90d': 90,
    };

    const multiplier = multipliers[timeRange as keyof typeof multipliers] || 1;
    
    const metrics: UsageMetrics = {
      totalRequests: Math.floor(baseMetrics.totalRequests * multiplier),
      avgResponseTime: baseMetrics.avgResponseTime + Math.random() * 50,
      errorRate: baseMetrics.errorRate + Math.random() * 0.5,
      successRate: 100 - (baseMetrics.errorRate + Math.random() * 0.5),
      requestsPerSecond: baseMetrics.requestsPerSecond * (multiplier > 1 ? 0.8 : 1),
    };

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Error fetching usage metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch usage metrics' },
      { status: 500 }
    );
  }
}