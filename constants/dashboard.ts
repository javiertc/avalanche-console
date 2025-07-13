import {
  Code,
  Zap,
  Globe,
  Activity,
} from "lucide-react";
import type { QuickAction, UsageStats, EndpointUsageData, SystemStatus } from "@/types/analytics";

// Navigation items are now imported from the single source of truth
export { navigationItems } from "./navigation";

export const quickActions: QuickAction[] = [
  {
    title: "Get API Keys",
    description: "Create and manage your API keys for Data API access",
    icon: Code,
    href: "/data-api",
  },
  {
    title: "Request Testnet Funds",
    description: "Get AVAX, USDC, and other tokens for development",
    icon: Zap,
    href: "/faucet",
  },
  {
    title: "RPC Endpoints",
    description: "Access free mainnet and testnet RPC endpoints",
    icon: Globe,
    href: "/rpcs",
  },
  {
    title: "Setup Webhooks",
    description: "Configure real-time blockchain event notifications",
    icon: Activity,
    href: "/webhooks-api",
  },
];

export const usageStats: UsageStats[] = [
  { label: "Total Requests (24h)", value: "3,467", change: "+12.3%", trend: "up" },
  { label: "Avg Response Time", value: "156ms", change: "-8.2%", trend: "down" },
  { label: "Error Rate", value: "0.55%", change: "-2.1%", trend: "down" },
  { label: "Active Webhooks", value: "3", change: "0%", trend: "neutral" },
];

export const endpointUsage: EndpointUsageData[] = [
  { name: "Data API", value: 12500, color: "#3B82F6" },
  { name: "RPC Calls", value: 8200, color: "#10B981" },
  { name: "Webhooks", value: 427, color: "#F59E0B" },
  { name: "Faucet", value: 156, color: "#EF4444" },
];

export const systemStatus: SystemStatus[] = [
  { name: "Data API", status: "Operational" },
  { name: "RPC Endpoints", status: "Operational" },
  { name: "Webhooks", status: "Operational" },
  { name: "Faucet", status: "Degraded" },
]; 