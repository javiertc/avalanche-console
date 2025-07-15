"use client"

import { ExternalLink, Wallet, BarChart3, Factory, Eye, Palette, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { SectionErrorBoundary, PageErrorBoundary } from "@/components/ui/error-boundary"
import { DataAPISlider } from "@/components/ui/data-api-slider"
import { CodeExampleTabs } from '@/components/common'
import { DATA_API_CODE_EXAMPLES } from '@/constants/code-examples'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    <PageErrorBoundary name="DataAPIPage">
      <ResponsiveContainer>
        {/* Page Header */}
        <SectionErrorBoundary name="PageHeader">
          <div className="space-y-2 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Avalanche Data API</h1>
            <p className="text-copy-16 text-muted-foreground">
              Powerful blockchain data access with enterprise-grade performance and security
            </p>
          </div>
        </SectionErrorBoundary>

        {/* API Features Slider */}
        <SectionErrorBoundary name="DataAPISlider">
          <DataAPISlider />
        </SectionErrorBoundary>

        {/* Tabs */}
        <SectionErrorBoundary name="DataAPITabs">
          <div className="rounded-md border mt-8 overflow-hidden">
        <Tabs defaultValue="get-started" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-muted/50 p-0">
            <TabsTrigger 
              value="get-started" 
              className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Get started
            </TabsTrigger>
            <TabsTrigger 
              value="metrics" 
              className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Metrics
            </TabsTrigger>
            <TabsTrigger 
              value="request-logs" 
              className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Request logs
            </TabsTrigger>
          </TabsList>

          {/* Get started Tab */}
          <TabsContent value="get-started" className="p-4 space-y-8">

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
        </TabsContent>

                  {/* Metrics Tab */}
        <TabsContent value="metrics" className="p-4 space-y-6">
          {/* Monthly Data Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card className="p-4 flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-1">Total requests</span>
              <span className="text-2xl font-bold">12,345</span>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-1">Avg requests per second</span>
              <span className="text-2xl font-bold">4.2</span>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-1">Success rate</span>
              <span className="text-2xl font-bold">99.8%</span>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-1">Median response time</span>
              <span className="text-2xl font-bold">120 ms</span>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-1">Invalid requests</span>
              <span className="text-2xl font-bold">23</span>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-1">Other</span>
              <span className="text-2xl font-bold">7</span>
            </Card>
          </div>

          {/* Current CU Usage */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Current CU usage <span className="ml-1 text-xs text-muted-foreground">ⓘ</span></div>
              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <span>Total CUs in plan</span>
                <span className="font-bold">6M</span>
                <Button size="sm" variant="secondary" className="ml-2">Get more CUs</Button>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-sm">CUs consumed</span>
              <span className="text-lg font-bold">1,200,000</span>
            </div>
            <div className="w-full">
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div className="h-4 bg-primary" style={{ width: '20%' }} />
              </div>
              <div className="text-xs text-center mt-1">20%</div>
            </div>
          </Card>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <div className="w-32">
              <select className="w-full rounded border bg-background px-2 py-1 text-sm">
                <option>API key 1</option>
                <option>API key 2</option>
                <option>API key 3</option>
              </select>
            </div>
            <div className="w-24">
              <select className="w-full rounded border bg-background px-2 py-1 text-sm">
                <option>L1</option>
                <option>L2</option>
              </select>
            </div>
            <div className="w-40">
              <select className="w-full rounded border bg-background px-2 py-1 text-sm">
                <option>Last 24 hours</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
            <Button size="sm" variant="outline">Reset</Button>
          </div>

          {/* Charts/Sections */}
          <div className="space-y-6">
            <Card className="p-6 min-h-[180px] flex flex-col">
              <div className="font-semibold mb-2">Method calls over time</div>
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="pr-4">Time</th>
                      <th>Requests</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="pr-4">00:00</td>
                      <td>12</td>
                    </tr>
                    <tr>
                      <td className="pr-4">06:00</td>
                      <td>34</td>
                    </tr>
                    <tr>
                      <td className="pr-4">12:00</td>
                      <td>56</td>
                    </tr>
                    <tr>
                      <td className="pr-4">18:00</td>
                      <td>21</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
            <Card className="p-6 min-h-[180px] flex flex-col">
              <div className="font-semibold mb-2">Data API</div>
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="pr-4">Endpoint</th>
                      <th>Requests</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="pr-4">/v1/addresses</td>
                      <td>120</td>
                    </tr>
                    <tr>
                      <td className="pr-4">/v1/transactions</td>
                      <td>98</td>
                    </tr>
                    <tr>
                      <td className="pr-4">/v1/tokens</td>
                      <td>45</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
            <Card className="p-6 min-h-[180px] flex flex-col">
              <div className="font-semibold mb-2">Response statuses</div>
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="pr-4">Status</th>
                      <th>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="pr-4">200</td>
                      <td>250</td>
                    </tr>
                    <tr>
                      <td className="pr-4">400</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td className="pr-4">500</td>
                      <td>2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </TabsContent>

          {/* Request Logs Tab */}
          <TabsContent value="request-logs" className="p-4 space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Request Logs</h3>
              <p className="text-muted-foreground">View your recent Data API requests and responses here.</p>
              {/* TODO: Add actual request logs table */}
            </Card>
          </TabsContent>
        </Tabs>
          </div>
        </SectionErrorBoundary>
      </ResponsiveContainer>
    </PageErrorBoundary>
  )
}
