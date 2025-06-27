import { useState, useCallback } from 'react'

interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => string | null
}

interface ValidationRules {
  [key: string]: ValidationRule
}

interface FormErrors {
  [key: string]: string | null
}

interface UseFormValidationReturn {
  errors: FormErrors
  validate: (field: string, value: any) => string | null
  validateAll: (values: Record<string, any>) => boolean
  clearError: (field: string) => void
  clearAllErrors: () => void
}

export function useFormValidation(rules: ValidationRules): UseFormValidationReturn {
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = useCallback((field: string, value: any): string | null => {
    const rule = rules[field]
    if (!rule) return null

    // Required validation
    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return `${field} is required`
    }

    // Skip other validations if value is empty and not required
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return null
    }

    // String validations
    if (typeof value === 'string') {
      if (rule.minLength && value.length < rule.minLength) {
        return `${field} must be at least ${rule.minLength} characters`
      }

      if (rule.maxLength && value.length > rule.maxLength) {
        return `${field} must be no more than ${rule.maxLength} characters`
      }

      if (rule.pattern && !rule.pattern.test(value)) {
        return `${field} format is invalid`
      }
    }

    // Custom validation
    if (rule.custom) {
      return rule.custom(value)
    }

    return null
  }, [rules])

  const validateField = useCallback((field: string, value: any) => {
    const error = validate(field, value)
    setErrors(prev => ({ ...prev, [field]: error }))
    return error
  }, [validate])

  const validateAll = useCallback((values: Record<string, any>): boolean => {
    const newErrors: FormErrors = {}
    let hasErrors = false

    Object.keys(rules).forEach(field => {
      const error = validate(field, values[field])
      newErrors[field] = error
      if (error) hasErrors = true
    })

    setErrors(newErrors)
    return !hasErrors
  }, [rules, validate])

  const clearError = useCallback((field: string) => {
    setErrors(prev => ({ ...prev, [field]: null }))
  }, [])

  const clearAllErrors = useCallback(() => {
    setErrors({})
  }, [])

  return {
    errors,
    validate: validateField,
    validateAll,
    clearError,
    clearAllErrors
  }
} 