import { createUser, findUserByRut, sanitizeUser } from '../data/usersStore.js';
import { comparePassword, hashPassword } from './passwordService.js';
import { createAccessToken } from './tokenService.js';

export async function registerUser({ name, rut, password, role = 'usuario' }) {
  if (!name || !rut || !password) {
    throw new Error('MISSING_REQUIRED_FIELDS');
  }

  if (password.length < 8) {
    throw new Error('PASSWORD_TOO_SHORT');
  }

  const passwordHash = await hashPassword(password);
  const user = createUser({
    name,
    rut,
    role,
    passwordHash,
  });

  return sanitizeUser(user);
}

export async function loginUser({ rut, password }) {
  if (!rut || !password) {
    throw new Error('MISSING_CREDENTIALS');
  }

  const user = findUserByRut(rut);

  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const passwordMatches = await comparePassword(password, user.passwordHash);

  if (!passwordMatches) {
    throw new Error('INVALID_CREDENTIALS');
  }

  return {
    user: sanitizeUser(user),
    accessToken: createAccessToken(user),
    tokenType: 'Bearer',
  };
}
