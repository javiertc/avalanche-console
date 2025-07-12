import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderHook, act } from '@testing-library/react';
import { AsyncForm, useAsyncForm } from '../AsyncForm';

describe('AsyncForm', () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children and submit button', () => {
    render(
      <AsyncForm onSubmit={mockSubmit}>
        <input name="test" defaultValue="value" />
      </AsyncForm>
    );

    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.getByDisplayValue('value')).toBeInTheDocument();
  });

  it('should handle successful form submission', async () => {
    const user = userEvent.setup();
    mockSubmit.mockResolvedValueOnce(undefined);

    render(
      <AsyncForm onSubmit={mockSubmit}>
        <input name="username" defaultValue="testuser" />
      </AsyncForm>
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    const formData = mockSubmit.mock.calls[0][0];
    expect(formData.get('username')).toBe('testuser');

    await waitFor(() => {
      expect(screen.getByText('Form submitted successfully!')).toBeInTheDocument();
    });

    // Success message should disappear after 3 seconds
    await waitFor(() => {
      expect(screen.queryByText('Form submitted successfully!')).not.toBeInTheDocument();
    }, { timeout: 4000 });
  });

  it('should handle form submission error', async () => {
    const user = userEvent.setup();
    mockSubmit.mockRejectedValueOnce(new Error('Network error'));

    render(
      <AsyncForm onSubmit={mockSubmit}>
        <input name="test" />
      </AsyncForm>
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });

    // Error can be dismissed
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByText('Network error')).not.toBeInTheDocument();
  });

  it('should show loading state during submission', async () => {
    const user = userEvent.setup();
    let resolveSubmit: () => void;
    const submitPromise = new Promise<void>(resolve => {
      resolveSubmit = resolve;
    });
    mockSubmit.mockReturnValueOnce(submitPromise);

    render(
      <AsyncForm onSubmit={mockSubmit} loadingText="Processing...">
        <input name="test" />
      </AsyncForm>
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('Processing...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();

    act(() => {
      resolveSubmit!();
    });

    await waitFor(() => {
      expect(screen.queryByText('Processing...')).not.toBeInTheDocument();
    });
  });

  it('should reset form on success when resetOnSuccess is true', async () => {
    const user = userEvent.setup();
    mockSubmit.mockResolvedValueOnce(undefined);

    render(
      <AsyncForm onSubmit={mockSubmit} resetOnSuccess>
        <input name="field" />
      </AsyncForm>
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'test value');
    expect(input).toHaveValue('test value');

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('should use custom button text', () => {
    render(
      <AsyncForm onSubmit={mockSubmit} submitButtonText="Send Form">
        <input name="test" />
      </AsyncForm>
    );

    expect(screen.getByRole('button', { name: 'Send Form' })).toBeInTheDocument();
  });

  it('should handle disabled state', () => {
    render(
      <AsyncForm onSubmit={mockSubmit} disabled>
        <input name="test" />
      </AsyncForm>
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should apply custom className', () => {
    render(
      <AsyncForm onSubmit={mockSubmit} className="custom-form-class">
        <input name="test" />
      </AsyncForm>
    );

    const form = screen.getByRole('button').closest('form');
    expect(form).toHaveClass('custom-form-class');
  });

  it('should prevent multiple submissions while loading', async () => {
    const user = userEvent.setup();
    mockSubmit.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(
      <AsyncForm onSubmit={mockSubmit}>
        <input name="test" />
      </AsyncForm>
    );

    const button = screen.getByRole('button');
    
    await user.click(button);
    await user.click(button); // Try to click again while loading

    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
});

describe('useAsyncForm', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useAsyncForm());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.isSuccess).toBe(false);
  });

  it('should set loading state', () => {
    const { result } = renderHook(() => useAsyncForm());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.isSuccess).toBe(false);
  });

  it('should set error state and clear loading', () => {
    const { result } = renderHook(() => useAsyncForm());

    act(() => {
      result.current.setLoading(true);
    });

    act(() => {
      result.current.setError('Something went wrong');
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Something went wrong');
    expect(result.current.isSuccess).toBe(false);
  });

  it('should set success state and clear loading', () => {
    const { result } = renderHook(() => useAsyncForm());

    act(() => {
      result.current.setLoading(true);
    });

    act(() => {
      result.current.setSuccess(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.isSuccess).toBe(true);
  });

  it('should reset all states', () => {
    const { result } = renderHook(() => useAsyncForm());

    act(() => {
      result.current.setError('Error');
      result.current.setSuccess(true);
      result.current.setLoading(true);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.isSuccess).toBe(false);
  });
}); 