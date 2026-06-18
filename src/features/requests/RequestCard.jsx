import { OutlineButton } from '../../components/ui/AppButton';
import Stepper from '../../components/ui/Stepper';
import { downloadTextDocument } from '../../services/tramiteWorkspace';

export default function RequestCard({ request }) {
  const documentCount = request.documents?.length || 0;
  const detailPath = `/mis-solicitudes/${encodeURIComponent(request.id)}`;

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
        <OutlineButton to={detailPath}>Ver Detalles</OutlineButton>
        {request.certificate ? (
          <button
            className="card-download"
            type="button"
            onClick={() => downloadTextDocument(
              request.certificate.name,
              request.certificate.content,
            )}
          >
            Descargar certificado
          </button>
        ) : null}
      </div>
    </article>
  );
}
