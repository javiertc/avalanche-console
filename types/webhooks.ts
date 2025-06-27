export interface Chain {
  value: string;
  label: string;
}

export interface EventType {
  value: string;
  label: string;
}

export interface Webhook {
  id: string;
  name: string;
  url: string;
  chainId: string;
  eventType: string;
  addresses: string[];
  eventSignatures: string[];
  status: "active" | "inactive";
  created: string;
  lastDelivery: string;
  deliveryStatus: "success" | "failed" | "pending";
  includeInternalTx: boolean;
  includeLogs: boolean;
}

export interface DeliveryLog {
  id: string;
  webhook: string;
  event: string;
  timestamp: string;
  status: "success" | "failed" | "pending";
  responseCode: number;
  responseTime: string;
} 