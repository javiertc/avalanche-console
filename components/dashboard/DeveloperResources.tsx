import { BookOpen, ExternalLink } from "lucide-react";
import { EnhancedCard, EnhancedCardContent } from "@/components/ui/enhanced-card";

interface Resource {
  title: string;
  description: string;
  href: string;
  external: boolean;
}

const resources: Resource[] = [
  {
    title: "API Documentation",
    description: "Complete guide to using Avalanche APIs",
    href: "#",
    external: true,
  },
  {
    title: "SDK Examples",
    description: "Code examples in multiple languages",
    href: "#",
    external: true,
  },
  {
    title: "Developer Discord",
    description: "Join the community for support",
    href: "#",
    external: true,
  },
  {
    title: "Tutorials",
    description: "Step-by-step guides for common tasks",
    href: "#",
    external: true,
  },
];

export function DeveloperResources() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {resources.map((resource, index) => (
        <EnhancedCard 
          key={index} 
          variant="hover" 
          className="group cursor-pointer transition-shadow duration-300 hover:shadow-md animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <EnhancedCardContent className="p-6">
            <a
              href={resource.href}
              className="block"
              target={resource.external ? "_blank" : undefined}
              rel={resource.external ? "noopener noreferrer" : undefined}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
                    <BookOpen className="h-5 w-5 transition-all duration-300 group-hover:scale-105" />
                  </div>
                  {resource.external && (
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-all duration-300 group-hover:scale-105" />
                  )}
                </div>
                <div>
                  <h3 className="text-heading-16 text-foreground group-hover:text-foreground transition-colors duration-300 group-hover:font-semibold">
                    {resource.title}
                  </h3>
                  <p className="text-copy-14 text-muted-foreground mt-2 transition-colors duration-300">
                    {resource.description}
                  </p>
                </div>
              </div>
            </a>
          </EnhancedCardContent>
        </EnhancedCard>
      ))}
    </div>
  );
} 