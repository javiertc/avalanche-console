import { NextResponse } from 'next/server';

interface SystemServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  uptime: number;
  responseTime?: number;
  lastChecked: string;
  incidents?: {
    id: string;
    title: string;
    status: string;
    createdAt: string;
  }[];
}

interface SystemHealth {
  overall: 'healthy' | 'degraded' | 'unhealthy';
  services: SystemServiceStatus[];
  lastUpdated: string;
}

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    const systemHealth: SystemHealth = {
      overall: 'healthy',
      lastUpdated: new Date().toISOString(),
      services: [
        {
          name: 'Data API',
          status: 'operational',
          uptime: 99.9,
          responseTime: 120,
          lastChecked: new Date(Date.now() - 30000).toISOString(),
        },
        {
          name: 'RPC Endpoints',
          status: 'operational',
          uptime: 99.8,
          responseTime: 95,
          lastChecked: new Date(Date.now() - 45000).toISOString(),
        },
        {
          name: 'Webhooks',
          status: 'operational',
          uptime: 99.7,
          responseTime: 200,
          lastChecked: new Date(Date.now() - 60000).toISOString(),
        },
        {
          name: 'Faucet',
          status: 'degraded',
          uptime: 95.2,
          responseTime: 500,
          lastChecked: new Date(Date.now() - 120000).toISOString(),
          incidents: [
            {
              id: 'inc-001',
              title: 'Increased response times',
              status: 'monitoring',
              createdAt: new Date(Date.now() - 3600000).toISOString(),
            }
          ]
        },
      ],
    };

    return NextResponse.json(systemHealth);
  } catch (error) {
    console.error('Error fetching system health:', error);
    return NextResponse.json(
      { error: 'Failed to fetch system health' },
      { status: 500 }
    );
  }
}