import React from 'react';
import { render, screen } from '@testing-library/react';
import { SystemStatus } from '../SystemStatus';
import { systemStatus } from '@/constants/dashboard';

describe('SystemStatus', () => {
  it('should render the component with title', () => {
    render(<SystemStatus />);
    
    expect(screen.getByText('System Status')).toBeInTheDocument();
  });

  it('should render all system services', () => {
    render(<SystemStatus />);
    
    systemStatus.forEach(service => {
      expect(screen.getByText(service.name)).toBeInTheDocument();
      // Use getAllByText since there are multiple elements with the same text
      const statusElements = screen.getAllByText(service.status);
      expect(statusElements.length).toBeGreaterThan(0);
      expect(statusElements[0]).toBeInTheDocument();
    });
  });

  it('should render activity icon', () => {
    render(<SystemStatus />);
    
    const header = screen.getByText('System Status').parentElement;
    expect(header?.querySelector('svg')).toBeInTheDocument();
  });

  it('should apply correct badge variant for operational services', () => {
    render(<SystemStatus />);
    
    systemStatus.forEach(service => {
      // Use getAllByText and get the first matching element
      const badges = screen.getAllByText(service.status);
      const badge = badges.find(b => b.textContent === service.status);
      expect(badge).toBeDefined();
      
      if (service.status === 'Operational') {
        // Updated to match the current styling
        expect(badge?.className).toContain('bg-green');
      } else if (service.status === 'Degraded') {
        expect(badge?.className).toContain('bg-yellow');
      }
    });
  });

  it('should have proper card structure', () => {
    const { container } = render(<SystemStatus />);
    
    const card = container.querySelector('.border-border');
    expect(card).toBeInTheDocument();
  });

  it('should render service names with correct styling', () => {
    render(<SystemStatus />);
    
    systemStatus.forEach(service => {
      const serviceName = screen.getByText(service.name);
      expect(serviceName).toHaveClass('text-sm');
      expect(serviceName).toHaveClass('text-muted-foreground');
    });
  });

  it('should render items with proper spacing', () => {
    const { container } = render(<SystemStatus />);
    
    const contentDiv = container.querySelector('.space-y-3');
    expect(contentDiv).toBeInTheDocument();
    
    const items = contentDiv?.querySelectorAll('.flex.items-center.justify-between');
    expect(items).toHaveLength(systemStatus.length);
  });

  it('should display correct number of services', () => {
    render(<SystemStatus />);
    
    // Get all service name elements by their class
    const serviceItems = screen.getAllByText(/Data API|RPC Endpoints|Webhooks|Faucet/);
    expect(serviceItems.length).toBe(systemStatus.length);
  });
}); 