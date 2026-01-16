// API Configuration
// For local development, leave this empty to use the proxy
// For tunnel/production, set this to your backend URL (e.g., 'https://your-backend-tunnel.ngrok-free.app')
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

export const getApiUrl = (endpoint) => {
  // Remove leading slash from endpoint if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  if (API_BASE_URL) {
    return `${API_BASE_URL}/${cleanEndpoint}`;
  }
  
  // Use relative URL for proxy (local development)
  return `/${cleanEndpoint}`;
};

export default API_BASE_URL;
