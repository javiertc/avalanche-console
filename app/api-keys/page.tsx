"use client"

import { useState, useEffect } from "react"
import dynamic from 'next/dynamic'
import { Key, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ApiKeyTable, ApiKey } from '@/components/common'
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { SectionErrorBoundary, PageErrorBoundary } from "@/components/ui/error-boundary"
import { apiKeysService, analyticsService } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

// Dynamic imports for recharts to avoid SSR issues
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false })
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false })
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false })
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false })
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false })
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false })
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false })

// Mock data - replace with actual API calls
const apiKeys: ApiKey[] = [
  {
    key: "my-key (****mGmE)",
    requests: "234234234",
    created: "13 days ago",
  },
  {
    key: "my-dev (****mGmE)",
    requests: "234234234",
    created: "Today",
  },
]

// Static mock metrics data to avoid hydration mismatch
const apiRequestsData = [
  { date: "Dec 20", value: 3245 },
  { date: "Dec 21", value: 4567 },
  { date: "Dec 22", value: 3890 },
  { date: "Dec 23", value: 5234 },
  { date: "Dec 24", value: 2890 },
  { date: "Dec 25", value: 4123 },
  { date: "Dec 26", value: 4567 },
  { date: "Dec 27", value: 3456 },
  { date: "Dec 28", value: 5678 },
  { date: "Dec 29", value: 4234 },
  { date: "Dec 30", value: 3567 },
  { date: "Dec 31", value: 4890 },
  { date: "Jan 1", value: 3234 },
  { date: "Jan 2", value: 4567 },
  { date: "Jan 3", value: 5123 },
];

const dataApiRequestsData = [
  { date: "Dec 20", value: 2145 },
  { date: "Dec 21", value: 3267 },
  { date: "Dec 22", value: 2790 },
  { date: "Dec 23", value: 3834 },
  { date: "Dec 24", value: 1890 },
  { date: "Dec 25", value: 2923 },
  { date: "Dec 26", value: 3367 },
  { date: "Dec 27", value: 2456 },
  { date: "Dec 28", value: 4178 },
  { date: "Dec 29", value: 3234 },
  { date: "Dec 30", value: 2567 },
  { date: "Dec 31", value: 3690 },
  { date: "Jan 1", value: 2234 },
  { date: "Jan 2", value: 3467 },
  { date: "Jan 3", value: 4023 },
];

const dataApiByEndpoint = [
  { endpoint: "/v1/chains", requests: 8234 },
  { endpoint: "/v1/blocks", requests: 6789 },
  { endpoint: "/v1/transactions", requests: 5234 },
  { endpoint: "/v1/addresses", requests: 4567 },
  { endpoint: "/v1/tokens", requests: 3890 },
  { endpoint: "/v1/balances", requests: 2345 },
];

const metricsApiRequestsData = [
  { date: "Dec 20", value: 1100 },
  { date: "Dec 21", value: 1300 },
  { date: "Dec 22", value: 1100 },
  { date: "Dec 23", value: 1400 },
  { date: "Dec 24", value: 1000 },
  { date: "Dec 25", value: 1200 },
  { date: "Dec 26", value: 1200 },
  { date: "Dec 27", value: 1000 },
  { date: "Dec 28", value: 1500 },
  { date: "Dec 29", value: 1000 },
  { date: "Dec 30", value: 1000 },
  { date: "Dec 31", value: 1200 },
  { date: "Jan 1", value: 1000 },
  { date: "Jan 2", value: 1100 },
  { date: "Jan 3", value: 1100 },
];

const metricsApiByEndpoint = [
  { endpoint: "/v1/metrics/txcount", requests: 4567 },
  { endpoint: "/v1/metrics/blocktime", requests: 3890 },
  { endpoint: "/v1/metrics/tps", requests: 3234 },
  { endpoint: "/v1/metrics/gasfees", requests: 2890 },
  { endpoint: "/v1/metrics/validators", requests: 2345 },
  { endpoint: "/v1/metrics/staking", requests: 1890 },
];

const apiRequestsByKey = [
  { key: "my-key (****mGmE)", requests: 234234 },
  { key: "my-dev (****mGmE)", requests: 156789 },
  { key: "prod-key (****xYz9)", requests: 98765 },
  { key: "test-key (****aBc3)", requests: 45678 },
  { key: "staging (****dEf5)", requests: 23456 },
];

// Custom Bar Chart Component
interface MetricsBarChartProps {
  data: { date: string; value: number }[];
  title: string;
  description?: string;
  color?: string;
  className?: string;
}

