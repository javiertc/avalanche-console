import { renderHook, act } from '@testing-library/react';
import { useFormValidation } from '../useFormValidation';

// Import FieldValue type from the validation module
type FieldValue = Parameters<ReturnType<typeof useFormValidation>['validate']>[1];

describe('useFormValidation', () => {
  const basicRules = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
      required: true,
      minLength: 8,
      maxLength: 20
    },
    username: {
      minLength: 3,
      maxLength: 15,
      pattern: /^[a-zA-Z0-9_]+$/
    },
    age: {
      custom: (value: FieldValue) => {
        const numValue = typeof value === 'number' ? value : Number(value);
        if (numValue < 18) return 'Must be at least 18 years old';
        if (numValue > 120) return 'Invalid age';
        return null;
      }
    }
  };

  it('should initialize with empty errors', () => {
    const { result } = renderHook(() => useFormValidation(basicRules));
    expect(result.current.errors).toEqual({});
  });

  describe('validate', () => {
    it('should validate required fields', () => {
      const { result } = renderHook(() => useFormValidation(basicRules));

      act(() => {
        result.current.validate('email', '');
      });
      expect(result.current.errors.email).toBe('email is required');

      act(() => {
        result.current.validate('email', 'test@example.com');
      });
      expect(result.current.errors.email).toBeNull();
    });

    it('should validate pattern', () => {
      const { result } = renderHook(() => useFormValidation(basicRules));

      act(() => {
        result.current.validate('email', 'invalid-email');
      });
      expect(result.current.errors.email).toBe('email format is invalid');

      act(() => {
        result.current.validate('username', 'user@123');
      });
      expect(result.current.errors.username).toBe('username format is invalid');
    });

    it('should validate minLength and maxLength', () => {
      const { result } = renderHook(() => useFormValidation(basicRules));

      act(() => {
        result.current.validate('password', 'short');
      });
      expect(result.current.errors.password).toBe('password must be at least 8 characters');

      act(() => {
        result.current.validate('password', 'a'.repeat(21));
      });
      expect(result.current.errors.password).toBe('password must be no more than 20 characters');

      act(() => {
        result.current.validate('password', 'validpass');
      });
      expect(result.current.errors.password).toBeNull();
    });

    it('should handle custom validation', () => {
      const { result } = renderHook(() => useFormValidation(basicRules));

      act(() => {
        result.current.validate('age', 16);
      });
      expect(result.current.errors.age).toBe('Must be at least 18 years old');

      act(() => {
        result.current.validate('age', 150);
      });
      expect(result.current.errors.age).toBe('Invalid age');

      act(() => {
        result.current.validate('age', 25);
      });
      expect(result.current.errors.age).toBeNull();
    });

    it('should skip validation for non-required empty fields', () => {
      const { result } = renderHook(() => useFormValidation(basicRules));

      act(() => {
        result.current.validate('username', '');
      });
      expect(result.current.errors.username).toBeNull();

      act(() => {
        result.current.validate('username', '  ');
      });
      expect(result.current.errors.username).toBeNull();
    });

    it('should handle fields with no rules', () => {
      const { result } = renderHook(() => useFormValidation(basicRules));

      act(() => {
        const error = result.current.validate('unknownField', 'value');
        expect(error).toBeNull();
      });
    });
  });

  describe('validateAll', () => {
    it('should validate all fields and return true when valid', () => {
      const { result } = renderHook(() => useFormValidation(basicRules));

      const values = {
        email: 'test@example.com',
        password: 'validpass123',
        username: 'john_doe',
        age: 25
      };

      let isValid: boolean;
      act(() => {
        isValid = result.current.validateAll(values);
      });

      expect(isValid!).toBe(true);
      expect(result.current.errors).toEqual({
        email: null,
        password: null,
        username: null,
        age: null
      });
    });

    it('should validate all fields and return false when invalid', () => {
      const { result } = renderHook(() => useFormValidation(basicRules));

      const values = {
        email: '',
        password: 'short',
        username: 'invalid@user',
        age: 16
      };

      let isValid: boolean;
      act(() => {
        isValid = result.current.validateAll(values);
      });

      expect(isValid!).toBe(false);
      expect(result.current.errors.email).toBe('email is required');
      expect(result.current.errors.password).toBe('password must be at least 8 characters');
      expect(result.current.errors.username).toBe('username format is invalid');
      expect(result.current.errors.age).toBe('Must be at least 18 years old');
    });

    it('should handle missing values', () => {
      const { result } = renderHook(() => useFormValidation(basicRules));

      const values = {
        email: 'test@example.com'
      };

      let isValid: boolean;
      act(() => {
        isValid = result.current.validateAll(values);
      });

      expect(isValid!).toBe(false);
      expect(result.current.errors.password).toBe('password is required');
    });
  });

  describe('clearError', () => {
    it('should clear specific field error', () => {
      const { result } = renderHook(() => useFormValidation(basicRules));

      act(() => {
        result.current.validate('email', '');
        result.current.validate('password', 'short');
      });

      expect(result.current.errors.email).toBeTruthy();
      expect(result.current.errors.password).toBeTruthy();

      act(() => {
        result.current.clearError('email');
      });

      expect(result.current.errors.email).toBeNull();
      expect(result.current.errors.password).toBeTruthy();
    });
  });

  describe('clearAllErrors', () => {
    it('should clear all errors', () => {
      const { result } = renderHook(() => useFormValidation(basicRules));

      act(() => {
        result.current.validateAll({
          email: '',
          password: 'short',
          username: 'invalid@',
          age: 16
        });
      });

      expect(Object.values(result.current.errors).filter(Boolean).length).toBeGreaterThan(0);

      act(() => {
        result.current.clearAllErrors();
      });

      expect(result.current.errors).toEqual({});
    });
  });
}); 