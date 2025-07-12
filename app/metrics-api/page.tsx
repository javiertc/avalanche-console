"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from '@/components/common/CopyButton';
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
            <Card className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  <h3 id="code-examples-heading">Code Examples</h3>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Ready-to-use snippets for API integration
                </p>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList 
                    className="grid w-full grid-cols-4"
                    role="tablist"
                    aria-label="Code examples in different programming languages"
                  >
                    {Object.entries(CODE_EXAMPLES).map(([key, example]) => (
                      <TabsTrigger 
                        key={key} 
                        value={key} 
                        className="text-xs"
                        role="tab"
                        aria-selected={activeTab === key}
                        aria-controls={`panel-${key}`}
                        id={`tab-${key}`}
                      >
                        {example.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {Object.entries(CODE_EXAMPLES).map(([key, example]) => (
                    <TabsContent 
                      key={key} 
                      value={key} 
                      className="mt-4"
                      role="tabpanel"
                      id={`panel-${key}`}
                      aria-labelledby={`tab-${key}`}
                    >
                      <div className="relative">
                        <pre 
                          className="bg-muted p-3 rounded-md overflow-x-auto text-xs max-h-64"
                          role="region"
                          aria-label={`${example.title} code example`}
                          tabIndex={0}
                        >
                          <code 
                            className="text-foreground"
                            aria-label={`${example.title} code snippet`}
                          >
                            {example.code}
                          </code>
                        </pre>
                        <div className="absolute top-2 right-2">
                          <CopyButton
                            text={example.code}
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-foreground"
                            successMessage="Code copied!"
                            aria-label={`Copy ${example.title} code to clipboard`}
                          />
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
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