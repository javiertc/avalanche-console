import { ArrowRight, Zap } from "lucide-react";
import { EnhancedCard, EnhancedCardContent, EnhancedCardDescription, EnhancedCardHeader, EnhancedCardTitle } from "@/components/ui/enhanced-card";
import { quickActions } from "@/constants/dashboard";
import { layoutStyles } from "@/lib/styles";

export function QuickActions() {
  return (
    <div className="space-geist">
      <h2 className={`${layoutStyles.sectionTitle} flex items-center gap-3`}>
        <Zap className="h-6 w-6 animate-pulse" />
        Quick Actions
      </h2>
      <div className={layoutStyles.quickActionsGrid}>
        {quickActions.map((action, index) => (
          <EnhancedCard 
            key={index} 
            variant="hover" 
            className="group cursor-pointer transition-shadow duration-300 hover:shadow-md animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <a href={action.href} className="block h-full">
              <EnhancedCardHeader>
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
                  <action.icon className="h-5 w-5 transition-all duration-300 group-hover:scale-105" />
                </div>
                <EnhancedCardTitle className="group-hover:text-foreground transition-colors duration-300">
                  {action.title}
                </EnhancedCardTitle>
                <EnhancedCardDescription className="line-clamp-2 transition-colors duration-300">
                  {action.description}
                </EnhancedCardDescription>
              </EnhancedCardHeader>
              <EnhancedCardContent>
                <div className="flex items-center text-copy-14 text-foreground transition-all duration-300 font-medium group-hover:text-primary group-hover:translate-x-1">
                  <span className="transition-all duration-300 group-hover:font-semibold">Get started</span>
                  <ArrowRight className="h-4 w-4 ml-1 transition-all duration-300 group-hover:scale-105 group-hover:translate-x-1" />
                </div>
              </EnhancedCardContent>
            </a>
          </EnhancedCard>
        ))}
      </div>
    </div>
  );
} 