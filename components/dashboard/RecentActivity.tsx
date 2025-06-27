import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getStatusColor, getStatusBg } from "@/lib/status-utils";

interface ActivityItem {
  type: "api_key" | "faucet" | "webhook" | "rpc";
  title: string;
  description: string;
  timestamp: string;
  status: "success" | "error" | "info";
}

const recentActivity: ActivityItem[] = [
  {
    type: "api_key",
    title: "API Key Created",
    description: "my-dev key created",
    timestamp: "2 hours ago",
    status: "success",
  },
  {
    type: "faucet",
    title: "Faucet Request",
    description: "2 AVAX sent to 0x71C7...976F",
    timestamp: "5 hours ago",
    status: "success",
  },
  {
    type: "webhook",
    title: "Webhook Delivery",
    description: "Transaction Monitor webhook failed",
    timestamp: "1 day ago",
    status: "error",
  },
  {
    type: "rpc",
    title: "RPC Usage",
    description: "1,234 requests to mainnet endpoint",
    timestamp: "1 day ago",
    status: "info",
  },
];

export function RecentActivity() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          Recent Activity
        </CardTitle>
        <CardDescription>Your latest interactions with the developer console</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${getStatusBg(activity.status)}`}>
                <div className={`w-full h-full rounded-full ${getStatusColor(activity.status)} opacity-60`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 