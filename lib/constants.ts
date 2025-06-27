// Chart configuration
export const CHART_COLORS = {
  primary: "hsl(var(--chart-1))",
  secondary: "hsl(var(--chart-2))",
  tertiary: "hsl(var(--chart-3))",
  quaternary: "hsl(var(--chart-4))",
} as const;

// API configuration
export const API_ENDPOINTS = {
  ANALYTICS_USAGE: "/api/analytics/usage",
  ANALYTICS_ENDPOINTS: "/api/analytics/endpoints",
} as const;

// Toast configuration
export const TOAST_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 10000,
} as const;

// Breakpoints (should match Tailwind config)
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
} as const;

// Animation durations
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 200,
  SLOW: 300,
} as const; 