import { cn } from '../utils';

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('should handle conditional classes', () => {
      expect(cn('base', true && 'conditional')).toBe('base conditional');
      expect(cn('base', false && 'conditional')).toBe('base');
    });

    it('should handle object syntax', () => {
      expect(cn('base', { active: true, disabled: false })).toBe('base active');
    });

    it('should handle arrays', () => {
      expect(cn(['class1', 'class2'])).toBe('class1 class2');
      expect(cn('base', ['array1', 'array2'])).toBe('base array1 array2');
    });

    it('should handle undefined and null values', () => {
      expect(cn('base', undefined, null, 'end')).toBe('base end');
    });

    it('should merge Tailwind classes correctly', () => {
      // twMerge should handle conflicting Tailwind classes
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
      expect(cn('p-4', 'p-8')).toBe('p-8');
      expect(cn('mt-4 mb-4', 'my-8')).toBe('my-8');
    });

    it('should handle complex nested structures', () => {
      expect(cn(
        'base',
        ['array-class'],
        { conditional: true },
        undefined,
        'final'
      )).toBe('base array-class conditional final');
    });

    it('should preserve non-Tailwind classes', () => {
      expect(cn('custom-class', 'p-4', 'another-custom')).toBe('custom-class p-4 another-custom');
    });

    it('should handle empty inputs', () => {
      expect(cn()).toBe('');
      expect(cn('')).toBe('');
    });

    it('should handle responsive and state modifiers', () => {
      expect(cn('hover:text-red-500', 'hover:text-blue-500')).toBe('hover:text-blue-500');
      expect(cn('md:p-4', 'md:p-8')).toBe('md:p-8');
    });
  });
}); 