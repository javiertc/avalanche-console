import { GET } from './route'
import { NextResponse } from 'next/server'

describe('API Endpoints Route', () => {
  it('should return mock endpoint data', async () => {
    const response = await GET()
    expect(response).toBeInstanceOf(NextResponse)
    const data = await response.json()
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
  })
}) 