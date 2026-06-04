import { randomUUID } from 'node:crypto';
import { getPool } from '../config/database.js';

const usersByRut = new Map();

function mapDbUser(row) {
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    rut: row.rut,
    email: row.email,
    department: row.department,
    role: row.role,
    passwordHash: row.password_hash,
    createdAt: row.created_at?.toISOString?.() || row.created_at,
  };
}

export async function findUserByRut(rut) {
  const normalizedRut = normalizeRut(rut);
  const pool = getPool();

  if (pool) {
    const result = await pool.query(
      'SELECT id, name, rut, email, department, password_hash, role, created_at FROM users WHERE rut = $1 LIMIT 1',
      [normalizedRut],
    );

    return mapDbUser(result.rows[0]);
  }

  return usersByRut.get(normalizedRut);
}

export async function createUser(user) {
  const rut = normalizeRut(user.rut);
  const pool = getPool();

  if (pool) {
    try {
      const result = await pool.query(
        `INSERT INTO users (name, rut, email, department, password_hash, role)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, name, rut, email, department, password_hash, role, created_at`,
        [user.name, rut, user.email || null, user.department || null, user.passwordHash, user.role || 'usuario'],
      );

      return mapDbUser(result.rows[0]);
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('USER_ALREADY_EXISTS');
      }

      throw error;
    }
  }

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

export async function listUsers() {
  const pool = getPool();

  if (pool) {
    const result = await pool.query(
      'SELECT id, name, rut, email, department, password_hash, role, created_at FROM users ORDER BY created_at DESC',
    );

    return result.rows.map(mapDbUser);
  }

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