function MetricsBarChart({ data, title, description, color = "hsl(var(--primary))", className }: MetricsBarChartProps) {
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

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription className="mt-1">{description}</CardDescription>}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {latestValue.toLocaleString()}
            </div>
            <div className={`flex items-center justify-end space-x-1 text-sm ${trendColor}`}>
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
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }} barCategoryGap="10%">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  color: '#000000'
                }}
                formatter={(value: any) => [value.toLocaleString(), "Requests"]}
              />
              <Bar 
                dataKey="value" 
                fill={color}
                radius={[4, 4, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ApiKeysPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [keyName, setKeyName] = useState("")
  const [apiKeysData, setApiKeysData] = useState<ApiKey[]>(apiKeys)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchApiKeys = async () => {
    setLoading(true)
    try {
      const result = await apiKeysService.getApiKeys()
      if (result.success) {
        setApiKeysData(result.data)
      } else {
        console.error('Failed to fetch API keys:', result.error)
        // Fall back to mock data
        setApiKeysData(apiKeys)
      }
    } catch (error) {
      console.error('Error fetching API keys:', error)
      // Fall back to mock data
      setApiKeysData(apiKeys)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApiKeys()
  }, [])

  const handleCreateKey = async () => {
    if (!keyName.trim()) return;
    
    try {
      const result = await apiKeysService.createApiKey({ name: keyName.trim() });
      
      if (result.success) {
        // Show success message
        toast({
          title: "API Key Created",
          description: `Successfully created API key: ${result.data.name}`,
        });
        
        // Refresh the keys list
        await fetchApiKeys();
        
        setShowCreateModal(false);
        setKeyName("");
      } else {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Failed to create API key:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create API key",
        variant: "destructive",
      });
    }
  }

  return (
    <PageErrorBoundary name="ApiKeysPage">
      <div style={{ width: '100%', padding: '24px 32px' }}>
        {/* Page Header */}
        <SectionErrorBoundary name="PageHeader">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">API Keys</h1>
                <p className="text-muted-foreground mt-2">
                  Create and manage your API keys for accessing Avalanche services
                </p>
              </div>
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2"
                disabled={loading}
              >
                <Key className="h-4 w-4" />
                New Key
              </Button>
            </div>
          </div>
        </SectionErrorBoundary>

        {/* API Keys Table */}
        <SectionErrorBoundary name="ApiKeysTable">
          <div className="space-y-4 mt-8">
            <div>
              <h3 className="text-lg font-medium mb-1">Your API Keys</h3>
              <p className="text-sm text-muted-foreground">
                Manage your API keys below and see our API docs to get started
              </p>
            </div>
            <ApiKeyTable keys={apiKeysData} loading={loading} />
          </div>
        </SectionErrorBoundary>

        {/* Metrics Section */}
        <SectionErrorBoundary name="MetricsSection">
          <div className="space-y-6 mt-12">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Metrics</h2>
            </div>
            
            <div className="space-y-6">
          <MetricsBarChart
            data={apiRequestsData}
            title="Total API Requests"
            description="Combined API usage across all services"
            color="#3b82f6"
          />
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Total API Request By API Key</CardTitle>
                  <CardDescription className="mt-1">API usage breakdown by key</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={apiRequestsByKey} margin={{ top: 20, right: 20, bottom: 60, left: 20 }} barCategoryGap="10%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="key" 
                      stroke="#6b7280"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      fontSize={12}
                      tickFormatter={(value) => value.toLocaleString()}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        color: '#000000'
                      }}
                      formatter={(value: any) => [value.toLocaleString(), "Requests"]}
                    />
                    <Bar 
                      dataKey="requests" 
                      fill="#8b5cf6"
                      radius={[4, 4, 0, 0]}
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <MetricsBarChart
            data={dataApiRequestsData}
            title="Total Data API Request"
            description="Data API usage over the last 15 days"
            color="#10b981"
          />
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Total Data API Request By Endpoint</CardTitle>
                  <CardDescription className="mt-1">Top Data API endpoints by usage</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataApiByEndpoint} margin={{ top: 20, right: 20, bottom: 60, left: 20 }} barCategoryGap="10%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="endpoint" 
                      stroke="#6b7280"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      fontSize={12}
                      tickFormatter={(value) => value.toLocaleString()}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        color: '#000000'
                      }}
                      formatter={(value: any) => [value.toLocaleString(), "Requests"]}
                    />
                    <Bar 
                      dataKey="requests" 
                      fill="#14b8a6"
                      radius={[4, 4, 0, 0]}
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <MetricsBarChart
            data={metricsApiRequestsData}
            title="Total Metrics API Request"
            description="Metrics API usage over the last 15 days"
            color="#f59e0b"
          />
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Total Metrics API Request By Endpoint</CardTitle>
                  <CardDescription className="mt-1">Top Metrics API endpoints by usage</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metricsApiByEndpoint} margin={{ top: 20, right: 20, bottom: 60, left: 20 }} barCategoryGap="10%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="endpoint" 
                      stroke="#6b7280"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      fontSize={12}
                      tickFormatter={(value) => value.toLocaleString()}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        color: '#000000'
                      }}
                      formatter={(value: any) => [value.toLocaleString(), "Requests"]}
                    />
                    <Bar 
                      dataKey="requests" 
                      fill="#ec4899"
                      radius={[4, 4, 0, 0]}
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
            </div>
          </div>
        </SectionErrorBoundary>
      </div>

      {/* Create API Key Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create API Key</DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keyName">Key Name</Label>
                <Input
                  id="keyName"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  placeholder="e.g., Production Key"
                />
                <p className="text-sm text-muted-foreground">
                  Choose a descriptive name to help you identify this key later
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowCreateModal(false)
                setKeyName("")
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateKey}
              disabled={!keyName.trim()}
            >
              Create Key
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageErrorBoundary>
  )
} 