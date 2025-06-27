import { LoadingPlaceholder } from "./loading-placeholder";
import { ReactElement } from "react";

interface ChartLoadingProps {
  height: string;
  error?: Error;
  isLoading: boolean;
  children: ReactElement;
}

export function ChartLoading({ height, error, isLoading, children }: ChartLoadingProps) {
  if (isLoading) {
    return <LoadingPlaceholder height={height} />;
  }

  if (error) {
    return (
      <div style={{ height }} className="flex items-center justify-center text-muted-foreground">
        Failed to load data
      </div>
    );
  }

  return children;
} 