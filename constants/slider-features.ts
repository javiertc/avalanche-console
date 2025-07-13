import type { FeatureSlide } from '@/components/ui/feature-slider'

export const dataApiFeatures: FeatureSlide[] = [
  {
    id: "wallet-history",
    title: "💰 Wallet History",
    description: "Track complete transaction history and balance changes for any wallet address.",
    gradient: "from-blue-600 via-purple-600 to-indigo-600",
    codeExample: `// Get wallet transaction history
const history = await avalanche.wallet.getHistory({
  address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  chainId: "43114",
  limit: 100
})`
  },
  {
    id: "balance-tracking",
    title: "📊 Balance Tracking",
    description: "Monitor real-time balance changes across multiple tokens and chains.",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    codeExample: `// Check multi-token balances
const balances = await avalanche.wallet.getBalances({
  address: walletAddress,
  tokens: ["AVAX", "USDC", "USDT"],
  includeNative: true
})`
  },
  {
    id: "transaction-monitoring",
    title: "⚡ Transaction Monitoring",
    description: "Real-time transaction monitoring with instant notifications.",
    gradient: "from-orange-600 via-red-600 to-pink-600",
    codeExample: `// Monitor incoming transactions
avalanche.transactions.watch({
  address: walletAddress,
  onTransaction: (tx) => {
    console.log("New transaction:", tx)
  }
})`
  },
  {
    id: "defi-analytics",
    title: "🔒 DeFi Analytics",
    description: "Deep insights into DeFi positions, yields, and protocol interactions.",
    gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
    codeExample: `// Get DeFi positions
const positions = await avalanche.defi.getPositions({
  address: walletAddress,
  protocols: ["TraderJoe", "Aave", "Benqi"]
})`
  }
]

export const webhooksApiFeatures: FeatureSlide[] = [
  {
    id: "real-time-events",
    title: "🔔 Real-time Events",
    description: "Get instant notifications for on-chain events like transfers, swaps, and contract interactions.",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    codeExample: `// Configure webhook endpoint
const webhook = await avalanche.webhooks.create({
  url: "https://api.myapp.com/webhook",
  events: ["transfer", "swap"],
  filters: {
    address: "0x123...",
    minAmount: "100"
  }
})`
  },
  {
    id: "custom-filters",
    title: "🎯 Custom Event Filters",
    description: "Filter events by address, amount, token type, or custom contract events.",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    codeExample: `// Advanced filtering
const webhook = await avalanche.webhooks.create({
  eventType: "log",
  filters: {
    topics: ["Transfer(address,address,uint256)"],
    addresses: ["0xContract..."],
    valueThreshold: ethers.parseEther("10")
  }
})`
  },
  {
    id: "reliability",
    title: "🔄 Enterprise Reliability",
    description: "Guaranteed delivery with automatic retries, deduplication, and detailed logs.",
    gradient: "from-orange-600 via-red-600 to-pink-600",
    codeExample: `// Webhook configuration with retry
{
  "retryPolicy": {
    "maxAttempts": 5,
    "backoffMultiplier": 2
  },
  "security": {
    "signingSecret": "whsec_..."
  }
}`
  },
  {
    id: "signing-security",
    title: "🛠️ Webhook Security",
    description: "HMAC signature verification ensures webhook authenticity and data integrity.",
    gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
    codeExample: `// Verify webhook signature
const isValid = verifyWebhookSignature({
  payload: request.body,
  signature: request.headers['x-avalanche-signature'],
  secret: process.env.WEBHOOK_SECRET
})`
  }
]

export const metricsApiFeatures: FeatureSlide[] = [
  {
    id: "network-metrics",
    title: "📊 Network Metrics",
    description: "Monitor network health, transaction throughput, and validator performance in real-time.",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    codeExample: `// Get network metrics
const metrics = await avalanche.metrics.getNetwork({
  metric: "tps",
  interval: "1h",
  chainId: "43114"
})`
  },
  {
    id: "historical-data",
    title: "📈 Historical Analytics",
    description: "Access comprehensive historical data for trend analysis and backtesting.",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    codeExample: `// Query historical data
const history = await avalanche.metrics.getHistory({
  metric: "gas_price",
  from: "2024-01-01",
  to: "2024-06-01",
  resolution: "daily"
})`
  },
  {
    id: "custom-dashboards",
    title: "⚡ Custom Dashboards",
    description: "Build powerful dashboards with our flexible metrics API and real-time data streams.",
    gradient: "from-orange-600 via-red-600 to-pink-600",
    codeExample: `// Stream real-time metrics
const stream = avalanche.metrics.stream({
  metrics: ["tps", "gas", "validators"],
  onData: (data) => updateDashboard(data),
  interval: 5000
})`
  },
  {
    id: "performance-insights",
    title: "🚀 Performance Insights",
    description: "Deep insights into smart contract performance, gas optimization, and usage patterns.",
    gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
    codeExample: `// Analyze contract performance
const analysis = await avalanche.metrics.analyzeContract({
  address: contractAddress,
  metrics: ["gas_usage", "call_frequency"],
  period: "7d"
})`
  }
]

