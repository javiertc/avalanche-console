import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from '@/hooks/use-toast'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
  toast({
    title: "Copied to clipboard",
    description: "The content has been copied to your clipboard.",
  })
}
