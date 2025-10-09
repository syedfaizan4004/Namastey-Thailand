import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-382214ec`;

// Generic API call function with timeout
async function apiCall(endpoint: string, options: RequestInit = {}) {
  // Create a timeout promise
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), 5000); // 5 second timeout
  });
  
  try {
    const fetchPromise = fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    });

    const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;

    const responseText = await response.text();

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      throw new Error(`Invalid JSON response: ${responseText}`);
    }

    if (!response.ok) {
      const errorMessage = responseData?.error || responseData?.details || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return responseData;
  } catch (fetchError) {
    // Silently fail for backend unavailable - components will use fallback data
    throw fetchError;
  }
}

// Freelancer API functions
export const freelancerAPI = {
  create: async (profileData: any) => {
    return apiCall('/freelancers', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  },

  getCategoryCounts: async () => {
    return apiCall('/freelancers/categories');
  },
};

// Client API functions
export const clientAPI = {
  create: async (profileData: any) => {
    return apiCall('/clients', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  },
};

// Job API functions
export const jobAPI = {
  create: async (jobData: any) => {
    return apiCall('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  },

  getFeatured: async () => {
    return apiCall('/jobs/featured');
  },

  getByClient: async (clientId: string) => {
    return apiCall(`/jobs/client/${clientId}`);
  },
};

// Authentication API functions
export const authAPI = {
  login: async (mobileNumber: string, password: string) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ mobileNumber, password }),
    });
  },

  checkMobile: async (mobileNumber: string) => {
    return apiCall('/auth/check-mobile', {
      method: 'POST',
      body: JSON.stringify({ mobileNumber }),
    });
  },
};

// Health check
export const healthCheck = async () => {
  return apiCall('/health');
};