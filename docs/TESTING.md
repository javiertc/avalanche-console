# Testing Guidelines

## Overview

This document outlines the testing standards and best practices for the Avalanche Console application. Our testing strategy focuses on reliability, maintainability, and comprehensive coverage while avoiding brittle tests.

## Testing Philosophy

- **Test behavior, not implementation**: Focus on what the component does, not how it does it
- **User-centric testing**: Test from the user's perspective using semantic queries
- **Maintainable tests**: Write tests that are resilient to refactoring
- **Fast feedback**: Optimize for quick test execution and clear error messages

## Test Structure

### Directory Organization

```
__tests__/
├── utils/
│   ├── test-utils.tsx      # Custom render functions and helpers
│   └── api-test-utils.ts   # API route testing utilities
├── components/
│   └── [component-name]/
│       └── __tests__/
│           └── [component-name].test.tsx
├── hooks/
│   └── __tests__/
│       └── [hook-name].test.ts
├── lib/
│   └── __tests__/
│       └── [utility-name].test.ts
└── app/
    └── api/
        └── [route]/
            └── route.test.ts
```

## Component Testing

### Basic Component Test Structure

```typescript
import { render, screen } from '@/__tests__/utils/test-utils'
import { ComponentName } from '../ComponentName'

describe('ComponentName', () => {
  it('should render with required props', () => {
    render(<ComponentName requiredProp="value" />)
    
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('should handle user interactions', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()
    
    render(<ComponentName onClick={handleClick} />)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Query Priority

Use queries in this order of preference:

1. **Accessible queries** (preferred)
   - `getByRole()`
   - `getByLabelText()`
   - `getByPlaceholderText()`
   - `getByText()`

2. **Semantic queries**
   - `getByDisplayValue()`
   - `getByAltText()`
   - `getByTitle()`

3. **Test ID queries** (last resort)
   - `getByTestId()`

### Handling Multiple Elements

When multiple elements have the same text/content:

```typescript
// ❌ Don't do this
const badge = screen.getByText('Operational') // Fails if multiple exist

// ✅ Do this instead
const badges = screen.getAllByText('Operational')
expect(badges).toHaveLength(3)
expect(badges[0]).toBeInTheDocument()

// Or find a specific one
const operationalBadge = badges.find(badge => 
  badge.closest('[data-service="api"]')
)
```

### Testing Component Styling

Focus on functional CSS classes, not implementation details:

```typescript
// ❌ Avoid testing specific Tailwind classes
expect(element).toHaveClass('bg-green-100 text-green-800')

// ✅ Test semantic classes or behavior
expect(element).toHaveClass('status-success')
// Or test the visual result
expect(element).toHaveStyle({ backgroundColor: 'green' })
```

## Hook Testing

### Basic Hook Test Structure

```typescript
import { renderHook, act } from '@testing-library/react'
import { useCustomHook } from '../useCustomHook'

describe('useCustomHook', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useCustomHook())
    
    expect(result.current.value).toBe(initialValue)
  })

  it('should handle state updates', () => {
    const { result } = renderHook(() => useCustomHook())
    
    act(() => {
      result.current.updateValue('new value')
    })
    
    expect(result.current.value).toBe('new value')
  })
})
```

### Testing Async Hooks

```typescript
it('should handle async operations', async () => {
  const { result } = renderHook(() => useAsyncHook())
  
  expect(result.current.loading).toBe(true)
  
  // Wait for async operation to complete
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  
  expect(result.current.loading).toBe(false)
  expect(result.current.data).toBeDefined()
})
```

## API Route Testing

### Basic API Route Test

```typescript
import { GET } from './route'
import { createMockNextRequest } from '@/__tests__/utils/api-test-utils'

describe('API Route', () => {
  it('should return expected data', async () => {
    const mockRequest = createMockNextRequest('http://localhost:3000/api/test')
    
    const response = await GET(mockRequest)
    
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('success', true)
  })
})
```

### Testing Different HTTP Methods

```typescript
import { GET, POST, PUT, DELETE } from './route'
import { createMockNextRequest, createAuthHeaders } from '@/__tests__/utils/api-test-utils'

