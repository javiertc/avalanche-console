import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckCircle, XCircle, AlertCircle, Clock, Zap } from "lucide-react"

export interface StatusIndicatorProps {
  status: "success" | "error" | "warning" | "pending" | "active"
  children?: React.ReactNode
  className?: string
  showIcon?: boolean
  animated?: boolean
}

const statusConfig = {
  success: {
    color: "bg-green-500",
    textColor: "text-green-600",
    icon: CheckCircle,
    label: "Success"
  },
  error: {
    color: "bg-red-500",
    textColor: "text-red-600",
    icon: XCircle,
    label: "Error"
  },
  warning: {
    color: "bg-yellow-500",
    textColor: "text-yellow-600",
    icon: AlertCircle,
    label: "Warning"
  },
  pending: {
    color: "bg-gray-400",
    textColor: "text-gray-600",
    icon: Clock,
    label: "Pending"
  },
  active: {
    color: "bg-blue-500",
    textColor: "text-blue-600",
    icon: Zap,
    label: "Active"
  }
}

export function StatusIndicator({ 
  status, 
  children, 
  className, 
  showIcon = false, 
  animated = true 
}: StatusIndicatorProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex items-center">
        <div
          className={cn(
            "w-3 h-3 rounded-full border border-white/20 shadow-sm",
            config.color,
            animated && status === "active" && "animate-pulse"
          )}
        />
        {animated && status === "active" && (
          <div className={cn(
            "absolute inset-0 w-3 h-3 rounded-full animate-ping",
            config.color,
            "opacity-75"
          )} />
        )}
      </div>
      
      {showIcon && (
        <Icon className={cn("h-4 w-4", config.textColor)} />
      )}
      
      {children && (
        <span className={cn("text-sm font-medium", config.textColor)}>
          {children}
        </span>
      )}
    </div>
  )
}

export function StatusBadge({ status, className, ...props }: StatusIndicatorProps) {
  const config = statusConfig[status]
  
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        "bg-gray-100 border border-border",
        config.textColor,
        className
      )}
      {...props}
    >
      <StatusIndicator status={status} animated={status === "active"} />
      {config.label}
    </div>
  )
} 