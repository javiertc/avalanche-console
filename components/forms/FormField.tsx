import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { layoutStyles } from "@/lib/styles";

interface FormFieldProps {
  label: string;
  id: string;
  required?: boolean;
  type?: 'input' | 'select' | 'textarea';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: { value: string; label: string }[];
  className?: string;
  description?: string;
}

export function FormField({
  label,
  id,
  required = false,
  type = 'input',
  placeholder,
  value,
  onChange,
  options = [],
  className,
  description
}: FormFieldProps) {
  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full bg-background text-foreground border-border focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground border-border">
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="focus:bg-accent focus:text-accent-foreground"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'textarea':
        return (
          <Textarea
            id={id}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-background text-foreground border-border placeholder:text-muted-foreground"
          />
        );
      
      default:
        return (
          <Input
            id={id}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-background text-foreground border-border placeholder:text-muted-foreground"
          />
        );
    }
  };

  return (
    <div className={`${layoutStyles.inputSpacing} ${className || ''}`}>
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderInput()}
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
} 