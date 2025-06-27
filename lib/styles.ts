import { cn } from "./utils";

// Vercel Geist-inspired layout patterns
export const layoutStyles = {
  // Page layouts - Vercel-style spacing
  pageContainer: "w-full min-h-screen flex-1 space-geist p-6 lg:p-8",
  pageHeader: "flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-8", 
  
  // Spacing patterns - Vercel's 4px grid system
  sectionSpacing: "space-geist",
  cardSpacing: "space-geist-sm", 
  fieldSpacing: "space-y-4",
  inputSpacing: "space-y-3",
  
  // Grid layouts - Vercel-style responsive grids
  quickActionsGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6",
  statsGrid: "grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6",
  dashboardGrid: "grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8",
  
  // Common component styles - Vercel's clean aesthetic
  cardContent: "p-6 space-geist-sm",
  tabContent: "p-6 space-geist-sm",
  formGroup: "space-y-3",
  
  // Vercel Geist typography
  pageTitle: "text-heading-48 text-foreground",
  sectionTitle: "text-heading-24 text-foreground",
  cardTitle: "text-heading-20 text-foreground",
  bodyText: "text-copy-14 text-foreground",
  captionText: "text-label-12 text-muted-foreground",
  
  // Vercel-style interactive elements
  button: "text-button-14 font-medium transition-all duration-200 hover-lift focus-ring",
  link: "text-copy-14 text-foreground hover:text-gray-600 transition-colors",
  
  // Vercel-style containers
  card: "bg-card border border-border rounded-lg shadow-geist hover:shadow-geist-hover transition-all duration-200",
  panel: "bg-gray-100 border border-border rounded-lg p-6",
} as const;

// Helper function to get layout class with optional custom className
export const getLayoutClass = (
  key: keyof typeof layoutStyles, 
  customClass?: string
): string => {
  return cn(layoutStyles[key], customClass);
}; 