import React from 'react';
import PageShell from '../components/layout/PageShell';
import StaffNavbar from '../components/navigation/StaffNavbar';
import StaffInbox from '../features/staff/StaffInbox';

export default function MenuFuncionario() {
  return (
    <PageShell variant="staff">
      <StaffNavbar />
      <StaffInbox />
    </PageShell>
  );
}
