import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-4 w-[500px]" />
      </div>

      {/* Slider skeleton */}
      <Skeleton className="h-56 w-full rounded-lg" />

      {/* Base URL section skeleton */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="rounded-md border">
          <div className="flex items-center justify-between p-4 bg-muted/50">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>

      {/* Metrics and Code Examples skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-[400px] w-full rounded-lg" />
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>
    </div>
  )
} 