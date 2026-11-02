// api.js — frontend service layer (stub for future Spring Boot integration)
// All functions return mock data. Replace fetch calls with real API endpoints later.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Helper for future real API calls
const apiCall = async (endpoint, options = {}) => {
  // TODO: Replace with real fetch when Spring Boot backend is ready
  // const response = await fetch(`${BASE_URL}${endpoint}`, {
  //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
  //   ...options
  // });
  // return response.json();
  throw new Error('Backend not connected yet. Using local demo data.');
};

export const problemsApi = {
  getAll: () => apiCall('/problems'),
  getById: (id) => apiCall(`/problems/${id}`),
  create: (data) => apiCall('/problems', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/problems/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/problems/${id}`, { method: 'DELETE' }),
};

export const contestsApi = {
  getAll: () => apiCall('/contests'),
  getById: (id) => apiCall(`/contests/${id}`),
  register: (id) => apiCall(`/contests/${id}/register`, { method: 'POST' }),
};

export const submissionsApi = {
  getAll: () => apiCall('/submissions'),
  submit: (data) => apiCall('/submissions', { method: 'POST', body: JSON.stringify(data) }),
};

export const leaderboardApi = {
  getGlobal: () => apiCall('/leaderboard'),
  getByContest: (contestId) => apiCall(`/leaderboard/contest/${contestId}`),
};

export const authApi = {
  login: (credentials) => apiCall('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (data) => apiCall('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  logout: () => apiCall('/auth/logout', { method: 'POST' }),
};

export default { problemsApi, contestsApi, submissionsApi, leaderboardApi, authApi };
