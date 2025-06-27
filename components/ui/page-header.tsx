import { layoutStyles } from "@/lib/styles";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className = "mb-6 lg:mb-8" }: PageHeaderProps) {
  return (
    <div className={className}>
      <h1 className="text-heading-32 text-foreground mb-2">{title}</h1>
      {description && (
        <p className="text-copy-16 text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
} 