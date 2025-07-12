import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartLoading } from "./chart-loading";
import { ResponsiveContainer } from "recharts";
import { ReactElement } from "react";

interface ChartContainerProps {
  title: string;
  description?: string;
  height: string;
  isLoading: boolean;
  error?: Error;
  children: ReactElement;
  config?: Record<string, unknown>;
  id?: string;
}

export function ChartContainer({
  title,
  description,
  height,
  isLoading,
  error,
  children,
}: ChartContainerProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartLoading height={height} isLoading={isLoading} error={error}>
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </ChartLoading>
      </CardContent>
    </Card>
  );
} 