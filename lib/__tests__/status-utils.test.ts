import { getStatusColor, getStatusBg, getStatusVariant } from '../status-utils';

describe('status-utils', () => {
  describe('getStatusColor', () => {
    it('should return correct color for success status', () => {
      expect(getStatusColor('success')).toBe('text-green-600 dark:text-green-400');
    });

    it('should return correct color for error status', () => {
      expect(getStatusColor('error')).toBe('text-red-600 dark:text-red-400');
    });

    it('should return correct color for warning status', () => {
      expect(getStatusColor('warning')).toBe('text-yellow-600 dark:text-yellow-400');
    });

    it('should return correct color for info status', () => {
      expect(getStatusColor('info')).toBe('text-blue-600 dark:text-blue-400');
    });

    it('should return default color for unknown status', () => {
      // @ts-expect-error Testing invalid input
      expect(getStatusColor('unknown')).toBe('text-blue-600 dark:text-blue-400');
    });
  });

  describe('getStatusBg', () => {
    it('should return correct background for success status', () => {
      expect(getStatusBg('success')).toBe('bg-green-50 dark:bg-green-500/10');
    });

    it('should return correct background for error status', () => {
      expect(getStatusBg('error')).toBe('bg-red-50 dark:bg-red-500/10');
    });

    it('should return correct background for warning status', () => {
      expect(getStatusBg('warning')).toBe('bg-yellow-50 dark:bg-yellow-500/10');
    });

    it('should return correct background for info status', () => {
      expect(getStatusBg('info')).toBe('bg-blue-50 dark:bg-blue-500/10');
    });

    it('should return default background for unknown status', () => {
      // @ts-expect-error Testing invalid input
      expect(getStatusBg('unknown')).toBe('bg-blue-50 dark:bg-blue-500/10');
    });
  });

  describe('getStatusVariant', () => {
    it('should return correct variant for success status', () => {
      expect(getStatusVariant('success')).toBe('secondary');
    });

    it('should return correct variant for error status', () => {
      expect(getStatusVariant('error')).toBe('destructive');
    });

    it('should return correct variant for warning status', () => {
      expect(getStatusVariant('warning')).toBe('outline');
    });

    it('should return correct variant for info status', () => {
      expect(getStatusVariant('info')).toBe('default');
    });

    it('should return default variant for unknown status', () => {
      // @ts-expect-error Testing invalid input
      expect(getStatusVariant('unknown')).toBe('default');
    });
  });
}); 