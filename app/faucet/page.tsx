"use client"

import { useState } from "react"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { networks, tokens, codeSnippets } from "@/constants/faucet"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { FaucetSlider } from "@/components/ui/faucet-slider"
import { layoutStyles } from "@/lib/styles"
import { copyToClipboard } from "@/lib/utils"
import { CodeExampleTabs, codeExamplePresets } from "@/components/common"

export default function Faucet() {
  const [selectedNetwork, setSelectedNetwork] = useState("fuji-c")
  const [selectedToken, setSelectedToken] = useState("avax")
  const [address, setAddress] = useState("")
  const [couponCode, setCouponCode] = useState("")
  const [activeCodeTab, setActiveCodeTab] = useState("Javascript SDK")



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
        <CodeExampleTabs
          title="Using Code"
          subtitle="Request funds from the faucet programmatically"
          examples={codeExamplePresets.faucet(codeSnippets)}
          defaultTab="Javascript SDK"
          className="space-y-4 sm:space-y-6"
        />
      </div>
    </ResponsiveContainer>
  )
}
