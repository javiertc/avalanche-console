import React from 'react';
import { render, screen } from '@testing-library/react';
import { DeveloperResources } from '../DeveloperResources';

describe('DeveloperResources', () => {
  it('should render all resource cards', () => {
    render(<DeveloperResources />);
    
    // Check all resources are rendered
    expect(screen.getByText('API Documentation')).toBeInTheDocument();
    expect(screen.getByText('SDK Examples')).toBeInTheDocument();
    expect(screen.getByText('Developer Discord')).toBeInTheDocument();
    expect(screen.getByText('Tutorials')).toBeInTheDocument();
  });

  it('should render resource descriptions', () => {
    render(<DeveloperResources />);
    
    expect(screen.getByText('Complete guide to using Avalanche APIs')).toBeInTheDocument();
    expect(screen.getByText('Code examples in multiple languages')).toBeInTheDocument();
    expect(screen.getByText('Join the community for support')).toBeInTheDocument();
    expect(screen.getByText('Step-by-step guides for common tasks')).toBeInTheDocument();
  });

  it('should render external links with correct attributes', () => {
    render(<DeveloperResources />);
    
    const links = screen.getAllByRole('link');
    
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('href', '#');
    });
  });

  it('should render book icons for each resource', () => {
    render(<DeveloperResources />);
    
    // Find all icon containers
    const iconContainers = document.querySelectorAll('.group');
    expect(iconContainers).toHaveLength(4);
  });

  it('should apply animation delays to cards', () => {
    render(<DeveloperResources />);
    
    const cards = document.querySelectorAll('.animate-fade-in');
    
    cards.forEach((card, index) => {
      expect(card).toHaveStyle(`animation-delay: ${index * 100}ms`);
    });
  });

  it('should have proper card structure', () => {
    render(<DeveloperResources />);
    
    const cards = document.querySelectorAll('.group');
    
    cards.forEach(card => {
      expect(card).toHaveClass('cursor-pointer');
      expect(card).toHaveClass('transition-shadow');
      expect(card).toHaveClass('duration-300');
    });
  });

  it('should render with responsive grid layout', () => {
    const { container } = render(<DeveloperResources />);
    
    const grid = container.firstChild;
    expect(grid).toHaveClass('grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('sm:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-4');
    expect(grid).toHaveClass('gap-4');
    expect(grid).toHaveClass('lg:gap-6');
  });

  it('should have hover effects on cards', () => {
    render(<DeveloperResources />);
    
    const cards = document.querySelectorAll('.group');
    
    cards.forEach(card => {
      expect(card).toHaveClass('hover:shadow-md');
    });
  });
}); 