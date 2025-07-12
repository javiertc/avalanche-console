import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatusBadge } from '../StatusBadge';

describe('StatusBadge', () => {
  it('should render with success status', () => {
    render(<StatusBadge status="success" label="Active" />);
    
    const badge = screen.getByText('Active');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('bg-green-100');
    expect(badge.className).toContain('text-green-800');
  });

  it('should render with error status', () => {
    render(<StatusBadge status="error" label="Failed" />);
    
    const badge = screen.getByText('Failed');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('bg-red-100');
    expect(badge.className).toContain('text-red-800');
  });

  it('should render with warning status', () => {
    render(<StatusBadge status="warning" label="Pending" />);
    
    const badge = screen.getByText('Pending');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('bg-yellow-100');
    expect(badge.className).toContain('text-yellow-800');
  });

  it('should render with info status', () => {
    render(<StatusBadge status="info" label="Processing" />);
    
    const badge = screen.getByText('Processing');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('bg-blue-100');
    expect(badge.className).toContain('text-blue-800');
  });

  it('should apply custom className', () => {
    render(
      <StatusBadge 
        status="success" 
        label="Custom" 
        className="custom-class" 
      />
    );
    
    const badge = screen.getByText('Custom');
    expect(badge.className).toContain('custom-class');
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
    expect(badge.className).toContain('font-medium');
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