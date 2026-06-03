import React from 'react';
import PageShell from '../components/layout/PageShell';
import PublicNavbar from '../components/navigation/PublicNavbar';
import ChatPanel from '../features/chat/ChatPanel';

export default function ChatAudiencia() {
  return (
    <PageShell>
      <PublicNavbar />
      <ChatPanel />
    </PageShell>
  );
}
