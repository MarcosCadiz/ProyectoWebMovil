import React from 'react';
import PageShell from '../components/layout/PageShell';
import PublicNavbar from '../components/navigation/PublicNavbar';
import UserMenu from '../features/user/UserMenu';

export default function MenuUsuario() {
  return (
    <PageShell>
      <PublicNavbar />
      <UserMenu />
    </PageShell>
  );
}
