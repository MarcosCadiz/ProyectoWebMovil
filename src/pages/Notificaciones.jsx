import React from 'react';
import PageShell from '../components/layout/PageShell';
import PublicNavbar from '../components/navigation/PublicNavbar';
import NotificationsPanel from '../features/notifications/NotificationsPanel';

export default function Notificaciones() {
  return (
    <PageShell>
      <PublicNavbar />
      <NotificationsPanel />
    </PageShell>
  );
}
