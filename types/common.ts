// Common type definitions for improved type safety

// Form field value types
export type FormFieldValue = string | number | boolean | Date | null | undefined;

// API response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

// Pagination types
export interface PaginationParams {
  page: number;
  pageSize: number;
  total?: number;
}

// Common status types
export type Status = 'idle' | 'loading' | 'success' | 'error';

// API error types
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

// Common action types for reducers and state management
export interface Action<T extends string, P = undefined> {
  type: T;
  payload: P;
}

// Utility type for making all properties optional recursively
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Type guard for checking if a value is not null or undefined
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

// Type for async function results
export type AsyncResult<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

// Common callback types
export type VoidCallback = () => void;
export type AsyncVoidCallback = () => Promise<void>;
export type ValueCallback<T> = (value: T) => void;
export type AsyncValueCallback<T> = (value: T) => Promise<void>;

// Type for React component props with children
export interface WithChildren {
  children: React.ReactNode;
}

// Type for className prop
export interface WithClassName {
  className?: string;
}

// Combined type for components that accept both
export type ComponentBaseProps = WithChildren & WithClassName;

// Type for option items in selects/dropdowns
export interface SelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

// Type for table/list sorting
export interface SortConfig<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}

// Type for filters
export interface FilterConfig<T> {
  field: keyof T;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte';
  value: unknown;
} 