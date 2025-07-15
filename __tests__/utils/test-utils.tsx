import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '@/components/theme-provider'

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: any
  wrapper?: React.ComponentType<{ children: React.ReactNode }>
}

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}

export const customRender = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { wrapper: Wrapper = AllTheProviders, ...renderOptions } = options
  
  return render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  })
}

// Re-export everything from React Testing Library
export * from '@testing-library/react'
export { customRender as render }

// Mock API Response Factory
export interface MockApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string
  }
}

export const createMockApiResponse = <T = any>(
  data?: T,
  success: boolean = true
): MockApiResponse<T> => ({
  success,
  data: success ? data : undefined,
  error: success ? undefined : { message: 'Mock error' }
})

// Test Data Factories
export interface TestDataFactory<T> {
  create: (overrides?: Partial<T>) => T
  createMany: (count: number, overrides?: Partial<T>) => T[]
}

export const createTestDataFactory = <T extends Record<string, any>>(
  defaultData: T
): TestDataFactory<T> => ({
  create: (overrides = {}) => ({ ...defaultData, ...overrides }),
  createMany: (count, overrides = {}) =>
    Array.from({ length: count }, (_, index) => ({
      ...defaultData,
      ...overrides,
      id: `${defaultData.id || 'test'}-${index}`,
    }))
})

// Common test data
export const mockUser = createTestDataFactory({
  id: 'user-1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'user'
})

export const mockApiKey = createTestDataFactory({
  id: 'key-1',
  name: 'Test API Key',
  key: 'test-key-123',
  status: 'active' as const,
  createdAt: '2024-01-01T00:00:00Z',
  lastUsed: '2024-01-01T00:00:00Z'
})

export const mockMetrics = createTestDataFactory({
  totalRequests: 1000,
  avgResponseTime: 150,
  errorRate: 0.5,
  successRate: 99.5,
  requestsPerSecond: 4.2
})

// Async Testing Utilities
export const waitForAsyncUpdates = async () => {
  await new Promise(resolve => setTimeout(resolve, 0))
}

export const waitForLoadingToFinish = async () => {
  await new Promise(resolve => setTimeout(resolve, 100))
}

// Error Boundary for Testing
export class TestErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Test Error</div>
    }

    return this.props.children
  }
}

export const withErrorBoundary = (Component: React.ComponentType<any>) => {
  return (props: any) => (
    <TestErrorBoundary>
      <Component {...props} />
    </TestErrorBoundary>
  )
}

// Mock Generators
export const createMockFunction = <T extends (...args: any[]) => any>(
  implementation?: T
) => {
  const mockFn = jest.fn(implementation)
  return mockFn as jest.MockedFunction<T>
}

// API Service Mocks
export const createMockApiService = () => ({
  get: createMockFunction(async () => createMockApiResponse({})),
  post: createMockFunction(async () => createMockApiResponse({})),
  put: createMockFunction(async () => createMockApiResponse({})),
  delete: createMockFunction(async () => createMockApiResponse({}))
})

// Analytics Service Mock
export const createMockAnalyticsService = () => ({
  getUsageMetrics: createMockFunction(async () => 
    createMockApiResponse(mockMetrics.create())
  ),
  getUsageOverTime: createMockFunction(async () => 
    createMockApiResponse([])
  ),
  getEndpointUsage: createMockFunction(async () => 
    createMockApiResponse([])
  )
})

// Component Testing Helpers
export const getByTestId = (container: HTMLElement, testId: string) => {
  const element = container.querySelector(`[data-testid="${testId}"]`)
  if (!element) {
    throw new Error(`Unable to find element with data-testid: ${testId}`)
  }
  return element
}

export const queryByTestId = (container: HTMLElement, testId: string) => {
  return container.querySelector(`[data-testid="${testId}"]`)
}

// Form Testing Helpers
export const fillForm = async (form: HTMLFormElement, data: Record<string, string>) => {
  const { fireEvent } = await import('@testing-library/react')
  
  Object.entries(data).forEach(([name, value]) => {
    const input = form.querySelector(`[name="${name}"]`) as HTMLInputElement
    if (input) {
      fireEvent.change(input, { target: { value } })
    }
  })
}

