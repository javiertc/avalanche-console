import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CopyButton } from '../CopyButton'

// Mock the clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
})

// Mock the toast function
jest.mock('@/hooks/use-toast', () => ({
  toast: jest.fn(),
}))

describe('CopyButton', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders with default props', () => {
    render(<CopyButton text="test text" />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('copies text to clipboard on click', async () => {
    const textToCopy = 'Hello, World!'
    render(<CopyButton text={textToCopy} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(textToCopy)
    })
  })

  it('shows success toast after copying', async () => {
    const { toast } = await import('@/hooks/use-toast')
    render(<CopyButton text="test" successMessage="Custom success message" />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: "Success",
        description: "Custom success message",
      })
    })
  })

  it('shows error toast when copying fails', async () => {
    const { toast } = await import('@/hooks/use-toast')
    
    // Mock clipboard.writeText to throw an error
    navigator.clipboard.writeText = jest.fn().mockRejectedValue(new Error('Failed'))
    
    render(<CopyButton text="test" />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      })
    })
  })

  it('applies custom className', () => {
    render(<CopyButton text="test" className="custom-class" />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('renders with different variants', () => {
    const { rerender } = render(<CopyButton text="test" variant="outline" />)
    let button = screen.getByRole('button')
    expect(button).toHaveClass('border-input')

    rerender(<CopyButton text="test" variant="ghost" />)
    button = screen.getByRole('button')
    expect(button).toHaveClass('hover:bg-accent')
  })
}) 