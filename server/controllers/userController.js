import { listUsers, sanitizeUser } from '../data/usersStore.js';

export function me(req, res) {
  return res.json({ user: req.user });
}

export function users(req, res) {
  return res.json({
    users: listUsers().map(sanitizeUser),
  });
}
