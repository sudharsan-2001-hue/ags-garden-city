// Centralized Real Estate API Configuration
// Connected EXCLUSIVELY to the Real Estate Backend (Port 5002)

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

export const API_ENDPOINTS = {
  BASE: API_BASE_URL,
  PROPERTIES: `${API_BASE_URL}/properties`,
  DB_STATUS: `${API_BASE_URL}/db-status`,
  AUTH_LOGIN: `${API_BASE_URL}/auth/login`,
  AUTH_REGISTER: `${API_BASE_URL}/auth/register`,
  AUTH_ADMIN_LOGIN: `${API_BASE_URL}/auth/admin-login`,
  AUTH_USERS: `${API_BASE_URL}/auth/users`,
  INQUIRIES: `${API_BASE_URL}/inquiries`,
  BOOKINGS: `${API_BASE_URL}/bookings`,
};

export default API_BASE_URL;
