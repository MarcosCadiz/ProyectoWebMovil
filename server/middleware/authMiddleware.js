import { findUserByRut, sanitizeUser } from '../data/usersStore.js';
import { verifyAccessToken } from '../services/tokenService.js';

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'AUTH_TOKEN_REQUIRED' });
  }

  try {
    const token = authHeader.slice('Bearer '.length);
    const payload = verifyAccessToken(token);
    const user = await findUserByRut(payload.rut);

    if (!user) {
      return res.status(401).json({ error: 'USER_NOT_FOUND' });
    }

    req.auth = payload;
    req.user = sanitizeUser(user);
    return next();
  } catch {
    return res.status(401).json({ error: 'INVALID_OR_EXPIRED_TOKEN' });
  }
}

export function requireRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: 'INSUFFICIENT_ROLE' });
    }

    return next();
  };
}
