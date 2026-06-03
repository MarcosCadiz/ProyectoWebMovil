import { randomUUID } from 'node:crypto';

const usersByRut = new Map();

export function findUserByRut(rut) {
  return usersByRut.get(normalizeRut(rut));
}

export function createUser(user) {
  const rut = normalizeRut(user.rut);

  if (usersByRut.has(rut)) {
    throw new Error('USER_ALREADY_EXISTS');
  }

  const savedUser = {
    ...user,
    id: user.id || randomUUID(),
    rut,
    createdAt: new Date().toISOString(),
  };

  usersByRut.set(rut, savedUser);
  return savedUser;
}

export function listUsers() {
  return Array.from(usersByRut.values());
}

export function sanitizeUser(user) {
  if (!user) return null;

  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

export function normalizeRut(rut = '') {
  return String(rut).trim().toLowerCase();
}
