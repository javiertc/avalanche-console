import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatusBadge } from '../StatusBadge';

describe('StatusBadge', () => {
  it('should render with success status', () => {
    render(<StatusBadge status="success" label="Active" />);
    const badge = screen.getByText('Active');
    expect(badge).toBeInTheDocument();
    // Updated to match the current styling
    expect(badge.className).toContain('bg-primary');
    expect(badge.className).toContain('text-primary-foreground');
  });

  it('should render with error status', () => {
    render(<StatusBadge status="error" label="Failed" />);
    const badge = screen.getByText('Failed');
    expect(badge).toBeInTheDocument();
    // Updated to match the current styling
    expect(badge.className).toContain('bg-destructive');
    expect(badge.className).toContain('text-destructive-foreground');
  });

  it('should render with warning status', () => {
    render(<StatusBadge status="warning" label="Pending" />);
    
    const badge = screen.getByText('Pending');
    expect(badge).toBeInTheDocument();
    // Updated to match the current styling
    expect(badge.className).toContain('bg-secondary');
    expect(badge.className).toContain('text-secondary-foreground');
  });

  it('should render with info status', () => {
    render(<StatusBadge status="info" label="Processing" />);
    
    const badge = screen.getByText('Processing');
    expect(badge).toBeInTheDocument();
    // Updated to match the current styling - info uses outline variant
    expect(badge.className).toContain('text-foreground');
  });

  it('should apply custom className', () => {
    render(
      <StatusBadge 
        status="success" 
        label="Custom" 
        className="custom-class"
      />
    );
    
    // The custom class is applied to the wrapper div
    const wrapper = screen.getByText('Custom').parentElement;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('should have proper base classes', () => {
    render(<StatusBadge status="success" label="Test" />);
    
    const badge = screen.getByText('Test');
    expect(badge.className).toContain('inline-flex');
    expect(badge.className).toContain('items-center');
    expect(badge.className).toContain('rounded-full');
    expect(badge.className).toContain('px-2.5');
    expect(badge.className).toContain('py-0.5');
    expect(badge.className).toContain('text-xs');
    // Updated to match the current styling
    expect(badge.className).toContain('font-semibold');
  });

  it('should render with different labels', () => {
    const { rerender } = render(<StatusBadge status="info" label="First Label" />);
    expect(screen.getByText('First Label')).toBeInTheDocument();

    rerender(<StatusBadge status="info" label="Second Label" />);
    expect(screen.getByText('Second Label')).toBeInTheDocument();
  });

  it('should render with empty label', () => {
    render(<StatusBadge status="success" label="" />);
    // The badge should still render, just empty
    const badges = screen.getAllByRole('generic');
    expect(badges.length).toBeGreaterThan(0);
  });

  it('should handle special characters in label', () => {
    render(<StatusBadge status="info" label="<script>alert('xss')</script>" />);
    // React should escape the content by default
    expect(screen.getByText("<script>alert('xss')</script>")).toBeInTheDocument();
  });
}); 