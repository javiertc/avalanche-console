"use client"

import { useState } from "react"
import { Copy, ExternalLink, Wallet, BarChart3, Factory, Eye, Palette, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { DataAPISlider } from "@/components/ui/data-api-slider"
import { copyToClipboard } from '@/lib/utils'
import { CopyButton, CodeSnippet, CodeExampleTabs, codeExamplePresets } from '@/components/common'
import { DATA_API_CODE_EXAMPLES } from '@/constants/code-examples'

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
    description: "A simple multichain wallet that pulls balances and token holdings from Avalanche&apos;s Data API.",
    icon: Wallet,
  },
  {
    title: "Transaction Report Application",
    description: "Generates detailed AVAX and token-transfer reports for any address by using the Data API&apos;s transactions and transfers endpoints.",
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
    description: "Deploy ERC-721 &amp; ERC-1155 contracts to Fuji, upload metadata to Pinata IPFS, and auto-index them with the Data API NFT endpoints.",
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
                  <CopyButton 
                    text={key.key} 
                    variant="ghost" 
                    size="icon"
                    successMessage="API key copied!"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Sample Code */}
      <CodeExampleTabs
        title="Sample Code"
        subtitle="Helpful code snippets to get started"
        examples={{
          javascript: {
            title: "Javascript SDK",
            install: "npm install @avalanche-sdk/sdk",
            installDescription: "First, initialize a Node.js project, then install the Avalanche SDK.",
            code: DATA_API_CODE_EXAMPLES.javascript.code,
            description: "Add the following code to a JavaScript file in your project. Execute it in your terminal with 'node yourFile.js' to retrieve the balance.",
            language: 'javascript'
          },
          python: {
            title: "Python SDK",
            install: "pip install avalanche-sdk-python",
            installDescription: "First, install the Avalanche SDK using pip.",
            code: DATA_API_CODE_EXAMPLES.python.code,
            description: "Add the following code to a Python file and run it to retrieve the balance.",
            language: 'python'
          },
          go: {
            title: "Go SDK",
            install: "go get github.com/ava-labs/avalanchego/sdk",
            installDescription: "First, initialize a Go module and install the Avalanche SDK.",
            code: DATA_API_CODE_EXAMPLES.go.code,
            description: "Create a new Go file with the following code to retrieve the balance.",
            language: 'go'
          },
          curl: {
            title: "Curl",
            code: `curl -X GET "https://api.avax.network/v1/addresses/0x71C7656EC7ab88b098defB751B7401B5f6d8976F/balances" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Accept: application/json"`,
            description: "Use curl to directly interact with the API endpoints. Remember to replace YOUR_API_KEY with your actual API key.",
            language: 'bash'
          }
        }}
        defaultTab="javascript"
      />

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
