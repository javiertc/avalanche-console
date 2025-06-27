"use client"

import { useState } from "react"
import { Copy, ExternalLink, Wallet, BarChart3, Factory, Eye, Palette, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { DataAPISlider } from "@/components/ui/data-api-slider"

const apiKeys = [
  {
    key: "my-key (****mGmE)",
    requests: "234234234",
    created: "13 days ago",
  },
  {
    key: "my-dev (****mGmE)",
    requests: "234234234",
    created: "Today",
  },
]

const starterProjects = [
  {
    title: "Demo Wallet",
    description: "A simple multichain wallet that pulls balances and token holdings from Avalanche's Data API.",
    icon: Wallet,
  },
  {
    title: "Transaction Report Application",
    description: "Generates detailed AVAX and token-transfer reports for any address by using the Data API's transactions and transfers endpoints.",
    icon: BarChart3,
  },
  {
    title: "Token Factory",
    description: "Spin up an ERC-20 token on Avalanche C-Chain and track mint events via the Data API.",
    icon: Factory,
  },
  {
    title: "Wallet History Viewer",
    description: "Serverless (Vercel-ready) UI that streams real-time Avalanche wallet activity—native AVAX, ERC20, ERC721—via Data API.",
    icon: Eye,
  },
  {
    title: "NFT Deployment",
    description: "Deploy ERC-721 & ERC-1155 contracts to Fuji, upload metadata to Pinata IPFS, and auto-index them with the Data API NFT endpoints.",
    icon: Palette,
  },
  {
    title: "Transaction History Downloader",
    description: "CLI script that exports full historical activity (AVAX, ERC20, ERC721, ERC1155) for any Avalanche address via the Data API.",
    icon: Download,
  },
]

export default function DataAPIPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [keyName, setKeyName] = useState("")
  const [activeSDK, setActiveSDK] = useState("javascript")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard.",
    })
  }

  return (
    <ResponsiveContainer>
      {/* API Features Slider */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Avalanche Data API</h1>
          <p className="text-copy-16 text-muted-foreground">
            Powerful blockchain data access with enterprise-grade performance and security
          </p>
        </div>
        <ErrorBoundary>
          <DataAPISlider />
        </ErrorBoundary>
      </div>

      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-lg font-medium">API Keys</h2>
          <p className="text-sm text-muted-foreground">
            Manage your API keys below and see our API docs to get started
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setShowCreateModal(true)}>
            New Key
          </Button>
        </div>
      </div>

      {/* API Keys Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[40%] font-medium">Key</TableHead>
              <TableHead className="w-[30%] font-medium">Request (24h)</TableHead>
              <TableHead className="w-[20%] font-medium">Created</TableHead>
              <TableHead className="w-[10%]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiKeys.map((key, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="font-mono">{key.key}</TableCell>
                <TableCell>{key.requests}</TableCell>
                <TableCell>{key.created}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => copyToClipboard(key.key)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Sample Code */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Sample Code</h3>
          <p className="text-sm text-muted-foreground">Helpful code snippets to get started</p>
        </div>
        
        <div className="rounded-md border">
          <Tabs value={activeSDK} onValueChange={setActiveSDK} className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="javascript"
                className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground"
              >
                Javascript SDK
              </TabsTrigger>
              <TabsTrigger
                value="python"
                className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground"
              >
                Python SDK
              </TabsTrigger>
              <TabsTrigger
                value="go"
                className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground"
              >
                Go SDK
              </TabsTrigger>
              <TabsTrigger
                value="curl"
                className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground"
              >
                Curl
              </TabsTrigger>
            </TabsList>
            <TabsContent value="javascript" className="p-4">
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">First, initialize a Node.js project, then install the Avalanche SDK.</p>
                  <div className="relative">
                    <pre className="rounded-lg bg-muted p-4 font-mono text-sm">
                      npm install @avalanche-sdk/sdk
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={() => copyToClipboard("npm install @avalanche-sdk/sdk")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">Add the following code to a JavaScript file in your project. Execute it in your terminal with 'node yourFile.js' to retrieve the balance.</p>
                  <div className="relative">
                    <pre className="rounded-lg bg-muted p-4 font-mono text-sm">
{`import { AvalancheSDK } from "@ava-labs/avalanche-sdk";

const avax = new AvalancheSDK({
  serverURL: "https://api.avax.network",
  chainId: "43114",
});

async function run() {
  const balance = await avax.evm.address.balances.getNative({
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    blockTag: "latest",
    currency: "usd",
  });

  console.log(balance);
}

run();`}
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={() => copyToClipboard(`import { AvalancheSDK } from "@ava-labs/avalanche-sdk";

const avax = new AvalancheSDK({
  serverURL: "https://api.avax.network",
  chainId: "43114",
});

async function run() {
  const balance = await avax.evm.address.balances.getNative({
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    blockTag: "latest",
    currency: "usd",
  });

  console.log(balance);
}

run();`)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="python" className="p-4">
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">First, install the Avalanche SDK using pip.</p>
                  <div className="relative">
                    <pre className="rounded-lg bg-muted p-4 font-mono text-sm">
                      pip install avalanche-sdk-python
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={() => copyToClipboard("pip install avalanche-sdk-python")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">Add the following code to a Python file and run it to retrieve the balance.</p>
                  <div className="relative">
                    <pre className="rounded-lg bg-muted p-4 font-mono text-sm">
{`from avalanche_sdk import AvalancheSDK

avax = AvalancheSDK(
    server_url="https://api.avax.network",
    chain_id="43114"
)

def get_balance():
    balance = avax.evm.address.balances.get_native(
        address="0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        block_tag="latest",
        currency="usd"
    )
    print(balance)

if __name__ == "__main__":
    get_balance()`}
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={() => copyToClipboard(`from avalanche_sdk import AvalancheSDK

avax = AvalancheSDK(
    server_url="https://api.avax.network",
    chain_id="43114"
)

def get_balance():
    balance = avax.evm.address.balances.get_native(
        address="0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        block_tag="latest",
        currency="usd"
    )
    print(balance)

if __name__ == "__main__":
    get_balance()`)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="go" className="p-4">
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">First, initialize a Go module and install the Avalanche SDK.</p>
                  <div className="relative">
                    <pre className="rounded-lg bg-muted p-4 font-mono text-sm">
                      go get github.com/ava-labs/avalanchego/sdk
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={() => copyToClipboard("go get github.com/ava-labs/avalanchego/sdk")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">Create a new Go file with the following code to retrieve the balance.</p>
                  <div className="relative">
                    <pre className="rounded-lg bg-muted p-4 font-mono text-sm">
{`package main

import (
    "fmt"
    "log"
    
    "github.com/ava-labs/avalanchego/sdk"
)

func main() {
    client := sdk.NewClient(
        "https://api.avax.network",
        "43114",
    )
    
    balance, err := client.EVM.Address.Balances.GetNative(sdk.BalanceRequest{
        Address:  "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        BlockTag: "latest",
        Currency: "usd",
    })
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Printf("Balance: %+v\\n", balance)
}`}
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={() => copyToClipboard(`package main

import (
    "fmt"
    "log"
    
    "github.com/ava-labs/avalanchego/sdk"
)

func main() {
    client := sdk.NewClient(
        "https://api.avax.network",
        "43114",
    )
    
    balance, err := client.EVM.Address.Balances.GetNative(sdk.BalanceRequest{
        Address:  "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        BlockTag: "latest",
        Currency: "usd",
    })
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Printf("Balance: %+v\\n", balance)
}`)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="curl" className="p-4">
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">Use curl to directly interact with the API endpoints. Remember to replace YOUR_API_KEY with your actual API key.</p>
                  <div className="relative">
                    <pre className="rounded-lg bg-muted p-4 font-mono text-sm">
{`curl -X GET "https://api.avax.network/v1/addresses/0x71C7656EC7ab88b098defB751B7401B5f6d8976F/balances" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Accept: application/json"`}
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={() => copyToClipboard(`curl -X GET "https://api.avax.network/v1/addresses/0x71C7656EC7ab88b098defB751B7401B5f6d8976F/balances" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Accept: application/json"`)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Starter Projects */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Starter Projects</h3>
          <p className="text-sm text-muted-foreground">Helpful code examples to get started</p>
        </div>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {starterProjects.map((project, index) => (
            <Card key={index} className="p-4 hover:bg-muted/50">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <project.icon className="h-5 w-5" />
                    <h4 className="font-medium">{project.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Create API Key Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create API Key</DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Key Name</Label>
                <Input
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  placeholder="e.g., Production Key"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button>
              Create Key
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </ResponsiveContainer>
  )
}
