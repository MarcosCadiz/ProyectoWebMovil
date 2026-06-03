const TOKEN_KEY = 'dom_access_token';
const USER_KEY = 'dom_user';

export function saveSession(session) {
  localStorage.setItem(TOKEN_KEY, session.accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(session.user));
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getCurrentUser() {
  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    clearSession();
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getAccessToken() && getCurrentUser());
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
