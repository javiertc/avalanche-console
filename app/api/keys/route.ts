import { NextRequest, NextResponse } from 'next/server';
import type { ApiKey, CreateApiKeyRequest, CreateApiKeyResponse } from '@/lib/api/api-keys';

// Mock data store (in production, this would be a database)
const mockApiKeys: ApiKey[] = [
  {
    id: '1',
    key: 'my-key (****mGmE)',
    name: 'Production Key',
    requests: '234234234',
    created: '13 days ago',
    lastUsed: '2 hours ago',
    status: 'active',
  },
  {
    id: '2',
    key: 'my-dev (****mGmE)',
    name: 'Development Key',
    requests: '234234234',
    created: 'Today',
    lastUsed: '5 minutes ago',
    status: 'active',
  },
];

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json(mockApiKeys);
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return NextResponse.json(
      { error: 'Failed to fetch API keys' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateApiKeyRequest = await request.json();
    
    if (!body.name || body.name.trim().length === 0) {
      return NextResponse.json(
        { error: 'API key name is required' },
        { status: 400 }
      );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate mock API key
    const newKey: ApiKey = {
      id: (mockApiKeys.length + 1).toString(),
      key: `${body.name.toLowerCase().replace(/\s+/g, '-')} (****${Math.random().toString(36).substr(2, 4)})`,
      name: body.name,
      requests: '0',
      created: 'Just now',
      lastUsed: undefined,
      status: 'active',
    };

    mockApiKeys.push(newKey);

    const response: CreateApiKeyResponse = {
      id: newKey.id,
      key: newKey.key,
      name: newKey.name,
      created: newKey.created,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating API key:', error);
    return NextResponse.json(
      { error: 'Failed to create API key' },
      { status: 500 }
    );
  }
}