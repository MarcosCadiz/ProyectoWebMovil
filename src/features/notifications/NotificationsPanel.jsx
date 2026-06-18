import { useEffect, useState } from 'react';
import { notifications as initialNotifications } from '../../data/mockData';
import {
  fetchNotifications,
  markAllNotificationsRead as markAllNotificationsReadApi,
} from '../../services/notificationsApi';
import NotificationItem from './NotificationItem';

function mapApiNotification(notification) {
  const tramiteId = notification.tramiteId;

  return {
    id: notification.id,
    icon: notification.title.includes('Aprobado') ? 'OK' : '!',
    iconClass: notification.title.includes('Aprobado') ? 'success' : '',
    unread: !notification.readAt,
    title: notification.title,
    description: notification.body,
    highlight: tramiteId || '',
    time: new Date(notification.createdAt).toLocaleString('es-CL'),
    action: tramiteId ? 'Ver Tramite' : 'Ver Solicitudes',
    to: tramiteId ? `/mis-solicitudes/${encodeURIComponent(tramiteId)}` : '/mis-solicitudes',
    helpTo: tramiteId ? `/chat-audiencia?tramite=${encodeURIComponent(tramiteId)}` : '/chat-audiencia',
  };
}

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState(initialNotifications);

  useEffect(() => {
    fetchNotifications()
      .then((items) => {
        if (items.length) setNotifications(items.map(mapApiNotification));
      })
      .catch(() => {});
  }, []);

  async function markAllRead(event) {
    event.preventDefault();
    try {
      await markAllNotificationsReadApi();
    } catch {
      // Mantiene respuesta local si la API no esta disponible.
    }
    setNotifications((current) => current.map((notification) => ({
      ...notification,
      unread: false,
    })));
  }

  return (
    <main className="container-center">
      <section className="notifications-card">
        <div className="card-header">
          <h1>Centro de Notificaciones</h1>
          <button className="text-link link-button-reset" type="button" onClick={markAllRead}>
            Marcar todas como leidas
          </button>
        </div>
        <div className="notification-list">
          {notifications.map((notification) => (
            <NotificationItem key={notification.title} notification={notification} />
          ))}
        </div>
      </section>
    </main>
  );
}
