import { NextRequest, NextResponse } from 'next/server';

// Mock data store (in production, this would be a database)
const mockApiKeys = [
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const keyIndex = mockApiKeys.findIndex(key => key.id === id);
    if (keyIndex === -1) {
      return NextResponse.json(
        { error: 'API key not found' },
        { status: 404 }
      );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    mockApiKeys.splice(keyIndex, 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting API key:', error);
    return NextResponse.json(
      { error: 'Failed to delete API key' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updates = await request.json();
    
    const keyIndex = mockApiKeys.findIndex(key => key.id === id);
    if (keyIndex === -1) {
      return NextResponse.json(
        { error: 'API key not found' },
        { status: 404 }
      );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    mockApiKeys[keyIndex] = { ...mockApiKeys[keyIndex], ...updates };

    return NextResponse.json(mockApiKeys[keyIndex]);
  } catch (error) {
    console.error('Error updating API key:', error);
    return NextResponse.json(
      { error: 'Failed to update API key' },
      { status: 500 }
    );
  }
}