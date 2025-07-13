import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { CODE_EXAMPLES } from '@/constants/metrics';
import { CodeExampleTabs, codeExamplePresets } from '@/components/common';
import { layoutStyles } from '@/lib/styles';

interface CodeExamplesProps {
  chainId: string;
  metricType: string;
  startTimestamp: number;
  endTimestamp: number;
  timeInterval: string;
}

export function CodeExamples({
  chainId,
  metricType,
  startTimestamp,
  endTimestamp,
  timeInterval
}: CodeExamplesProps) {
  // Generate dynamic code examples based on current parameters
  const generateCode = (template: string) => {
    return template
      .replace(/43114/g, chainId)
      .replace(/activeAddresses/g, metricType)
      .replace(/1722470400/g, startTimestamp.toString())
      .replace(/1725062400/g, endTimestamp.toString())
      .replace(/day/g, timeInterval);
  };

  const openApiDocs = () => {
    window.open('https://developers.avacloud.io/metrics-api/getting-started', '_blank');
  };

  // Transform code examples for the new component
  const transformedExamples = Object.entries(CODE_EXAMPLES).reduce((acc, [key, example]) => {
    acc[key] = {
      title: example.title,
      code: generateCode(example.code),
      language: key === 'curl' ? 'bash' : key
    };
    return acc;
  }, {} as Record<string, any>);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>API Code Examples</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Ready-to-use code snippets for integrating the Metrics API
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={openApiDocs}
            className="flex items-center space-x-2"
          >
            <ExternalLink className="h-4 w-4" />
            <span>API Docs</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <CodeExampleTabs
          examples={transformedExamples}
          defaultTab="curl"
        />

        {/* Additional help sections */}
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              🚀 Getting Started
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              The Metrics API requires no authentication! Just make your request and get instant access to on-chain data and analytics.
              Use this data with visualization libraries like Chart.js, D3.js, Highcharts, Plotly.js, or Recharts.
            </p>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
              💡 Visualization Tip
            </h4>
            <p className="text-sm text-green-800 dark:text-green-200">
              The transformed data structure works perfectly with popular charting libraries. 
              The timestamp is converted to a JavaScript Date object for easy plotting.
            </p>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
              📊 Sample Response
            </h4>
            <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
              The API returns data in this format:
            </p>
            <pre className="bg-amber-100 dark:bg-amber-900/20 p-3 rounded text-xs overflow-x-auto">
              <code>{`{
  "results": [
    {
      "value": 37738,
      "timestamp": 1724976000
    },
    {
      "value": 53934,
      "timestamp": 1724889600
    }
    // ... more data points
  ]
}`}</code>
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 