describe('CRUD API Route', () => {
  it('should handle GET requests', async () => {
    const request = createMockNextRequest('http://localhost:3000/api/items')
    const response = await GET(request)
    expect(response.status).toBe(200)
  })

  it('should handle POST requests with authentication', async () => {
    const request = createMockNextRequest('http://localhost:3000/api/items', {
      method: 'POST',
      headers: createAuthHeaders('test-token'),
      body: { name: 'Test Item' }
    })
    
    const response = await POST(request)
    expect(response.status).toBe(201)
  })
})
```

## Mocking Guidelines

### Mocking External Dependencies

```typescript
// Mock at the module level
jest.mock('@/lib/api', () => ({
  apiService: {
    get: jest.fn(),
    post: jest.fn(),
  }
}))

// Import the mocked module
import { apiService } from '@/lib/api'

describe('Component with API calls', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(apiService.get as jest.Mock).mockResolvedValue({ data: 'test' })
  })
})
```

### Using Test Utilities

```typescript
import { createMockApiService, mockUser } from '@/__tests__/utils/test-utils'

describe('Component', () => {
  it('should work with mock data', () => {
    const mockApi = createMockApiService()
    const testUser = mockUser.create({ name: 'John Doe' })
    
    // Use in your test
  })
})
```

## Accessibility Testing

### Basic Accessibility Tests

```typescript
import { render, screen } from '@/__tests__/utils/test-utils'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Component Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Component />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have proper ARIA attributes', () => {
    render(<Button aria-label="Close dialog">×</Button>)
    
    expect(screen.getByRole('button')).toHaveAccessibleName('Close dialog')
  })
})
```

## Performance Testing

### Testing Component Performance

```typescript
import { render } from '@/__tests__/utils/test-utils'
import { performance } from 'perf_hooks'

describe('Component Performance', () => {
  it('should render within acceptable time', () => {
    const start = performance.now()
    
    render(<ExpensiveComponent data={largeDataSet} />)
    
    const end = performance.now()
    expect(end - start).toBeLessThan(100) // 100ms threshold
  })
})
```

## Common Patterns

### Testing Forms

```typescript
import { render, screen } from '@/__tests__/utils/test-utils'
import userEvent from '@testing-library/user-event'

describe('Form Component', () => {
  it('should submit form with valid data', async () => {
    const handleSubmit = jest.fn()
    const user = userEvent.setup()
    
    render(<Form onSubmit={handleSubmit} />)
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.click(screen.getByRole('button', { name: /submit/i }))
    
    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com'
    })
  })
})
```

### Testing Error States

```typescript
describe('Error Handling', () => {
  it('should display error message when API fails', async () => {
    ;(apiService.get as jest.Mock).mockRejectedValue(new Error('API Error'))
    
    render(<ComponentWithAPI />)
    
    await waitFor(() => {
      expect(screen.getByText(/error occurred/i)).toBeInTheDocument()
    })
  })
})
```

## Best Practices

### Do's ✅

- Use semantic HTML and ARIA attributes
- Test user workflows, not implementation details
- Use `waitFor` for async operations
- Clean up mocks between tests
- Use descriptive test names
- Group related tests with `describe` blocks
- Test edge cases and error conditions

### Don'ts ❌

- Don't test internal component state directly
- Don't rely on specific CSS class names
- Don't use `setTimeout` in tests (use `waitFor` instead)
- Don't test third-party library functionality
- Don't write tests that depend on specific timing
- Don't mock everything (test real integrations when possible)

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- ComponentName.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="should handle click"
```

### Debugging Tests

```bash
# Run tests with verbose output
npm test -- --verbose

# Run tests with debug information
npm test -- --detectOpenHandles --forceExit

# Run single test file with debugging
node --inspect-brk node_modules/.bin/jest ComponentName.test.tsx --runInBand
```

## Coverage Requirements

- **Minimum Coverage**: 70% for lines, functions, branches, and statements
- **Critical Components**: Aim for 90%+ coverage
- **Utility Functions**: Should have 100% coverage
- **API Routes**: Should test all success and error paths

## Troubleshooting

### Common Issues

1. **"Multiple elements found"**: Use `getAllBy*` queries or add more specific selectors
2. **"Element not found"**: Check if element is rendered asynchronously, use `waitFor`
3. **"Act warnings"**: Wrap state updates in `act()` or use `waitFor`
4. **"Memory leaks"**: Ensure proper cleanup of timers, subscriptions, and mocks

### Getting Help

- Check existing tests for similar patterns
- Review Jest and Testing Library documentation
- Ask team members for code review on complex test scenarios