import { userRequests } from '../../data/mockData';
import RequestCard from './RequestCard';

export default function RequestsList() {
  return (
    <main className="container-narrow">
      <h1 className="page-title">Mis Solicitudes y Trámites</h1>
      <section className="requests-list">
        {userRequests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </section>
    </main>
  );
}
