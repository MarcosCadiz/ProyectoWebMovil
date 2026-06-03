import React from 'react';
import PageShell from '../components/layout/PageShell';
import PublicNavbar from '../components/navigation/PublicNavbar';
import RequestsList from '../features/requests/RequestsList';

export default function MisSolicitudes() {
  return (
    <PageShell>
      <PublicNavbar />
      <RequestsList />
    </PageShell>
  );
}
