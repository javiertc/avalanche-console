import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { type MetricDataPoint } from '@/constants/metrics';

interface MetricsChartProps {
  data: MetricDataPoint[];
  title: string;
  description?: string;
  unit?: string;
  isLoading?: boolean;
  error?: Error | null;
}

export function MetricsChart({ 
  data, 
  title, 
  description, 
  unit = "", 
  isLoading = false, 
  error 
}: MetricsChartProps) {
  // Transform data for recharts
  const chartData = data.map(point => ({
    timestamp: point.timestamp,
    value: point.value,
    date: new Date(point.timestamp * 1000).toLocaleDateString(),
    time: new Date(point.timestamp * 1000).toLocaleString()
  }));

  // Calculate trend
  const getTrend = () => {
    if (data.length < 2) return { direction: 'neutral', percentage: 0 };
    
    const first = data[0]?.value || 0;
    const last = data[data.length - 1]?.value || 0;
    
    if (first === 0) return { direction: 'neutral', percentage: 0 };
    
    const percentage = ((last - first) / first) * 100;
    const direction = percentage > 0 ? 'up' : percentage < 0 ? 'down' : 'neutral';
    
    return { direction, percentage: Math.abs(percentage) };
  };

  const trend = getTrend();
  const latestValue = data[data.length - 1]?.value || 0;

  const TrendIcon = trend.direction === 'up' ? TrendingUp : 
                   trend.direction === 'down' ? TrendingDown : Minus;

  const trendColor = trend.direction === 'up' ? 'text-green-600 dark:text-green-400' : 
                     trend.direction === 'down' ? 'text-red-600 dark:text-red-400' : 
                     'text-muted-foreground';

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading metrics...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-center justify-center">
            <div className="text-red-500">Error loading metrics: {error.message}</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {latestValue.toLocaleString()} {unit}
            </div>
            <div className={`flex items-center space-x-1 text-sm ${trendColor}`}>
              <TrendIcon className="h-4 w-4" />
              <span>{trend.percentage.toFixed(1)}%</span>
              <Badge variant="outline" className="ml-2">
                {data.length} data points
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  color: 'hsl(var(--popover-foreground))'
                }}
                labelFormatter={(label, payload) => {
                  if (payload && payload[0]) {
                    return payload[0].payload.time;
                  }
                  return label;
                }}
                formatter={(value: number) => [
                  `${value.toLocaleString()} ${unit}`,
                  title
                ]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 