import { Link } from 'react-router-dom';
import { notifications } from '../../data/mockData';
import NotificationItem from './NotificationItem';

export default function NotificationsPanel() {
  return (
    <main className="container-center">
      <section className="notifications-card">
        <div className="card-header">
          <h1>Centro de Notificaciones</h1>
          <Link className="text-link" to="#">Marcar todas como leídas</Link>
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
