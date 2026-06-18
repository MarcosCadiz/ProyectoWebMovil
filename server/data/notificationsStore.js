import { randomUUID } from 'node:crypto';
import { getPool } from '../config/database.js';

const notifications = [];

function mapNotification(row) {
  return {
    id: row.id,
    tramiteId: row.tramite_codigo,
    title: row.title,
    body: row.body,
    readAt: row.read_at,
    createdAt: row.created_at,
  };
}

export async function createNotificationStore({ userId, userRut, tramiteInternalId, tramiteId, title, body }) {
  const pool = getPool();

  if (!pool) {
    const notification = {
      id: randomUUID(),
      userId,
      userRut,
      tramiteId,
      title,
      body,
      readAt: null,
      createdAt: new Date().toISOString(),
    };
    notifications.unshift(notification);
    return notification;
  }

  const result = await pool.query(
    `INSERT INTO notifications (user_id, tramite_id, title, body)
     VALUES (COALESCE($1, (SELECT id FROM users WHERE rut = $2 LIMIT 1)), $3, $4, $5)
     RETURNING id, title, body, read_at, created_at`,
    [userId || null, userRut || null, tramiteInternalId, title, body],
  );

  return {
    ...mapNotification(result.rows[0]),
    tramiteId,
  };
}

export async function listNotificationsStore(user) {
  const pool = getPool();

  if (!pool) {
    return notifications.filter((notification) => notification.userRut === user.rut);
  }

  const result = await pool.query(
    `SELECT n.id, n.title, n.body, n.read_at, n.created_at, t.codigo AS tramite_codigo
     FROM notifications n
     LEFT JOIN tramites t ON t.id = n.tramite_id
     WHERE n.user_id = $1
     ORDER BY n.created_at DESC
     LIMIT 100`,
    [user.id],
  );

  return result.rows.map(mapNotification);
}

export async function markNotificationReadStore(id, user) {
  const pool = getPool();

  if (!pool) {
    const notification = notifications.find(
      (item) => item.id === id && item.userRut === user.rut,
    );
    if (!notification) return null;
    notification.readAt = new Date().toISOString();
    return notification;
  }

  const result = await pool.query(
    `UPDATE notifications SET read_at = COALESCE(read_at, NOW())
     WHERE id = $1 AND user_id = $2
     RETURNING id, title, body, read_at, created_at`,
    [id, user.id],
  );

  return result.rows[0] ? mapNotification(result.rows[0]) : null;
}

export async function markAllNotificationsReadStore(user) {
  const pool = getPool();

  if (!pool) {
    for (const notification of notifications) {
      if (notification.userRut === user.rut && !notification.readAt) {
        notification.readAt = new Date().toISOString();
      }
    }
    return;
  }

  await pool.query(
    'UPDATE notifications SET read_at = COALESCE(read_at, NOW()) WHERE user_id = $1',
    [user.id],
  );
}
