import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { systemStatus } from "@/constants/dashboard";

export function SystemStatus() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {systemStatus.map((service, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{service.name}</span>
              <Badge
                variant={service.status === "Operational" ? "secondary" : "destructive"}
                className={service.status === "Operational" ? "bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-400"}
              >
                {service.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 