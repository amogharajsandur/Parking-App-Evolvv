// Fallback to local; in production, use VITE_API_URL.
// Ensure it ends with /api to match backend routes.
let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// If the URL doesn't end with /api, append it.
if (!apiUrl.endsWith('/api')) {
  // Check if it ends with a slash to avoid double slash
  apiUrl = apiUrl.endsWith('/') ? `${apiUrl}api` : `${apiUrl}/api`;
}

const API_BASE_URL = apiUrl;

export default API_BASE_URL;