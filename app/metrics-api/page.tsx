"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton, CodeExampleTabs, codeExamplePresets } from '@/components/common';
import { ResponsiveContainer } from "@/components/ui/responsive-container";

import { MetricsAPISlider } from "@/components/ui/metrics-api-slider";
import { METRICS_API_BASE_URL, METRIC_TYPES, CODE_EXAMPLES } from '@/constants/metrics';
import { Zap } from "lucide-react";

export default function MetricsAPIPage() {
  const [activeTab, setActiveTab] = useState("curl");

  return (
    <ResponsiveContainer>
      {/* Metrics API Slider */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Avalanche Metrics API</h1>
          <p className="text-copy-16 text-muted-foreground">
            Comprehensive blockchain analytics and performance insights with real-time data access
          </p>
        </div>
        <MetricsAPISlider />
      </div>

      {/* Base URL Section - Prominent Display */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-medium">Base URL</h2>
          <p className="text-sm text-muted-foreground">
            All API endpoints use this base URL. No authentication required - instant access to blockchain data.
          </p>
        </div>
        <div className="rounded-md border">
          <div className="flex items-center justify-between p-4 bg-muted/50">
            <span className="text-sm font-mono text-foreground">
              {METRICS_API_BASE_URL}
            </span>
            <CopyButton 
              text={METRICS_API_BASE_URL} 
              size="default" 
              aria-label="Copy base URL to clipboard"
            />
          </div>
        </div>
      </div>

      <section aria-labelledby="api-reference-heading" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="api-reference-heading" className="text-lg font-medium">API Reference</h2>
            <p className="text-sm text-muted-foreground">
              Access on-chain analytics and metrics for Avalanche networks
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Code Examples */}
          <section aria-labelledby="code-examples-heading" className="lg:col-span-2">
            <CodeExampleTabs
              title="Code Examples"
              subtitle="Ready-to-use snippets for API integration"
              examples={codeExamplePresets.metricsApi(CODE_EXAMPLES)}
              defaultTab="curl"
              showCard={true}
              className="h-fit"
            />
          </section>

          {/* Right Column - Available Metrics */}
          <aside role="complementary" aria-label="API reference information" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base">
                  <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
                  <h3>Available Metrics</h3>
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  Comprehensive blockchain analytics
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div role="list" aria-label="Available metric types" className="space-y-3">
                  {METRIC_TYPES.map((metric) => (
                    <div key={metric.value} className="group p-3 bg-muted/30 hover:bg-muted/50 rounded-lg border border-border/50 hover:border-border transition-all duration-200">
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                          {metric.label}
                        </span>
                        <code className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-mono">
                          {metric.value}
                        </code>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {metric.description}
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/30">
                        <span className="text-xs text-muted-foreground font-medium">
                          Unit: {metric.unit}
                        </span>
                        <div className="h-1 w-1 rounded-full bg-success"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>


    </ResponsiveContainer>
  )
}