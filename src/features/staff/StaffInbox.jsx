import { useNavigate } from 'react-router-dom';
import { staffRequests } from '../../data/mockData';
import { paths } from '../../routes/paths';

export default function StaffInbox() {
  const navigate = useNavigate();

  return (
    <main className="staff-content">
      <h1>Bandeja de Entrada (Filtro Inicial)</h1>
      <div className="filters">
        <input placeholder="Buscar por N° Solicitud o RUT..." />
        <select defaultValue="todos">
          <option value="todos">Todos los trámites</option>
        </select>
        <select defaultValue="nuevas">
          <option value="nuevas">Nuevas (Sin asignar)</option>
        </select>
      </div>
      <table className="dom-table">
        <thead>
          <tr>
            <th>N° Solicitud</th>
            <th>Trámite</th>
            <th>Fecha Ingreso</th>
            <th>Solicitante</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {staffRequests.map((request) => (
            <tr key={request.id}>
              <td><strong>{request.id}</strong></td>
              <td>{request.procedure}</td>
              <td>{request.date}</td>
              <td>{request.applicant}</td>
              <td><span className={`table-status ${request.statusClass}`}>{request.status}</span></td>
              <td>
                <button
                  className={`table-action ${request.action === 'Continuar' ? 'secondary' : ''}`}
                  onClick={() => navigate(paths.review)}
                >
                  {request.action}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
