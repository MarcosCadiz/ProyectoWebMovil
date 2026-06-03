const API_BASE_URL = '/api';

export async function login(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'LOGIN_FAILED');
  }

  return data;
}

export function saveSession(session) {
  localStorage.setItem('dom_access_token', session.accessToken);
  localStorage.setItem('dom_user', JSON.stringify(session.user));
}
