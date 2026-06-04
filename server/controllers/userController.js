import { listUsers, sanitizeUser } from '../data/usersStore.js';

export function me(req, res) {
  return res.json({ user: req.user });
}

export async function users(req, res) {
  const allUsers = await listUsers();

  return res.json({
    users: allUsers.map(sanitizeUser),
  });
}
