import {
  Home,
  Database,
  Webhook,
  BarChart3,
  Droplets,
  Server,
  MessageSquare,
  Coins,
} from "lucide-react";

export const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Data API", href: "/data-api", icon: Database },
  { name: "Webhooks API", href: "/webhooks-api", icon: Webhook },
  { name: "Metrics API", href: "/metrics-api", icon: BarChart3 },
  { name: "Faucet", href: "/faucet", icon: Droplets },
  { name: "RPCs", href: "/rpcs", icon: Server },
  { name: "ICM Messenger", href: "/icm-messenger", icon: MessageSquare },
  { name: "ICTT Token Manager", href: "/ictt-token-manager", icon: Coins },
]; 