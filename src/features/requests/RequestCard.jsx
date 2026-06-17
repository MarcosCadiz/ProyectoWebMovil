import { OutlineButton } from '../../components/ui/AppButton';
import Stepper from '../../components/ui/Stepper';

export default function RequestCard({ request }) {
  const documentCount = request.documents?.length || 0;

  return (
    <article className="request-card">
      <div>
        <h2>{request.title}</h2>
        <p><strong>N Solicitud:</strong> {request.id}</p>
        <p><strong>Fecha de Ingreso:</strong> {request.date}</p>
        <p><strong>Direccion:</strong> {request.address || 'Pendiente'}</p>
        {request.description ? <p><strong>Resumen:</strong> {request.description}</p> : null}
      </div>
      <div className="request-documents">
        {request.showStepper ? <Stepper /> : <span className="draft-label">Borrador editable</span>}
        <span>{documentCount} documento{documentCount === 1 ? '' : 's'} asociado{documentCount === 1 ? '' : 's'}</span>
      </div>
      <div className="status-actions">
        <span className={`status-pill ${request.statusClass}`}>{request.status}</span>
        <OutlineButton to={request.to}>{request.action}</OutlineButton>
      </div>
    </article>
  );
}
