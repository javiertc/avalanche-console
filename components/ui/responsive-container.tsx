import { layoutStyles } from "@/lib/styles";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveContainer({ children, className = "" }: ResponsiveContainerProps) {
  return (
    <div className={`${layoutStyles.pageContainer} ${className}`}>
      {children}
    </div>
  );
} 