import {
  CHART_COLORS,
  API_ENDPOINTS,
  TOAST_DURATION,
  BREAKPOINTS,
  ANIMATION_DURATION
} from '../constants';

describe('constants', () => {
  describe('CHART_COLORS', () => {
    it('should have all required color properties', () => {
      expect(CHART_COLORS).toHaveProperty('primary');
      expect(CHART_COLORS).toHaveProperty('secondary');
      expect(CHART_COLORS).toHaveProperty('tertiary');
      expect(CHART_COLORS).toHaveProperty('quaternary');
    });

    it('should have valid CSS color values', () => {
      expect(CHART_COLORS.primary).toMatch(/^hsl\(var\(--chart-\d\)\)$/);
      expect(CHART_COLORS.secondary).toMatch(/^hsl\(var\(--chart-\d\)\)$/);
      expect(CHART_COLORS.tertiary).toMatch(/^hsl\(var\(--chart-\d\)\)$/);
      expect(CHART_COLORS.quaternary).toMatch(/^hsl\(var\(--chart-\d\)\)$/);
    });

    it('should be a const object', () => {
      // TypeScript enforces immutability at compile time with 'as const'
      // At runtime, we verify the object structure is preserved
      expect(Object.keys(CHART_COLORS)).toHaveLength(4);
      expect(CHART_COLORS).toEqual(expect.objectContaining({
        primary: expect.any(String),
        secondary: expect.any(String),
        tertiary: expect.any(String),
        quaternary: expect.any(String)
      }));
    });
  });

  describe('API_ENDPOINTS', () => {
    it('should have all required endpoints', () => {
      expect(API_ENDPOINTS).toHaveProperty('ANALYTICS_USAGE');
      expect(API_ENDPOINTS).toHaveProperty('ANALYTICS_ENDPOINTS');
    });

    it('should have valid endpoint paths', () => {
      expect(API_ENDPOINTS.ANALYTICS_USAGE).toBe('/api/analytics/usage');
      expect(API_ENDPOINTS.ANALYTICS_ENDPOINTS).toBe('/api/analytics/endpoints');
    });

    it('should be a const object', () => {
      // TypeScript enforces immutability at compile time with 'as const'
      // At runtime, we verify the object structure is preserved
      expect(Object.keys(API_ENDPOINTS)).toHaveLength(2);
      expect(API_ENDPOINTS).toEqual(expect.objectContaining({
        ANALYTICS_USAGE: expect.any(String),
        ANALYTICS_ENDPOINTS: expect.any(String)
      }));
    });
  });

  describe('TOAST_DURATION', () => {
    it('should have all duration properties', () => {
      expect(TOAST_DURATION).toHaveProperty('SHORT');
      expect(TOAST_DURATION).toHaveProperty('MEDIUM');
      expect(TOAST_DURATION).toHaveProperty('LONG');
    });

    it('should have reasonable duration values', () => {
      expect(TOAST_DURATION.SHORT).toBe(3000);
      expect(TOAST_DURATION.MEDIUM).toBe(5000);
      expect(TOAST_DURATION.LONG).toBe(10000);
      
      // Verify ordering
      expect(TOAST_DURATION.SHORT).toBeLessThan(TOAST_DURATION.MEDIUM);
      expect(TOAST_DURATION.MEDIUM).toBeLessThan(TOAST_DURATION.LONG);
    });
  });

  describe('BREAKPOINTS', () => {
    it('should have all breakpoint properties', () => {
      expect(BREAKPOINTS).toHaveProperty('MOBILE');
      expect(BREAKPOINTS).toHaveProperty('TABLET');
      expect(BREAKPOINTS).toHaveProperty('DESKTOP');
    });

    it('should have standard breakpoint values', () => {
      expect(BREAKPOINTS.MOBILE).toBe(768);
      expect(BREAKPOINTS.TABLET).toBe(1024);
      expect(BREAKPOINTS.DESKTOP).toBe(1280);
      
      // Verify ordering
      expect(BREAKPOINTS.MOBILE).toBeLessThan(BREAKPOINTS.TABLET);
      expect(BREAKPOINTS.TABLET).toBeLessThan(BREAKPOINTS.DESKTOP);
    });
  });

  describe('ANIMATION_DURATION', () => {
    it('should have all animation duration properties', () => {
      expect(ANIMATION_DURATION).toHaveProperty('FAST');
      expect(ANIMATION_DURATION).toHaveProperty('NORMAL');
      expect(ANIMATION_DURATION).toHaveProperty('SLOW');
    });

    it('should have reasonable animation values', () => {
      expect(ANIMATION_DURATION.FAST).toBe(150);
      expect(ANIMATION_DURATION.NORMAL).toBe(200);
      expect(ANIMATION_DURATION.SLOW).toBe(300);
      
      // Verify ordering
      expect(ANIMATION_DURATION.FAST).toBeLessThan(ANIMATION_DURATION.NORMAL);
      expect(ANIMATION_DURATION.NORMAL).toBeLessThan(ANIMATION_DURATION.SLOW);
    });
  });
}); 