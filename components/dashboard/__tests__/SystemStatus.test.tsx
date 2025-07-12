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
      expect(screen.getByText(service.status)).toBeInTheDocument();
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
      const badge = screen.getByText(service.status);
      
      if (service.status === 'Operational') {
        expect(badge.className).toContain('bg-green-100');
        expect(badge.className).toContain('text-green-800');
      } else {
        expect(badge.className).toContain('bg-yellow-100');
        expect(badge.className).toContain('text-yellow-800');
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
    
    const serviceItems = screen.getAllByText(/API|Webhooks|Metrics|Data Service/);
    expect(serviceItems).toHaveLength(systemStatus.length);
  });
}); 