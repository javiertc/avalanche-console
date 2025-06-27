"use client"
import React from "react"
import { BarChart3, BookOpen, MessageCircle, FileText, HelpCircle } from "lucide-react"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { UsageStats } from "@/components/dashboard/UsageStats"
import { DeveloperResources } from "@/components/dashboard/DeveloperResources"
import { PageHeader } from "@/components/ui/page-header"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { AnnouncementBanner } from "@/components/ui/announcement-banner"
import { layoutStyles } from "@/lib/styles"

export default function HomePage() {
  return (
    <ResponsiveContainer>
      <PageHeader
        title="Welcome to Avalanche Developer Console"
        description="Build, test, and deploy on Avalanche with our comprehensive developer tools and APIs."
      />

      <AnnouncementBanner />

      <QuickActions />

      {/* API Usage Analytics */}
      <div className="space-geist">
        <h2 className={`${layoutStyles.sectionTitle} flex items-center gap-3`}>
          <BarChart3 className="h-6 w-6" />
          API Usage Analytics
        </h2>
        
        <UsageStats />
      </div>

      {/* Developer Resources */}
      <div className="space-geist">
        <h2 className={`${layoutStyles.sectionTitle} flex items-center gap-3`}>
          <BookOpen className="h-6 w-6" />
          Developer Resources
        </h2>
        
        <DeveloperResources />
      </div>

      {/* Support Section */}
      <div className="mt-12 pt-8 border-t border-border">
        <div className="mb-6">
          <h2 className={`${layoutStyles.sectionTitle} flex items-center gap-3`}>
            <HelpCircle className="h-6 w-6" />
            Support
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className={`${layoutStyles.card} group cursor-pointer`}>
            <a
              href="https://discord.gg/avalanche"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-6"
            >
              <MessageCircle className="h-6 w-6 mr-3 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-copy-16 text-foreground font-medium">Join our Discord</span>
            </a>
          </div>
          <div className={`${layoutStyles.card} group cursor-pointer`}>
            <a
              href="https://docs.avax.network"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-6"
            >
              <FileText className="h-6 w-6 mr-3 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-copy-16 text-foreground font-medium">Read our docs</span>
            </a>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}
