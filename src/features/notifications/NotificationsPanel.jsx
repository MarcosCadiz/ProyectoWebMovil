import { useState } from 'react';
import { notifications as initialNotifications } from '../../data/mockData';
import NotificationItem from './NotificationItem';

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState(initialNotifications);

  function markAllRead(event) {
    event.preventDefault();
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
