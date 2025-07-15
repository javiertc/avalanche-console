import { toast as sonnerToast } from "sonner"

export interface ToastProps {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  action?: {
    label: string
    onClick: () => void
  }
  duration?: number
  className?: string
}

export interface Toast extends ToastProps {
  id: string
}

export function useToast() {
  const toast = ({ title, description, variant = "default", action }: ToastProps) => {
    if (variant === "destructive") {
      sonnerToast.error(title || "Error", {
        description,
        action: action ? {
          label: action.label,
          onClick: action.onClick,
        } : undefined,
      })
    } else {
      sonnerToast.success(title || "Success", {
        description,
        action: action ? {
          label: action.label,
          onClick: action.onClick,
        } : undefined,
      })
    }
  }

  // For compatibility with existing toast components
  const toasts: Toast[] = []

  return { toast, toasts }
}

// Export the toast function directly for backward compatibility
export const toast = ({ title, description, variant = "default", action }: ToastProps) => {
  if (variant === "destructive") {
    sonnerToast.error(title || "Error", {
      description,
      action: action ? {
        label: action.label,
        onClick: action.onClick,
      } : undefined,
    })
  } else {
    sonnerToast.success(title || "Success", {
      description,
      action: action ? {
        label: action.label,
        onClick: action.onClick,
      } : undefined,
    })
  }
}