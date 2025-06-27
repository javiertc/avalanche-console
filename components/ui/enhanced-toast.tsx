import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react'
import { toast as baseToast } from '@/hooks/use-toast'

interface ToastOptions {
  title: string
  description?: string
  duration?: number
}

export const enhancedToast = {
  success: ({ title, description, duration = 3000 }: ToastOptions) => {
    baseToast({
      title: `✅ ${title}`,
      description,
      duration,
      className: "border-green-200 bg-green-50 text-green-900"
    })
  },

  error: ({ title, description, duration = 5000 }: ToastOptions) => {
    baseToast({
      title: `❌ ${title}`,
      description,
      duration,
      variant: "destructive"
    })
  },

  warning: ({ title, description, duration = 4000 }: ToastOptions) => {
    baseToast({
      title: `⚠️ ${title}`,
      description,
      duration,
      className: "border-yellow-200 bg-yellow-50 text-yellow-900"
    })
  },

  info: ({ title, description, duration = 3000 }: ToastOptions) => {
    baseToast({
      title: `ℹ️ ${title}`,
      description,
      duration,
      className: "border-blue-200 bg-blue-50 text-blue-900"
    })
  }
} 