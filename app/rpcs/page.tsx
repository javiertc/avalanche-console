"use client"

import { useState } from "react"
import { Copy, Play, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { RPCSlider } from "@/components/ui/rpc-slider"
import { ErrorBoundary, ErrorMessage } from "@/components/ui/error-boundary"
import { useLoading } from "@/hooks/useLoading"
import { enhancedToast } from "@/components/ui/enhanced-toast"

const endpoints = [
  {
    name: "Mainnet",
    http: "https://api.avax.network/ext/bc/C/rpc",
    wss: "wss://api.avax.network/ext/bc/C/ws",
  },
  {
    name: "Testnet (Fuji)",
    http: "https://api.avax-test.network/ext/bc/C/rpc",
    wss: "wss://api.avax-test.network/ext/bc/C/ws",
  },
]

const sampleRequest = `curl -s https://api.avax.network/ext/bc/C/rpc -H "Content-Type: application/json" -d '{"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber", "params": []}'`

const sampleResponse = `{"id":1,"jsonrpc":"2.0","result":"0x1e85267"}`

const rpcMethods = [
  {
    value: "eth_blockNumber",
    label: "eth_blockNumber",
    description: "Returns the number of most recent block",
    params: [],
    example: `{"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber", "params": []}`
  },
  {
    value: "eth_getBalance",
    label: "eth_getBalance",
    description: "Returns the balance of the account of given address",
    params: ["address", "block"],
    example: `{"jsonrpc": "2.0", "id": 1, "method": "eth_getBalance", "params": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]}`
  },
  {
    value: "eth_getBlockByNumber",
    label: "eth_getBlockByNumber",
    description: "Returns information about a block by block number",
    params: ["block", "full"],
    example: `{"jsonrpc": "2.0", "id": 1, "method": "eth_getBlockByNumber", "params": ["0x1b4", true]}`
  },
  {
    value: "eth_getTransactionByHash",
    label: "eth_getTransactionByHash",
    description: "Returns the information about a transaction requested by transaction hash",
    params: ["hash"],
    example: `{"jsonrpc": "2.0", "id": 1, "method": "eth_getTransactionByHash", "params": ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]}`
  },
  {
    value: "eth_gasPrice",
    label: "eth_gasPrice",
    description: "Returns the current price per gas in wei",
    params: [],
    example: `{"jsonrpc": "2.0", "id": 1, "method": "eth_gasPrice", "params": []}`
  },
  {
    value: "eth_estimateGas",
    label: "eth_estimateGas",
    description: "Generates and returns an estimate of how much gas is necessary to allow the transaction to complete",
    params: ["transaction"],
    example: `{"jsonrpc": "2.0", "id": 1, "method": "eth_estimateGas", "params": [{"to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567", "gas": "0x76c0", "gasPrice": "0x9184e72a000", "value": "0x9184e72a", "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"}]}`
  },
  {
    value: "eth_getTransactionCount",
    label: "eth_getTransactionCount",
    description: "Returns the number of transactions sent from an address",
    params: ["address", "block"],
    example: `{"jsonrpc": "2.0", "id": 1, "method": "eth_getTransactionCount", "params": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]}`
  },
  {
    value: "eth_call",
    label: "eth_call",
    description: "Executes a new message call immediately without creating a transaction on the blockchain",
    params: ["transaction", "block"],
    example: `{"jsonrpc": "2.0", "id": 1, "method": "eth_call", "params": [{"to": "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f", "data": "0x70a08231000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1"}, "latest"]}`
  },
  {
    value: "net_version",
    label: "net_version",
    description: "Returns the current network id",
    params: [],
    example: `{"jsonrpc": "2.0", "id": 1, "method": "net_version", "params": []}`
  },
  {
    value: "web3_clientVersion",
    label: "web3_clientVersion",
    description: "Returns the current client version",
    params: [],
    example: `{"jsonrpc": "2.0", "id": 1, "method": "web3_clientVersion", "params": []}`
  }
]

export default function RPCsPage() {
  const [selectedMethod, setSelectedMethod] = useState("eth_blockNumber")
  const [selectedEndpoint, setSelectedEndpoint] = useState("mainnet")
  const [customParams, setCustomParams] = useState("")
  const [response, setResponse] = useState("")
  
  const { isLoading, error, withLoading, setError } = useLoading()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    enhancedToast.success({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard.",
    })
  }

  const executeRPCCall = async () => {
    if (!selectedMethod) {
      toast({
        title: "Error",
        description: "Please select an RPC method",
        variant: "destructive"
      })
      return
    }

    const result = await withLoading(async () => {
      const method = rpcMethods.find(m => m.value === selectedMethod)
      const endpoint = endpoints.find(e => e.name.toLowerCase().includes(selectedEndpoint))?.http || endpoints[0].http
      
      let requestBody
      if (customParams.trim()) {
        try {
          requestBody = JSON.parse(customParams)
        } catch {
          throw new Error("Invalid JSON in custom parameters")
        }
      } else {
        requestBody = JSON.parse(method?.example || '{}')
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    })

    if (result) {
      setResponse(JSON.stringify(result, null, 2))
      enhancedToast.success({
        title: "RPC Call Successful",
        description: "The RPC call was executed successfully"
      })
    }
  }

  return (
    <ErrorBoundary>
      <ResponsiveContainer>
        {/* RPC Features Slider */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Avalanche RPC Endpoints</h1>
            <p className="text-copy-16 text-muted-foreground">
              Read and write to the blockchain with high uptime. API access is free, and rate limited at 50 RPS. To request an increase in rate limits, reach out in Discord.
            </p>
          </div>
          <RPCSlider />
        </div>

        <ErrorMessage error={error} onRetry={() => setError(null)} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* RPC Endpoints Section */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-medium text-foreground">RPC Endpoints</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Available network endpoints for blockchain interaction</p>
            </div>
            
            {endpoints.map((endpoint) => (
              <div key={endpoint.name} className="rounded-lg border border-border bg-card text-card-foreground">
                <div className="p-4">
                  <h4 className="text-base font-medium mb-4 text-foreground">{endpoint.name}</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm mb-2 text-muted-foreground">HTTP Endpoint</div>
                      <div className="flex items-center justify-between bg-muted rounded p-3">
                        <code className="text-sm font-mono text-foreground">{endpoint.http}</code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-accent hover:text-accent-foreground"
                          onClick={() => copyToClipboard(endpoint.http)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm mb-2 text-muted-foreground">WSS Endpoint</div>
                      <div className="flex items-center justify-between bg-muted rounded p-3">
                        <code className="text-sm font-mono text-foreground">{endpoint.wss}</code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-accent hover:text-accent-foreground"
                          onClick={() => copyToClipboard(endpoint.wss)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RPC Testing Section */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-medium text-foreground">RPC Testing</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Test EVM RPC methods directly from the browser</p>
            </div>
            
            <div className="rounded-lg border border-border bg-card text-card-foreground">
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="endpoint">Network</Label>
                    <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select network" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mainnet">Mainnet</SelectItem>
                        <SelectItem value="testnet">Testnet (Fuji)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="method">RPC Method</Label>
                    <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select RPC method" />
                      </SelectTrigger>
                      <SelectContent>
                        {rpcMethods.map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            {method.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Method Description - Always show placeholder */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Method Description</Label>
                  <p className="text-sm text-muted-foreground">
                    {selectedMethod ? 
                      rpcMethods.find(m => m.value === selectedMethod)?.description :
                      "Select an RPC method to see its description"
                    }
                  </p>
                </div>

                {/* Generated cURL Command - Always show */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Generated cURL Command</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const method = rpcMethods.find(m => m.value === selectedMethod)
                        const endpoint = endpoints.find(e => e.name.toLowerCase().includes(selectedEndpoint))?.http || endpoints[0].http
                        const requestBody = customParams.trim() ? customParams : method?.example || '{"jsonrpc":"2.0","method":"[METHOD]","params":[],"id":1}'
                        const curlCommand = `curl -X POST ${endpoint} \\
-H "Content-Type: application/json" \\
-d '${requestBody}'`
                        copyToClipboard(curlCommand)
                      }}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy cURL
                    </Button>
                  </div>
                  <div className="bg-muted rounded p-4">
                    <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                      {(() => {
                        const method = rpcMethods.find(m => m.value === selectedMethod)
                        const endpoint = endpoints.find(e => e.name.toLowerCase().includes(selectedEndpoint))?.http || endpoints[0].http
                        const requestBody = customParams.trim() ? customParams : method?.example || '{"jsonrpc":"2.0","method":"[METHOD]","params":[],"id":1}'
                        return `curl -X POST ${endpoint} \\
-H "Content-Type: application/json" \\
-d '${requestBody}'`
                      })()}
                    </pre>
                  </div>
                </div>

                {/* Custom Parameters - Always show */}
                <div className="space-y-2">
                  <Label htmlFor="params">Custom Parameters (JSON)</Label>
                  <Textarea
                    id="params"
                    placeholder={`Default: ${rpcMethods.find(m => m.value === selectedMethod)?.example || '{"jsonrpc":"2.0","method":"[METHOD]","params":[],"id":1}'}`}
                    value={customParams}
                    onChange={(e) => setCustomParams(e.target.value)}
                    className="font-mono text-sm"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty to use default parameters, or provide custom JSON-RPC request body
                  </p>
                </div>

                {/* Action Buttons - Always show */}
                <div className="flex gap-2">
                  <Button 
                    onClick={executeRPCCall} 
                    disabled={isLoading || !selectedMethod}
                    className="gap-2"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    {isLoading ? "Executing..." : "Run"}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(response)}
                    disabled={!response}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Response
                  </Button>
                </div>

                {/* Results Section - Always show with consistent height */}
                <div className="space-y-2">
                  <Label>Result</Label>
                  <div className="bg-muted rounded p-4 h-64 overflow-auto">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        <span className="text-muted-foreground">Executing RPC call...</span>
                      </div>
                    ) : response ? (
                      <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                        {response}
                      </pre>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-muted-foreground">No result yet. Select a method and click Run to execute.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </ErrorBoundary>
  )
}
