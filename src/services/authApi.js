import apiClient from './apiClient';
export { clearSession, getAccessToken, getCurrentUser, isAuthenticated, saveSession } from './authSession';

export async function login(credentials) {
  const { data } = await apiClient.post('/auth/login', credentials);
  return data;
}

export async function register(profile) {
  const { data } = await apiClient.post('/auth/register', profile);
  return data;
}
