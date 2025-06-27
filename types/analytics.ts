import { LucideIcon } from 'lucide-react';

export interface ApiUsageData {
  date: string;
  dataApi: number;
  rpc: number;
  webhooks: number;
  total: number;
}

export interface EndpointUsageData {
  name: string;
  value: number;
  color: string;
}

export interface UsageStats {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface QuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export interface SystemStatus {
  name: string;
  status: 'Operational' | 'Degraded' | 'Down';
} 