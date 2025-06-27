import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { AVALANCHE_CHAINS, METRIC_TYPES, TIME_INTERVALS, TIME_RANGES } from '@/constants/metrics';
import { layoutStyles } from '@/lib/styles';

interface MetricsControlsProps {
  chainId: string;
  metricType: string;
  timeInterval: string;
  timeRange: string;
  onChainChange: (chainId: string) => void;
  onMetricTypeChange: (metricType: string) => void;
  onTimeIntervalChange: (interval: string) => void;
  onTimeRangeChange: (range: string) => void;
  onRefresh: () => void;
  isLoading?: boolean;
}

export function MetricsControls({
  chainId,
  metricType,
  timeInterval,
  timeRange,
  onChainChange,
  onMetricTypeChange,
  onTimeIntervalChange,
  onTimeRangeChange,
  onRefresh,
  isLoading = false
}: MetricsControlsProps) {
  const selectedMetric = METRIC_TYPES.find(m => m.value === metricType);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Metrics Configuration</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className={layoutStyles.cardSpacing}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Chain Selection */}
          <div className={layoutStyles.inputSpacing}>
            <label className="text-sm font-medium text-foreground">
              Blockchain Network
            </label>
            <Select value={chainId} onValueChange={onChainChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select chain" />
              </SelectTrigger>
              <SelectContent>
                {AVALANCHE_CHAINS.map((chain) => (
                  <SelectItem key={chain.id} value={chain.id}>
                    {chain.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Metric Type Selection */}
          <div className={layoutStyles.inputSpacing}>
            <label className="text-sm font-medium text-foreground">
              Metric Type
            </label>
            <Select value={metricType} onValueChange={onMetricTypeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                {METRIC_TYPES.map((metric) => (
                  <SelectItem key={metric.value} value={metric.value}>
                    {metric.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Interval */}
          <div className={layoutStyles.inputSpacing}>
            <label className="text-sm font-medium text-foreground">
              Time Interval
            </label>
            <Select value={timeInterval} onValueChange={onTimeIntervalChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent>
                {TIME_INTERVALS.map((interval) => (
                  <SelectItem key={interval.value} value={interval.value}>
                    {interval.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Range */}
          <div className={layoutStyles.inputSpacing}>
            <label className="text-sm font-medium text-foreground">
              Time Range
            </label>
            <Select value={timeRange} onValueChange={onTimeRangeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                {TIME_RANGES.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Metric Description */}
        {selectedMetric && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>{selectedMetric.label}:</strong> {selectedMetric.description}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 