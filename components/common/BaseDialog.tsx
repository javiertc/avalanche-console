import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  showDefaultFooter?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function BaseDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className = "sm:max-w-2xl",
  showDefaultFooter = true,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel"
}: BaseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`bg-card border-border ${className}`}>
        <DialogHeader className="pb-2 border-b border-border">
          <DialogTitle className="text-base font-bold text-foreground">{title}</DialogTitle>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </DialogHeader>

        <div className="py-3">{children}</div>

        {(footer || showDefaultFooter) && (
          <div className="flex justify-end space-x-2 pt-2 border-t border-border">
            {footer || (
              <>
                <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
                  {cancelText}
                </Button>
                {onConfirm && (
                  <Button size="sm" onClick={onConfirm} className="bg-foreground text-background hover:bg-foreground/90">
                    {confirmText}
                  </Button>
                )}
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 