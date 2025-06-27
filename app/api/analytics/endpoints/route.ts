import { NextResponse } from 'next/server';
import type { EndpointUsageData } from '@/types/analytics';

// This would typically come from your database or analytics service
const mockEndpointUsageData: EndpointUsageData[] = [
  { name: "Data API", value: 12500, color: "#3B82F6" },
  { name: "RPC Calls", value: 8200, color: "#10B981" },
  { name: "Webhooks", value: 427, color: "#F59E0B" },
  { name: "Faucet", value: 156, color: "#EF4444" },
];

export async function GET() {
  // Add artificial delay to simulate real API latency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json(mockEndpointUsageData);
} 