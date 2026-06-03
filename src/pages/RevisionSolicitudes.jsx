import React from 'react';
import PageShell from '../components/layout/PageShell';
import StaffNavbar from '../components/navigation/StaffNavbar';
import ReviewWorkspace from '../features/review/ReviewWorkspace';

export default function RevisionSolicitudes() {
  return (
    <PageShell variant="staff">
      <StaffNavbar />
      <ReviewWorkspace />
    </PageShell>
  );
}
