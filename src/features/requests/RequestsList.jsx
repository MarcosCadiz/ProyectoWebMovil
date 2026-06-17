import { useEffect, useState } from 'react';
import { PrimaryButton } from '../../components/ui/AppButton';
import { paths } from '../../routes/paths';
import { loadTramites } from '../../services/tramiteWorkspace';
import RequestCard from './RequestCard';

export default function RequestsList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setRequests(loadTramites());
  }, []);

  return (
    <main className="container-narrow">
      <div className="requests-header">
        <div>
          <h1 className="page-title">Mis Solicitudes y Tramites</h1>
          <p>Revisa borradores, solicitudes ingresadas y documentos asociados a cada tramite DOM.</p>
        </div>
        <PrimaryButton to={paths.upload}>Nueva Solicitud</PrimaryButton>
      </div>
      <section className="requests-list">
        {requests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </section>
    </main>
  );
}
