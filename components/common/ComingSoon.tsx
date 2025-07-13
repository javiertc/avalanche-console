import React from 'react';

interface ComingSoonProps {
  title?: string;
  description?: string;
  className?: string;
}

export function ComingSoon({ 
  title = "Coming Soon",
  description = "This feature is currently in development",
  className = ""
}: ComingSoonProps) {
  return (
    <div className={`text-center py-20 ${className}`}>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">
        {title}
      </h1>
      <p className="text-xl text-muted-foreground">
        {description}
      </p>
    </div>
  );
} 