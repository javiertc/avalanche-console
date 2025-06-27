"use client"

import { ResponsiveContainer } from "@/components/ui/responsive-container";
import { PageHeader } from "@/components/ui/page-header";

export default function ICTTTokenManagerPage() {
  return (
    <ResponsiveContainer>
      <PageHeader
        title="ICTT Token Manager"
        description="Manage and monitor your Interchain Token Transfer (ICTT) tokens across networks."
        className=""
      />
      
      <div className="text-center py-20">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">Coming Soon</h1>
        <p className="text-xl text-muted-foreground">
          Advanced ICTT token management and monitoring tools are currently in development
        </p>
      </div>
    </ResponsiveContainer>
  )
}
