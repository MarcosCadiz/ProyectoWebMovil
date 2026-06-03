import { OutlineButton } from '../../components/ui/AppButton';
import Stepper from '../../components/ui/Stepper';

export default function RequestCard({ request }) {
  return (
    <article className="request-card">
      <div>
        <h2>{request.title}</h2>
        <p><strong>N° Solicitud:</strong> {request.id}</p>
        <p><strong>Fecha de Ingreso:</strong> {request.date}</p>
        <p><strong>Dirección:</strong> {request.address}</p>
      </div>
      <div>{request.showStepper ? <Stepper /> : null}</div>
      <div className="status-actions">
        <span className={`status-pill ${request.statusClass}`}>{request.status}</span>
        <OutlineButton to={request.to}>{request.action}</OutlineButton>
      </div>
    </article>
  );
}
