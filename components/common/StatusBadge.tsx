import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface StatusBadgeProps {
  status: "active" | "inactive" | "success" | "failed" | "pending" | "error" | "warning" | "info";
  showIcon?: boolean;
  label?: string;
  className?: string;
}

export function StatusBadge({ status, showIcon = false, label, className }: StatusBadgeProps) {
  const getVariant = (status: string) => {
    switch (status) {
      case "active":
      case "success":
        return "default";
      case "inactive":
      case "failed":
      case "error":
        return "destructive";
      case "pending":
      case "warning":
        return "secondary";
      case "info":
        return "outline";
      default:
        return "outline";
    }
  };

  const getIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
      case "warning":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className || ''}`}>
      {showIcon && getIcon(status)}
      <Badge variant={getVariant(status)}>{label || status}</Badge>
    </div>
  );
} 