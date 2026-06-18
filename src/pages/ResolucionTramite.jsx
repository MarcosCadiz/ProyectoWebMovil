import PageShell from '../components/layout/PageShell';
import StaffNavbar from '../components/navigation/StaffNavbar';
import ResolutionWorkspace from '../features/review/ResolutionWorkspace';

export default function ResolucionTramite() {
  return (
    <PageShell variant="staff">
      <StaffNavbar />
      <ResolutionWorkspace />
    </PageShell>
  );
}
