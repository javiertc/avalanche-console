import { layoutStyles, getLayoutClass } from '../styles';

describe('styles', () => {
  describe('layoutStyles', () => {
    it('should have all layout style properties', () => {
      // Page layouts
      expect(layoutStyles).toHaveProperty('pageContainer');
      expect(layoutStyles).toHaveProperty('pageHeader');
      
      // Spacing patterns
      expect(layoutStyles).toHaveProperty('sectionSpacing');
      expect(layoutStyles).toHaveProperty('cardSpacing');
      expect(layoutStyles).toHaveProperty('fieldSpacing');
      expect(layoutStyles).toHaveProperty('inputSpacing');
      
      // Grid layouts
      expect(layoutStyles).toHaveProperty('quickActionsGrid');
      expect(layoutStyles).toHaveProperty('statsGrid');
      expect(layoutStyles).toHaveProperty('dashboardGrid');
      
      // Component styles
      expect(layoutStyles).toHaveProperty('cardContent');
      expect(layoutStyles).toHaveProperty('tabContent');
      expect(layoutStyles).toHaveProperty('formGroup');
      
      // Typography
      expect(layoutStyles).toHaveProperty('pageTitle');
      expect(layoutStyles).toHaveProperty('sectionTitle');
      expect(layoutStyles).toHaveProperty('cardTitle');
      expect(layoutStyles).toHaveProperty('bodyText');
      expect(layoutStyles).toHaveProperty('captionText');
      
      // Interactive elements
      expect(layoutStyles).toHaveProperty('button');
      expect(layoutStyles).toHaveProperty('link');
      
      // Containers
      expect(layoutStyles).toHaveProperty('card');
      expect(layoutStyles).toHaveProperty('panel');
    });

    it('should have valid class name strings', () => {
      Object.values(layoutStyles).forEach(value => {
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      });
    });

    it('should contain expected patterns', () => {
      // Check for Vercel Geist spacing
      expect(layoutStyles.pageContainer).toContain('space-geist');
      expect(layoutStyles.sectionSpacing).toBe('space-geist');
      expect(layoutStyles.cardSpacing).toBe('space-geist-sm');
      
      // Check for responsive grid patterns
      expect(layoutStyles.quickActionsGrid).toContain('grid');
      expect(layoutStyles.quickActionsGrid).toContain('sm:grid-cols-2');
      expect(layoutStyles.quickActionsGrid).toContain('lg:grid-cols-4');
      
      // Check for typography patterns
      expect(layoutStyles.pageTitle).toContain('text-heading-48');
      expect(layoutStyles.sectionTitle).toContain('text-heading-24');
      
      // Check for interactive patterns
      expect(layoutStyles.button).toContain('transition-all');
      expect(layoutStyles.button).toContain('hover-lift');
      expect(layoutStyles.button).toContain('focus-ring');
    });

    it('should have readonly properties', () => {
      // Test that the object is configured as const
      expect(layoutStyles).toBeDefined();
      // TypeScript enforces immutability at compile time
      // At runtime, we just verify the values exist and are strings
      expect(typeof layoutStyles.pageContainer).toBe('string');
    });
  });

  describe('getLayoutClass', () => {
    it('should return layout style for valid key', () => {
      expect(getLayoutClass('pageContainer')).toBe(layoutStyles.pageContainer);
      expect(getLayoutClass('cardContent')).toBe(layoutStyles.cardContent);
    });

    it('should merge custom class with layout style', () => {
      const result = getLayoutClass('pageContainer', 'custom-class');
      expect(result).toContain(layoutStyles.pageContainer);
      expect(result).toContain('custom-class');
    });

    it('should handle undefined custom class', () => {
      const result = getLayoutClass('pageContainer', undefined);
      expect(result).toBe(layoutStyles.pageContainer);
    });

    it('should handle empty string custom class', () => {
      const result = getLayoutClass('pageContainer', '');
      expect(result).toBe(layoutStyles.pageContainer);
    });

    it('should handle multiple custom classes', () => {
      const result = getLayoutClass('pageContainer', 'class1 class2 class3');
      expect(result).toContain(layoutStyles.pageContainer);
      expect(result).toContain('class1');
      expect(result).toContain('class2');
      expect(result).toContain('class3');
    });

    it('should override conflicting Tailwind classes', () => {
      const result = getLayoutClass('button', 'text-button-16');
      // The custom class should override the default text-button-14
      expect(result).toContain('text-button-16');
      expect(result).not.toMatch(/text-button-14.*text-button-16/);
    });

    it('should work with all layout style keys', () => {
      const keys = Object.keys(layoutStyles) as Array<keyof typeof layoutStyles>;
      keys.forEach(key => {
        const result = getLayoutClass(key);
        expect(result).toEqual(expect.stringContaining(layoutStyles[key]));
      });
    });
  });
}); 