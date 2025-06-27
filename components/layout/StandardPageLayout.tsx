import React from 'react';
import { layoutStyles } from '@/lib/styles';

interface StandardPageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  headerActions?: React.ReactNode;
  className?: string;
}

export function StandardPageLayout({ 
  children, 
  title, 
  description, 
  headerActions,
  className 
}: StandardPageLayoutProps) {
  return (
    <div className={layoutStyles.pageContainer}>
      {(title || headerActions) && (
        <div className={layoutStyles.pageHeader}>
          <div>
            {title && (
              <h2 className="text-lg font-medium text-foreground">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {headerActions && (
            <div className="flex items-center space-x-2">
              {headerActions}
            </div>
          )}
        </div>
      )}
      <div className={className}>
        {children}
      </div>
    </div>
  );
} 