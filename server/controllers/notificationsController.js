import {
  listNotificationsStore,
  markAllNotificationsReadStore,
  markNotificationReadStore,
} from '../data/notificationsStore.js';

export async function listNotifications(req, res) {
  return res.json({ notifications: await listNotificationsStore(req.user) });
}

export async function markNotificationRead(req, res) {
  const notification = await markNotificationReadStore(req.params.id, req.user);

  if (!notification) {
    throw new Error('NOTIFICATION_NOT_FOUND');
  }

  return res.json({ notification });
}

export async function markAllNotificationsRead(req, res) {
  await markAllNotificationsReadStore(req.user);
  return res.status(204).send();
}
