"use client"

import { useState } from "react"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { networks, tokens, codeSnippets } from "@/constants/faucet"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { FaucetSlider } from "@/components/ui/faucet-slider"
import { layoutStyles } from "@/lib/styles"

export default function Faucet() {
  const [selectedNetwork, setSelectedNetwork] = useState("fuji-c")
  const [selectedToken, setSelectedToken] = useState("avax")
  const [address, setAddress] = useState("")
  const [couponCode, setCouponCode] = useState("")
  const [activeCodeTab, setActiveCodeTab] = useState("Javascript SDK")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard.",
    })
  }

  const requestFunds = () => {
    if (!address.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid address.",
        variant: "destructive",
      })
      return
    }

    const selectedTokenData = tokens.find((t) => t.value === selectedToken)
    const amount = selectedTokenData?.amount || "2"
    const tokenLabel = selectedTokenData?.label || "AVAX"

    toast({
      title: "Faucet request submitted",
      description: `${amount} ${tokenLabel} has been sent to your address.`,
    })

    // Clear form
    setAddress("")
    setCouponCode("")
  }

  const selectedTokenData = tokens.find((t) => t.value === selectedToken)
  const tokenAmount = selectedTokenData?.amount || "2"
  const tokenLabel = selectedTokenData?.label || "AVAX"

  return (
    <ResponsiveContainer>
      {/* Faucet Features Slider */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Avalanche Faucet</h1>
          <p className="text-copy-16 text-muted-foreground">
            Request test tokens for development on Avalanche test networks
          </p>
        </div>
        <FaucetSlider />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Faucet Form */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-medium text-foreground">Request Tokens</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Get free test tokens for development on Avalanche test networks
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card text-card-foreground">
            <div className={layoutStyles.cardContent}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className={layoutStyles.inputSpacing}>
                  <Label htmlFor="network" className="text-sm font-medium text-foreground">
                    Select Network
                  </Label>
                  <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                    <SelectTrigger className="w-full bg-background text-foreground border-border focus:ring-0 focus:ring-offset-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover text-popover-foreground border-border">
                      {networks.map((network) => (
                        <SelectItem
                          key={network.value}
                          value={network.value}
                          className="focus:bg-accent focus:text-accent-foreground"
                        >
                          {network.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className={layoutStyles.inputSpacing}>
                  <Label htmlFor="token" className="text-sm font-medium text-foreground">
                    Select Token
                  </Label>
                  <Select value={selectedToken} onValueChange={setSelectedToken}>
                    <SelectTrigger className="w-full bg-background text-foreground border-border focus:ring-0 focus:ring-offset-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover text-popover-foreground border-border">
                      {tokens.map((token) => (
                        <SelectItem
                          key={token.value}
                          value={token.value}
                          className="focus:bg-accent focus:text-accent-foreground"
                        >
                          {token.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className={layoutStyles.inputSpacing}>
                <Label htmlFor="address" className="text-sm font-medium text-foreground">
                  Address
                </Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full bg-background text-foreground border-border"
                />
              </div>

              <div className={layoutStyles.inputSpacing}>
                <Label htmlFor="coupon" className="text-sm font-medium text-foreground">
                  Coupon Code (optional)
                </Label>
                <Input
                  id="coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder=""
                  className="w-full bg-background text-foreground border-border"
                />
              </div>

              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Limit: You can request {tokenAmount} {tokenLabel} each day
                </p>
                <Button
                  onClick={requestFunds}
                  className="w-full"
                >
                  Request {tokenAmount} {tokenLabel}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Using Code Section */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-medium text-foreground">Using Code</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Request funds from the faucet programmatically
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card text-card-foreground">
            <CardContent className="p-0">
              <Tabs value={activeCodeTab} onValueChange={setActiveCodeTab}>
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 border-border">
                  {Object.keys(codeSnippets).map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent text-foreground"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {Object.entries(codeSnippets).map(([tab, snippet]) => (
                  <TabsContent key={tab} value={tab} className={layoutStyles.tabContent}>
                    <div>
                      <p className="text-sm text-muted-foreground mb-3">
                        First, initialize a Node.js project, then install the Avalanche SDK.
                      </p>
                      {snippet.install && (
                        <div className="flex items-center justify-between bg-muted p-3 rounded-md mb-4">
                          <code className="text-sm text-foreground">{snippet.install}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(snippet.install)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Add the following code to a JavaScript file in your project. Execute it in your terminal with
                        `node yourFile.js` to retrieve the balance.
                      </p>
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                          <code className="text-foreground">{snippet.code}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                          onClick={() => copyToClipboard(snippet.code)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}
