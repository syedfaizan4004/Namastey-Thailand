// ID Generation Utility for Namastey Thailand Platform

/**
 * Generates a unique ID for freelancers
 * Format: FL + 6 digits (e.g., FL123456)
 */
export function generateFreelancerId(): string {
  const timestamp = Date.now().toString();
  const randomSuffix = Math.random().toString(36).substr(2, 3).toUpperCase();
  const numericPart = (timestamp.slice(-4) + Math.floor(Math.random() * 100).toString().padStart(2, '0'));
  return `FL${numericPart}`;
}

/**
 * Generates a unique ID for clients  
 * Format: CL + 6 digits (e.g., CL123456)
 */
export function generateClientId(): string {
  const timestamp = Date.now().toString();
  const randomSuffix = Math.random().toString(36).substr(2, 3).toUpperCase();
  const numericPart = (timestamp.slice(-4) + Math.floor(Math.random() * 100).toString().padStart(2, '0'));
  return `CL${numericPart}`;
}

/**
 * Generates a unique job ID
 * Format: JB + 6 digits (e.g., JB123456)
 */
export function generateJobId(): string {
  const timestamp = Date.now().toString();
  const numericPart = (timestamp.slice(-4) + Math.floor(Math.random() * 100).toString().padStart(2, '0'));
  return `JB${numericPart}`;
}

/**
 * Validates if an ID has the correct format
 */
export function validateId(id: string, type: 'freelancer' | 'client' | 'job'): boolean {
  const patterns = {
    freelancer: /^FL\d{6}$/,
    client: /^CL\d{6}$/,
    job: /^JB\d{6}$/
  };
  
  return patterns[type].test(id);
}