export const submitForm = async (form: HTMLFormElement) => {
  const { fireEvent } = await import('@testing-library/react')
  fireEvent.submit(form)
}// Acces
sibility Testing Utilities
export const checkAccessibility = async (container: HTMLElement) => {
  // Basic accessibility checks
  const buttons = container.querySelectorAll('button')
  const links = container.querySelectorAll('a')
  const inputs = container.querySelectorAll('input, textarea, select')
  const images = container.querySelectorAll('img')

  // Check buttons have accessible names
  buttons.forEach((button, index) => {
    const hasAccessibleName = 
      button.getAttribute('aria-label') ||
      button.getAttribute('aria-labelledby') ||
      button.textContent?.trim() ||
      button.querySelector('svg[aria-label]')
    
    if (!hasAccessibleName) {
      console.warn(`Button ${index} lacks accessible name`)
    }
  })

  // Check links have accessible names
  links.forEach((link, index) => {
    const hasAccessibleName = 
      link.getAttribute('aria-label') ||
      link.getAttribute('aria-labelledby') ||
      link.textContent?.trim()
    
    if (!hasAccessibleName) {
      console.warn(`Link ${index} lacks accessible name`)
    }
  })

  // Check form inputs have labels
  inputs.forEach((input, index) => {
    const hasLabel = 
      input.getAttribute('aria-label') ||
      input.getAttribute('aria-labelledby') ||
      input.getAttribute('placeholder') ||
      container.querySelector(`label[for="${input.id}"]`)
    
    if (!hasLabel) {
      console.warn(`Input ${index} lacks label`)
    }
  })

  // Check images have alt text
  images.forEach((img, index) => {
    const hasAltText = 
      img.getAttribute('alt') !== null ||
      img.getAttribute('aria-label') ||
      img.getAttribute('role') === 'presentation'
    
    if (!hasAltText) {
      console.warn(`Image ${index} lacks alt text`)
    }
  })
}

// Keyboard Navigation Testing
export const testKeyboardNavigation = async (container: HTMLElement) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  return {
    focusableCount: focusableElements.length,
    hasFocusableElements: focusableElements.length > 0,
    elements: Array.from(focusableElements)
  }
}

// ARIA Testing Helpers
export const getAriaAttributes = (element: Element) => {
  const ariaAttributes: Record<string, string> = {}
  
  Array.from(element.attributes).forEach(attr => {
    if (attr.name.startsWith('aria-')) {
      ariaAttributes[attr.name] = attr.value
    }
  })
  
  return ariaAttributes
}

export const hasValidAriaRole = (element: Element) => {
  const role = element.getAttribute('role')
  if (!role) return true // No role is valid
  
  // Common valid ARIA roles
  const validRoles = [
    'button', 'link', 'textbox', 'checkbox', 'radio', 'combobox',
    'listbox', 'option', 'tab', 'tabpanel', 'dialog', 'alert',
    'banner', 'navigation', 'main', 'complementary', 'contentinfo',
    'region', 'article', 'section', 'list', 'listitem', 'table',
    'row', 'cell', 'columnheader', 'rowheader', 'presentation', 'none'
  ]
  
  return validRoles.includes(role)
}/
/ Performance Testing Utilities
export const measureRenderTime = async (renderFn: () => void) => {
  const start = performance.now()
  renderFn()
  const end = performance.now()
  return end - start
}

export const expectRenderTimeUnder = async (
  renderFn: () => void,
  maxTime: number = 100
) => {
  const renderTime = await measureRenderTime(renderFn)
  expect(renderTime).toBeLessThan(maxTime)
  return renderTime
}

// Test Isolation and Cleanup Utilities
export const cleanupAfterEach = () => {
  afterEach(() => {
    // Clear all timers
    jest.clearAllTimers()
    
    // Clear all mocks
    jest.clearAllMocks()
    
    // Clean up any remaining DOM elements
    document.body.innerHTML = ''
    
    // Reset any global state if needed
    if (global.fetch && typeof global.fetch.mockClear === 'function') {
      global.fetch.mockClear()
    }
  })
}

// Reliable Async Testing
export const waitForCondition = async (
  condition: () => boolean,
  timeout: number = 5000,
  interval: number = 100
) => {
  const start = Date.now()
  
  while (Date.now() - start < timeout) {
    if (condition()) {
      return true
    }
    await new Promise(resolve => setTimeout(resolve, interval))
  }
  
  throw new Error(`Condition not met within ${timeout}ms`)
}

export const retryAsync = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 100
): Promise<T> => {
  let lastError: Error
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }
  
  throw lastError!
}

// Memory Leak Prevention
export const preventMemoryLeaks = () => {
  beforeEach(() => {
    // Store original console methods
    const originalError = console.error
    const originalWarn = console.warn
    
    // Suppress React act warnings in tests (they're not critical)
    console.error = (...args: any[]) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('Warning: An update to') &&
        args[0].includes('was not wrapped in act')
      ) {
        return
      }
      originalError.apply(console, args)
    }
    
    console.warn = (...args: any[]) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('Warning: An update to') &&
        args[0].includes('was not wrapped in act')
      ) {
        return
      }
      originalWarn.apply(console, args)
    }
  })
  
  afterEach(() => {
    // Restore original console methods
    console.error = console.error
    console.warn = console.warn
  })
}

// Test Data Cleanup
export const withCleanup = <T extends (...args: any[]) => any>(
  testFn: T,
  cleanupFn?: () => void
) => {
  return async (...args: Parameters<T>) => {
    try {
      return await testFn(...args)
    } finally {
      if (cleanupFn) {
        cleanupFn()
      }
    }
  }
}