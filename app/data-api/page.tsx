"use client"

import { ExternalLink, Wallet, BarChart3, Factory, Eye, Palette, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { DataAPISlider } from "@/components/ui/data-api-slider"
import { CodeExampleTabs } from '@/components/common'
import { DATA_API_CODE_EXAMPLES } from '@/constants/code-examples'

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
    </ResponsiveContainer>
  )
}
