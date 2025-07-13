"use client"

import { ResponsiveContainer } from "@/components/ui/responsive-container";

export default function ICTTTokenManagerPage() {
  return (
    <ResponsiveContainer>
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">ICTT Token Manager</h1>
          <p className="text-copy-16 text-muted-foreground">
            Manage and monitor your Interchain Token Transfer (ICTT) tokens across networks
          </p>
        </div>
      </div>
      
      <div className="text-center py-20">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">Coming Soon</h1>
        <p className="text-xl text-muted-foreground">
          Advanced ICTT token management and monitoring tools are currently in development
        </p>
      </div>
    </ResponsiveContainer>
  )
}
