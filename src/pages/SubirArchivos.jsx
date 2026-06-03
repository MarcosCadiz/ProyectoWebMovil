import React from 'react';
import PageShell from '../components/layout/PageShell';
import PublicNavbar from '../components/navigation/PublicNavbar';
import UploadPanel from '../features/upload/UploadPanel';

export default function SubirArchivos() {
  return (
    <PageShell>
      <PublicNavbar />
      <UploadPanel />
    </PageShell>
  );
}
