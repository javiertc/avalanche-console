import { NextResponse } from 'next/server';
import type { ApiUsageData } from '@/types/analytics';
import { withApiErrorHandler, ApiError } from '@/lib/api-error';

// This would typically come from your database or analytics service
const mockApiUsageData: ApiUsageData[] = [
  { date: "Dec 18", dataApi: 1200, rpc: 800, webhooks: 45, total: 2045 },
  { date: "Dec 19", dataApi: 1800, rpc: 1200, webhooks: 62, total: 3062 },
  { date: "Dec 20", dataApi: 1600, rpc: 950, webhooks: 38, total: 2588 },
  { date: "Dec 21", dataApi: 2200, rpc: 1400, webhooks: 71, total: 3671 },
  { date: "Dec 22", dataApi: 1900, rpc: 1100, webhooks: 55, total: 3055 },
  { date: "Dec 23", dataApi: 2400, rpc: 1600, webhooks: 89, total: 4089 },
  { date: "Dec 24", dataApi: 2100, rpc: 1300, webhooks: 67, total: 3467 },
];

export const GET = withApiErrorHandler(async (request: Request) => {
  // Example: Check for authentication (in real app, use proper auth)
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    throw ApiError.unauthorized('API key required');
  }
  
  // Add artificial delay to simulate real API latency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Example: Simulate potential database error
  if (Math.random() < 0.1) { // 10% chance of error for demo
    throw ApiError.internal('Database connection failed');
  }
  
  return NextResponse.json(mockApiUsageData);
}); 