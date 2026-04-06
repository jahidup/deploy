import axios from 'axios';

// Get API base URL from environment variable or use localhost default
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// API functions
export const fetchNotes = () => apiClient.get('/notes');
export const submitContact = (data) => apiClient.post('/contact', data);
export const fetchMessages = () => apiClient.get('/messages');
export const checkHealth = () => apiClient.get('/health');

export default apiClient;
