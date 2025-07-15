import { 
  isValidEthereumAddress, 
  isValidUrl, 
  isValidWebhookUrl, 
  validateRequired,
  validateEmail 
} from '../validation'

describe('Validation Utilities', () => {
  describe('isValidEthereumAddress', () => {
    it('validates correct Ethereum addresses', () => {
      expect(isValidEthereumAddress('0x71C7656EC7ab88b098defB751B7401B5f6d8976F')).toBe(true)
      expect(isValidEthereumAddress('0x0000000000000000000000000000000000000000')).toBe(true)
    })

    it('rejects invalid addresses', () => {
      expect(isValidEthereumAddress('')).toBe(false)
      expect(isValidEthereumAddress('0x')).toBe(false)
      expect(isValidEthereumAddress('0x71C7656EC7ab88b098defB751B7401B5f6d8976')).toBe(false) // Too short
      expect(isValidEthereumAddress('0x71C7656EC7ab88b098defB751B7401B5f6d8976FF')).toBe(false) // Too long
      expect(isValidEthereumAddress('71C7656EC7ab88b098defB751B7401B5f6d8976F')).toBe(false) // Missing 0x
      expect(isValidEthereumAddress('0xZZZZ656EC7ab88b098defB751B7401B5f6d8976F')).toBe(false) // Invalid chars
    })
  })

  describe('isValidUrl', () => {
    it('validates correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true)
      expect(isValidUrl('http://localhost:3000')).toBe(true)
      expect(isValidUrl('https://api.example.com/webhook')).toBe(true)
      expect(isValidUrl('https://example.com:8080/path?query=value')).toBe(true)
    })

    it('rejects invalid URLs', () => {
      expect(isValidUrl('')).toBe(false)
      expect(isValidUrl('not-a-url')).toBe(false)
      expect(isValidUrl('http:')).toBe(false)
      expect(isValidUrl('://example.com')).toBe(false)
    })
  })

  describe('isValidWebhookUrl', () => {
    // Mock process.env
    const originalEnv = process.env

    beforeEach(() => {
      jest.resetModules()
      process.env = { ...originalEnv }
    })

    afterAll(() => {
      process.env = originalEnv
    })

    it('allows https URLs in production', () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        writable: true
      })
      expect(isValidWebhookUrl('https://example.com/webhook')).toBe(true)
      expect(isValidWebhookUrl('http://example.com/webhook')).toBe(false)
    })

    it('allows http URLs in development', () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        writable: true
      })
      expect(isValidWebhookUrl('http://localhost:3000/webhook')).toBe(true)
      expect(isValidWebhookUrl('https://example.com/webhook')).toBe(true)
    })

    it('rejects invalid URLs', () => {
      expect(isValidWebhookUrl('')).toBe(false)
      expect(isValidWebhookUrl('not-a-url')).toBe(false)
    })
  })

  describe('validateEmail', () => {
    it('returns null for valid email addresses', () => {
      expect(validateEmail('user@example.com')).toBe(null)
      expect(validateEmail('user.name@example.com')).toBe(null)
      expect(validateEmail('user+tag@example.co.uk')).toBe(null)
      expect(validateEmail('123@example.com')).toBe(null)
    })

    it('returns error message for invalid email addresses', () => {
      expect(validateEmail('')).toBe('Please enter a valid email address')
      expect(validateEmail('not-an-email')).toBe('Please enter a valid email address')
      expect(validateEmail('@example.com')).toBe('Please enter a valid email address')
      expect(validateEmail('user@')).toBe('Please enter a valid email address')
      expect(validateEmail('user@.com')).toBe('Please enter a valid email address')
      expect(validateEmail('user example@com')).toBe('Please enter a valid email address')
    })
  })

  describe('validateRequired', () => {
    it('returns null for non-empty values', () => {
      expect(validateRequired('test', 'Field')).toBe(null)
      expect(validateRequired('  test  ', 'Field')).toBe(null)
    })

    it('returns error message for empty values', () => {
      expect(validateRequired('', 'Field')).toBe('Field is required')
      expect(validateRequired('   ', 'Field')).toBe('Field is required')
    })
  })
}) 