// Central API service used by all frontend pages/components.
// Keeping API logic here avoids repeating fetch/auth handling everywhere.

const DEFAULT_BACKEND_ORIGIN ='https://webdevlopmentpractice.onrender.com';
const API_BASE_URL = import.meta.env.VITE_API_URL || `${DEFAULT_BACKEND_ORIGIN}/api`;
const TOKEN_STORAGE_KEY = 'taskflow_token';

export const getAuthToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const clearAuthToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

const buildUrl = (path) => `${API_BASE_URL}${path}`;

async function apiRequest(path, options = {}) {
  const { method = 'GET', body, token } = options;

  const headers = {
    'Content-Type': 'application/json'
  };

  // Backend expects raw JWT in Authorization header (not Bearer prefix).
  const authToken = token ?? getAuthToken();
  if (authToken) {
    headers.Authorization = authToken;
  }

  let response;

  try {
    response = await fetch(buildUrl(path), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
  } catch (error) {
    throw new Error('Cannot reach backend server. Make sure the API is running on http://localhost:8080.');
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

// AUTH
export const registerUser = (payload) =>
  apiRequest('/auth/register', {
    method: 'POST',
    body: payload
  });

export const loginUser = (payload) =>
  apiRequest('/auth/login', {
    method: 'POST',
    body: payload
  });

// TASKS
export const getTasks = ({ page = 1, limit = 50 } = {}) =>
  apiRequest(`/tasks?page=${page}&limit=${limit}`);

export const createTask = (payload) =>
  apiRequest('/tasks', {
    method: 'POST',
    body: payload
  });

export const updateTask = (taskId, payload) =>
  apiRequest(`/tasks/${taskId}`, {
    method: 'PUT',
    body: payload
  });

export const deleteTask = (taskId) =>
  apiRequest(`/tasks/${taskId}`, {
    method: 'DELETE'
  });
