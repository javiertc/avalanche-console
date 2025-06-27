// Address validation
export const isValidEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Webhook URL validation (must be HTTPS in production)
export const isValidWebhookUrl = (url: string): boolean => {
  if (!isValidUrl(url)) return false;
  
  const urlObj = new URL(url);
  // In production, enforce HTTPS
  if (process.env.NODE_ENV === 'production' && urlObj.protocol !== 'https:') {
    return false;
  }
  
  return true;
};

// Form validation helpers
export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
}; 