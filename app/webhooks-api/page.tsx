"use client"

import { useState } from "react"
import { Copy, Trash2, Plus, Settings, CheckCircle, XCircle, Clock, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import { WebhooksAPISlider } from "@/components/ui/webhooks-api-slider"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { ResponsiveTable } from "@/components/ui/responsive-table"
import { ErrorBoundary } from "@/components/ui/error-boundary"

const chains = [
  { value: "43114", label: "Avalanche C-Chain (Mainnet)" },
  { value: "43113", label: "Avalanche C-Chain (Fuji Testnet)" },
  { value: "11111", label: "Avalanche P-Chain" },
  { value: "22222", label: "Avalanche X-Chain" },
]

const eventTypes = [
  { value: "transaction", label: "Transaction" },
  { value: "block", label: "Block" },
  { value: "log", label: "Log" },
  { value: "token_transfer", label: "Token Transfer" },
  { value: "nft_transfer", label: "NFT Transfer" },
]

const initialWebhooks = [
  {
    id: "1",
    name: "Transaction Monitor",
    url: "https://api.myapp.com/webhooks/transactions",
    chainId: "43114",
    eventType: "transaction",
    addresses: ["0x71C7656EC7ab88b098defB751B7401B5f6d8976F"],
    eventSignatures: ["Transfer(address,address,uint256)"],
    status: "active",
    created: "2 days ago",
    lastDelivery: "5 minutes ago",
    deliveryStatus: "success",
    includeInternalTx: true,
    includeLogs: false,
  },
  {
    id: "2",
    name: "Block Notifications",
    url: "https://api.example.com/blocks",
    chainId: "43113",
    eventType: "block",
    addresses: [],
    eventSignatures: [],
    status: "active",
    created: "1 week ago",
    lastDelivery: "2 minutes ago",
    deliveryStatus: "success",
    includeInternalTx: false,
    includeLogs: true,
  },
  {
    id: "3",
    name: "NFT Tracker",
    url: "https://nft-app.com/webhook",
    chainId: "43114",
    eventType: "nft_transfer",
    addresses: ["0x1234567890123456789012345678901234567890"],
    eventSignatures: ["Transfer(address,address,uint256)"],
    status: "inactive",
    created: "3 days ago",
    lastDelivery: "1 hour ago",
    deliveryStatus: "failed",
    includeInternalTx: false,
    includeLogs: false,
  },
]

const deliveryLogs = [
  {
    id: "1",
    webhook: "Transaction Monitor",
    event: "transaction",
    timestamp: "2024-06-24 16:15:32",
    status: "success",
    responseCode: 200,
    responseTime: "145ms",
  },
  {
    id: "2",
    webhook: "Block Notifications",
    event: "block",
    timestamp: "2024-06-24 16:14:28",
    status: "success",
    responseCode: 200,
    responseTime: "89ms",
  },
  {
    id: "3",
    webhook: "NFT Tracker",
    event: "nft_transfer",
    timestamp: "2024-06-24 15:45:12",
    status: "failed",
    responseCode: 500,
    responseTime: "timeout",
  },
]

export default function WebhooksAPIPage() {
  const [activeTab, setActiveTab] = useState("Webhooks")
  const [webhooks, setWebhooks] = useState(initialWebhooks)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDisabled, setShowDisabled] = useState(false)
  const [showSigningSecret, setShowSigningSecret] = useState(false)

  // Form state
  const [network, setNetwork] = useState("testnet")
  const [selectedChain, setSelectedChain] = useState("")
  const [webhookUrl, setWebhookUrl] = useState("")
  const [addresses, setAddresses] = useState("")
  const [webhookName, setWebhookName] = useState("")
  const [description, setDescription] = useState("")
  const [eventSignatures, setEventSignatures] = useState("")
  const [includeInternalTx, setIncludeInternalTx] = useState(false)
  const [includeLogs, setIncludeLogs] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The URL has been copied to your clipboard.",
    })
  }

  const getStatusBadge = (status: string) => {
    const variant = status === "active" ? "default" : "secondary"
    return <Badge variant={variant}>{status}</Badge>
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />
    }
  }

  const filteredWebhooks = showDisabled ? webhooks : webhooks.filter((w) => w.status === "active")

  return (
    <ResponsiveContainer>
      {/* API Features Slider */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Avalanche Webhooks API</h1>
          <p className="text-copy-16 text-muted-foreground">
            Real-time blockchain event notifications with enterprise-grade reliability
          </p>
        </div>
        <WebhooksAPISlider />
      </div>

      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-lg font-medium">Webhooks Management</h2>
          <p className="text-sm text-muted-foreground">
            Configure webhook endpoints for blockchain events
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setShowSigningSecret(true)}
          >
            Signing Secret
          </Button>
          <Button
            onClick={() => setShowCreateModal(true)}
          >
            Create Webhook
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="Webhooks"
              className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground"
            >
              Webhooks
            </TabsTrigger>
            <TabsTrigger
              value="Logs"
              className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground"
            >
              Delivery Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="Webhooks" className="space-y-4">
            {/* Controls */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="show-disabled" className="text-sm font-medium text-foreground">
                  Show Disabled
                </Label>
                <Switch id="show-disabled" checked={showDisabled} onCheckedChange={setShowDisabled} />
              </div>
            </div>

            {/* Webhooks Table */}
            <ResponsiveTable
              data={filteredWebhooks}
              columns={[
                {
                  key: 'status',
                  label: 'Status',
                  render: (status) => (
                    <Badge variant={status === "active" ? "default" : "secondary"} className="text-xs">
                      {status}
                    </Badge>
                  )
                },
                {
                  key: 'url',
                  label: 'URL',
                  render: (url) => (
                    <div className="flex items-center space-x-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded truncate text-foreground max-w-[200px]">
                        {url}
                      </code>
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(url)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                },
                {
                  key: 'chainId',
                  label: 'Chain',
                  mobileHidden: true,
                  render: (chainId) => (
                    <Badge variant="outline" className="border-border text-foreground text-xs">
                      {chainId}
                    </Badge>
                  )
                },
                {
                  key: 'eventType',
                  label: 'Event',
                  mobileHidden: true,
                  render: (eventType) => (
                    <Badge variant="outline" className="border-border text-foreground text-xs">
                      {eventType}
                    </Badge>
                  )
                },
                {
                  key: 'addresses',
                  label: 'Addresses',
                  mobileHidden: true,
                  render: (addresses) => (
                    <div>
                      {addresses.length > 0 ? (
                        <div className="space-y-1">
                          {addresses.slice(0, 1).map((addr: string, idx: number) => (
                            <div
                              key={idx}
                              className="text-xs font-mono bg-muted px-2 py-1 rounded truncate text-foreground max-w-[120px]"
                            >
                              {addr.slice(0, 10)}...
                            </div>
                          ))}
                          {addresses.length > 1 && (
                            <div className="text-xs text-muted-foreground">
                              +{addresses.length - 1} more
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">All</span>
                      )}
                    </div>
                  )
                },
                {
                  key: 'eventSignatures',
                  label: 'Signatures',
                  mobileHidden: true,
                  render: (eventSignatures) => (
                    <div>
                      {eventSignatures.length > 0 ? (
                        <div className="space-y-1">
                          {eventSignatures.slice(0, 1).map((sig: string, idx: number) => (
                            <div
                              key={idx}
                              className="text-xs font-mono bg-muted px-2 py-1 rounded truncate text-foreground max-w-[120px]"
                            >
                              {sig.split('(')[0]}(...)
                            </div>
                          ))}
                          {eventSignatures.length > 1 && (
                            <div className="text-xs text-muted-foreground">
                              +{eventSignatures.length - 1} more
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">All</span>
                      )}
                    </div>
                  )
                },
                {
                  key: 'created',
                  label: 'Created',
                  mobileHidden: true
                },
                {
                  key: 'actions',
                  label: '',
                  render: () => (
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                }
              ]}
            />
          </TabsContent>

          <TabsContent value="Logs" className="space-y-4">
            {/* Delivery Logs Table */}
            <div className="rounded-md border">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-medium">Webhook</TableHead>
                    <TableHead className="font-medium">Event</TableHead>
                    <TableHead className="font-medium">Time</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="font-medium">Code</TableHead>
                    <TableHead className="font-medium">Response</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveryLogs.map((log) => (
                    <TableRow key={log.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium text-foreground text-sm">{log.webhook}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-border text-foreground text-xs">
                          {log.event}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-foreground">{log.timestamp.split(' ')[1]}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(log.status)}
                          <span className="capitalize text-foreground text-sm">{log.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={log.responseCode === 200 ? "default" : "destructive"} className="text-xs">
                          {log.responseCode}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-foreground text-sm">{log.responseTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Webhook Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border">
          <DialogHeader className="pb-2 border-b border-border">
            <DialogTitle className="text-base font-bold text-foreground">Create New Webhook</DialogTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Configure a webhook to receive real-time blockchain event notifications
            </p>
          </DialogHeader>

          <div className="py-3 space-y-3">
            {/* Basic Configuration */}
            <div className="space-y-2">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Basic Configuration</h3>

                {/* Network Selection */}
                <div className="space-y-2">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-foreground">Network</Label>
                    <RadioGroup value={network} onValueChange={setNetwork} className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mainnet" id="mainnet" />
                        <Label htmlFor="mainnet" className="text-xs">Mainnet</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="testnet" id="testnet" />
                        <Label htmlFor="testnet" className="text-xs">Testnet</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-foreground">
                        Chain <span className="text-red-500">*</span>
                      </Label>
                      <Select value={selectedChain} onValueChange={setSelectedChain}>
                        <SelectTrigger className="bg-background border-border text-foreground h-7">
                          <SelectValue placeholder="Select a chain" />
                        </SelectTrigger>
                        <SelectContent>
                          {chains.map((chain) => (
                            <SelectItem key={chain.value} value={chain.value}>
                              {chain.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-foreground">
                        Event Type <span className="text-red-500">*</span>
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-background border-border text-foreground h-7">
                          <SelectValue placeholder="Select an event type" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-foreground">
                      Webhook Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={webhookName}
                      onChange={(e) => setWebhookName(e.target.value)}
                      placeholder="e.g., Transaction Monitor"
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground h-7"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-foreground">
                      Endpoint URL <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://your-app.com/webhook/avalanche"
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground h-7"
                    />
                    <p className="text-xs text-muted-foreground">
                      This URL will receive POST requests with blockchain event data
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Configuration */}
            <div className="space-y-2">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Advanced Options</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-start space-x-2 p-2 rounded-lg border border-border bg-muted/30">
                  <Checkbox
                    id="includeInternalTx"
                    checked={includeInternalTx}
                    onCheckedChange={(checked) => setIncludeInternalTx(checked === true)}
                    className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-0.5"
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="includeInternalTx"
                      className="text-xs font-medium text-foreground cursor-pointer"
                    >
                      Include Internal Transactions
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Include contract-to-contract transactions
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 p-2 rounded-lg border border-border bg-muted/30">
                  <Checkbox
                    id="includeLogs"
                    checked={includeLogs}
                    onCheckedChange={(checked) => setIncludeLogs(checked === true)}
                    className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-0.5"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="includeLogs" className="text-xs font-medium text-foreground cursor-pointer">
                      Include Event Logs
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Include detailed event logs and parameters
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end space-x-2 pt-2 border-t border-border">
            <Button variant="outline" size="sm" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">Create Webhook</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Signing Secret Modal */}
      <Dialog open={showSigningSecret} onOpenChange={setShowSigningSecret}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-foreground">Webhook Signing Secret</DialogTitle>
          </DialogHeader>
          <div className="py-3">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                Use this secret to verify webhook requests using HMAC SHA-256.
              </p>
              <div className="space-y-1">
                <Label className="text-xs font-medium text-foreground">Signing Secret</Label>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-muted p-2 rounded text-xs text-foreground">
                    whsec_*************************************
                  </code>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard("signing-secret")} className="h-7 w-7 p-0">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </ResponsiveContainer>
  )
}
