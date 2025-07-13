"use client"

import { ResponsiveContainer } from "@/components/ui/responsive-container";

export default function ICMMessengerPage() {
  return (
    <ResponsiveContainer>
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">ICM Messenger</h1>
          <p className="text-copy-16 text-muted-foreground">
            Interchain Communication Messaging tools and utilities for cross-chain communication
          </p>
        </div>
      </div>
      
      <div className="text-center py-20">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">Coming Soon</h1>
        <p className="text-xl text-muted-foreground">
          Advanced tools for Interchain Communication Messaging are currently in development
        </p>
      </div>
    </ResponsiveContainer>
  )
}