export const faucetFeatures: FeatureSlide[] = [
  {
    id: "instant-funding",
    title: "💧 Instant Test Tokens",
    description: "Get test tokens instantly for Fuji testnet. No registration required, just connect your wallet.",
    gradient: "from-blue-600 via-cyan-600 to-teal-600",
    codeExample: `// Request test tokens
const result = await fetch('/api/faucet', {
  method: 'POST',
  body: JSON.stringify({
    address: '0x123...',
    network: 'fuji'
  })
})`
  },
  {
    id: "rate-limits",
    title: "⚡ Fair Usage Limits",
    description: "Intelligent rate limiting ensures fair distribution. Get up to 2 AVAX per day per address.",
    gradient: "from-purple-600 via-pink-600 to-rose-600",
    codeExample: `// Check rate limit status
const status = await faucet.checkLimit({
  address: walletAddress
})
// Returns: {
//   remaining: 2,
//   resetAt: "2024-06-25T00:00:00Z"
// }`
  },
  {
    id: "multi-chain",
    title: "🛡️ Multi-Chain Support",
    description: "Support for C-Chain, and soon P-Chain and X-Chain test tokens.",
    gradient: "from-emerald-600 via-green-600 to-lime-600",
    codeExample: `// Request tokens for different chains
await faucet.request({
  address: walletAddress,
  chain: 'C', // 'C', 'P', or 'X'
  amount: '1' // AVAX
})`
  },
  {
    id: "developer-friendly",
    title: "🔧 Developer Friendly",
    description: "Simple REST API for automation. Integrate faucet functionality into your dApps and scripts.",
    gradient: "from-orange-600 via-amber-600 to-yellow-600",
    codeExample: `// Automate in your tests
beforeEach(async () => {
  await requestTestTokens(testWallet)
  // Your test logic here
})`
  }
]

export const rpcFeatures: FeatureSlide[] = [
  {
    id: "global-network",
    title: "⚡ Global RPC Network",
    description: "Low-latency RPC endpoints distributed globally for optimal performance.",
    gradient: "from-blue-600 via-cyan-600 to-teal-600",
    codeExample: `// Connect to Avalanche RPC
const provider = new ethers.JsonRpcProvider(
  "https://api.avax.network/ext/bc/C/rpc"
)

const block = await provider.getBlockNumber()`
  },
  {
    id: "websocket-support",
    title: "🌍 WebSocket Support",
    description: "Real-time event streaming with persistent WebSocket connections.",
    gradient: "from-purple-600 via-pink-600 to-rose-600",
    codeExample: `// Subscribe to events
const ws = new WebSocket(
  "wss://api.avax.network/ext/bc/C/ws"
)

provider.on("block", (blockNumber) => {
  console.log("New block:", blockNumber)
})`
  },
  {
    id: "high-availability",
    title: "🛡️ 99.99% Uptime",
    description: "Enterprise-grade infrastructure with automatic failover and load balancing.",
    gradient: "from-emerald-600 via-green-600 to-lime-600",
    codeExample: `// Automatic retry and failover
const provider = new ethers.FallbackProvider([
  "https://api.avax.network/ext/bc/C/rpc",
  "https://backup.avax.network/ext/bc/C/rpc"
])`
  },
  {
    id: "advanced-methods",
    title: "🔧 Advanced RPC Methods",
    description: "Access to advanced methods including trace, debug, and custom Avalanche endpoints.",
    gradient: "from-orange-600 via-amber-600 to-yellow-600",
    codeExample: `// Use advanced methods
const trace = await provider.send(
  "trace_transaction",
  [txHash]
)

const validators = await provider.send(
  "platform.getCurrentValidators", []
)`
  }
] 