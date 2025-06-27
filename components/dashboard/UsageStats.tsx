import { TrendingUp } from "lucide-react";
import { EnhancedCard, EnhancedCardContent } from "@/components/ui/enhanced-card";
import { usageStats } from "@/constants/dashboard";
import { layoutStyles } from "@/lib/styles";

export function UsageStats() {
  return (
    <div className={layoutStyles.statsGrid}>
      {usageStats.map((stat, index) => (
        <EnhancedCard key={index} variant="default">
          <EnhancedCardContent className="p-6">
            <div className="space-y-2">
              <p className="text-label-14 text-muted-foreground">{stat.label}</p>
              <p className="text-heading-32 text-foreground">{stat.value}</p>
              <div className="flex items-center gap-1">
                <TrendingUp
                  className={`h-4 w-4 ${
                    stat.trend === "up"
                      ? "text-green-500"
                      : stat.trend === "down"
                        ? "text-red-500"
                        : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`text-label-13 font-medium ${
                    stat.trend === "up"
                      ? "text-green-600"
                      : stat.trend === "down"
                        ? "text-red-600"
                        : "text-muted-foreground"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          </EnhancedCardContent>
        </EnhancedCard>
      ))}
    </div>
  );
} 