"use client"

import { useState, useCallback, useEffect, memo } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { useAsyncForm } from "@/components/forms/AsyncForm"

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
}

export const FeedbackModal = memo(function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("")
  const { isLoading, error, setLoading, setError, setSuccess } = useAsyncForm()

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleSubmit = useCallback(async () => {
    if (!feedback.trim()) {
      toast({
        title: "Please enter your feedback",
        description: "We'd love to hear your thoughts!",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast({
        title: "Thank you for your feedback!",
        description: "We appreciate you taking the time to share your thoughts.",
      })
      
      setFeedback("")
      setSuccess(true)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit feedback')
    }
  }, [feedback, setLoading, setError, setSuccess, onClose])

  const handleBackdropClick = useCallback((event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }, [onClose])

  const handleFeedbackChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(event.target.value)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-background rounded-lg shadow-lg w-full max-w-2xl mx-4 p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 
            id="feedback-modal-title"
            className="text-2xl font-semibold text-foreground"
          >
            What can we do to improve?
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-accent"
            aria-label="Close feedback modal"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <Textarea
            placeholder="Whether it's good, bad, or you're just saying hey - we'd love to hear your thoughts!"
            value={feedback}
            onChange={handleFeedbackChange}
            className="min-h-[120px] resize-none text-base"
            disabled={isLoading}
            aria-label="Feedback message"
          />
          
          {/* Error Display */}
          {error && (
            <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 p-3 rounded-md border border-red-200 dark:border-red-500/20">
              {error}
            </div>
          )}
          
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !feedback.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2 disabled:opacity-50 dark:bg-primary dark:hover:bg-primary/80"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}) 