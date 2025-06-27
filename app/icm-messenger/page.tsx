"use client"

import { ResponsiveContainer } from "@/components/ui/responsive-container";
import { PageHeader } from "@/components/ui/page-header";

export default function ICMMessengerPage() {
  return (
    <ResponsiveContainer>
      <PageHeader
        title="ICM Messenger"
        description="Interchain Communication Messaging tools and utilities for cross-chain communication."
        className=""
      />
      
      <div className="text-center py-20">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">Coming Soon</h1>
        <p className="text-xl text-muted-foreground">
          Advanced tools for Interchain Communication Messaging are currently in development
        </p>
      </div>
    </ResponsiveContainer>
  )
}
