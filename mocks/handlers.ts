import { http, HttpResponse } from 'msw'
import type { ApiUsageData, EndpointUsageData } from '@/types/analytics'

// Mock data
const mockApiUsageData: ApiUsageData[] = [
  { date: "Dec 18", dataApi: 1200, rpc: 800, webhooks: 45, total: 2045 },
  { date: "Dec 19", dataApi: 1800, rpc: 1200, webhooks: 62, total: 3062 },
  { date: "Dec 20", dataApi: 1600, rpc: 950, webhooks: 38, total: 2588 },
  { date: "Dec 21", dataApi: 2200, rpc: 1400, webhooks: 71, total: 3671 },
  { date: "Dec 22", dataApi: 1900, rpc: 1100, webhooks: 55, total: 3055 },
  { date: "Dec 23", dataApi: 2400, rpc: 1600, webhooks: 89, total: 4089 },
  { date: "Dec 24", dataApi: 2100, rpc: 1300, webhooks: 67, total: 3467 },
]

const mockEndpointUsageData: EndpointUsageData[] = [
  { name: "Data API", value: 12500, color: "#3B82F6" },
  { name: "RPC Calls", value: 8200, color: "#10B981" },
  { name: "Webhooks", value: 427, color: "#F59E0B" },
  { name: "Faucet", value: 156, color: "#EF4444" },
]

export const handlers = [
  // Analytics endpoints
  http.get('/api/analytics/usage', () => {
    return HttpResponse.json(mockApiUsageData)
  }),

  http.get('/api/analytics/endpoints', () => {
    return HttpResponse.json(mockEndpointUsageData)
  }),

  // Mock Avalanche API endpoints
  http.get('https://api.avax.network/v1/addresses/:address/balances', ({ params }) => {
    return HttpResponse.json({
      address: params.address,
      balance: {
        avax: "1234.56",
        usd: "45678.90"
      }
    })
  }),

  // Mock Metrics API
  http.get('https://metrics.avax.network/v2/chains/:chainId/metrics/:metric', ({ params, request }) => {
    const url = new URL(request.url)
    const startTimestamp = url.searchParams.get('startTimestamp')
    const endTimestamp = url.searchParams.get('endTimestamp')
    
    // Generate mock time series data
    const results = []
    const start = parseInt(startTimestamp || '0')
    const end = parseInt(endTimestamp || '0')
    const interval = 86400 // 1 day in seconds
    
    for (let timestamp = start; timestamp <= end; timestamp += interval) {
      results.push({
        timestamp,
        value: Math.floor(Math.random() * 10000) + 5000
      })
    }
    
    return HttpResponse.json({ results })
  }),

  // Mock RPC endpoint
  http.post('https://api.avax.network/ext/bc/C/rpc', async ({ request }) => {
    const body = await request.json()
    const { method } = body as { method: string }
    
    switch (method) {
      case 'eth_blockNumber':
        return HttpResponse.json({
          jsonrpc: '2.0',
          id: 1,
          result: '0x' + Math.floor(Math.random() * 1000000).toString(16)
        })
      case 'eth_gasPrice':
        return HttpResponse.json({
          jsonrpc: '2.0',
          id: 1,
          result: '0x' + Math.floor(Math.random() * 100000000).toString(16)
        })
      default:
        return HttpResponse.json({
          jsonrpc: '2.0',
          id: 1,
          result: null
        })
    }
  }),
] 