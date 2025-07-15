import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      // DOM Element Matchers
      toBeInTheDocument(): R
      toBeVisible(): R
      toBeEmptyDOMElement(): R
      toHaveTextContent(text: string | RegExp): R
      toHaveAccessibleName(name?: string | RegExp): R
      toHaveAccessibleDescription(description?: string | RegExp): R
      
      // Attribute Matchers
      toHaveClass(className: string): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveStyle(style: string | Record<string, any>): R
      
      // Form Element Matchers
      toHaveValue(value: string | number | string[]): R
      toHaveDisplayValue(value: string | RegExp | Array<string | RegExp>): R
      toBeChecked(): R
      toBePartiallyChecked(): R
      toHaveFormValues(values: Record<string, any>): R
      
      // State Matchers
      toBeDisabled(): R
      toBeEnabled(): R
      toBeRequired(): R
      toBeInvalid(): R
      toBeValid(): R
      toHaveFocus(): R
      
      // Additional Matchers
      toHaveErrorMessage(message?: string | RegExp): R
      toHaveDescription(description?: string | RegExp): R
      toBeExpanded(): R
      toBeCollapsed(): R
      toBeSelected(): R
    }
  }
}