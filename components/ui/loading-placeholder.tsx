interface LoadingPlaceholderProps {
  height?: string;
  className?: string;
}

export function LoadingPlaceholder({ height = "200px", className }: LoadingPlaceholderProps) {
  return (
    <div
      className={`animate-pulse bg-muted rounded-lg ${className}`}
      style={{ height }}
    />
  );
} 