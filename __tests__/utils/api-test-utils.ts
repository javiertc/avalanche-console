import { NextRequest, NextResponse } from 'next/server'

// Mock NextResponse for testing
export const createMockNextResponse = <T = any>(data: T, status: number = 200) => {
  const response = {
    status,
    json: jest.fn().mockResolvedValue(data),
    text: jest.fn().mockResolvedValue(JSON.stringify(data)),
    headers: new Headers(),
    ok: status >= 200 && status < 300,
  }
  return response as unknown as Response
}

// Create mock NextRequest
export const createMockNextRequest = (
  url: string,
  options: {
    method?: string
    headers?: Record<string, string>
    body?: any
  } = {}
) => {
  const { method = 'GET', headers = {}, body } = options
  
  // Create a regular Request first, then cast to NextRequest
  const request = new Request(url, {
    method,
    headers: new Headers(headers),
    body: body ? JSON.stringify(body) : undefined,
  })
  
  // NextRequest extends Request, so we can safely cast
  return request as NextRequest
}

// Mock NextResponse.json
export const mockNextResponseJson = <T = any>(data: T, init?: ResponseInit) => {
  return {
    status: init?.status || 200,
    statusText: init?.statusText || 'OK',
    headers: new Headers(init?.headers),
    json: async () => data,
    text: async () => JSON.stringify(data),
    ok: (init?.status || 200) >= 200 && (init?.status || 200) < 300,
  } as Response
}

// API Route Test Helper
export interface ApiRouteTestCase<TRequest = any, TResponse = any> {
  name: string
  request: {
    url: string
    method?: string
    headers?: Record<string, string>
    body?: TRequest
  }
  expectedResponse: {
    status: number
    data?: TResponse
    error?: string
  }
}

export const testApiRoute = async <TRequest = any, TResponse = any>(
  handler: (req: NextRequest) => Promise<Response>,
  testCase: ApiRouteTestCase<TRequest, TResponse>
) => {
  const { request, expectedResponse } = testCase
  
  const mockRequest = createMockNextRequest(request.url, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  })
  
  const response = await handler(mockRequest)
  
  expect(response.status).toBe(expectedResponse.status)
  
  if (expectedResponse.data) {
    const responseData = await response.json()
    expect(responseData).toEqual(expectedResponse.data)
  }
  
  return response
}

// Common API response patterns
export const createSuccessResponse = <T>(data: T) => ({
  success: true,
  data,
})

export const createErrorResponse = (message: string, code?: string) => ({
  success: false,
  error: {
    message,
    code,
  },
})

// Authentication helpers
export const createAuthHeaders = (token: string) => ({
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
})

export const createApiKeyHeaders = (apiKey: string) => ({
  'X-API-Key': apiKey,
  'Content-Type': 'application/json',
})