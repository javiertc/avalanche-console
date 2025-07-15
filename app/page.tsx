"use client"

import HomePage from "@/home"
import { PageErrorBoundary } from "@/components/ui/error-boundary"

export default function Page() {
  return (
    <PageErrorBoundary name="HomePage">
      <HomePage />
    </PageErrorBoundary>
  )
}
