import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTramites } from '../../services/tramiteApi';

function staffStatusClass(status) {
  if (status === 'Nueva') return 'new';
  if (status === 'Aprobado') return 'approved';
  if (status === 'Rechazado') return 'rejected';
  return 'review';
}

export default function StaffInbox() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('todos');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTramites()
      .then(setRequests)
      .catch(() => setError('No fue posible cargar la bandeja desde la API.'));
  }, []);

  const filteredRequests = useMemo(() => requests.filter((request) => {
    const matchesQuery = `${request.id} ${request.applicant} ${request.title}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesStatus = status === 'todos' || request.status === status;
    return matchesQuery && matchesStatus;
  }), [query, requests, status]);

  return (
    <main className="staff-content staff-inbox-wide">
      <h1>Bandeja de Entrada DOM</h1>
      <p className="staff-intro">
        Expedientes enviados por usuarios. Los documentos y resoluciones se comparten mediante la API.
      </p>
      <div className="filters">
        <label className="sr-only" htmlFor="staff-search">Buscar expedientes</label>
        <input
          id="staff-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar por solicitud, solicitante o tramite..."
        />
        <label className="sr-only" htmlFor="staff-status">Filtrar por estado</label>
        <select id="staff-status" value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="todos">Todos los estados</option>
          <option value="Nueva">Nuevas</option>
          <option value="En Revision">En revision</option>
          <option value="Observado">Observados</option>
          <option value="Aprobado">Aprobados</option>
          <option value="Rechazado">Rechazados</option>
        </select>
      </div>
      {error ? <p className="staff-error" role="alert">{error}</p> : null}
      <div className="table-scroll">
        <table className="dom-table">
          <caption className="sr-only">Solicitudes disponibles para revision DOM</caption>
          <thead>
            <tr>
              <th>Solicitud</th>
              <th>Tramite</th>
              <th>Fecha ingreso</th>
              <th>Solicitante</th>
              <th>Documentos</th>
              <th>Estado</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td><strong>{request.id}</strong></td>
                <td>{request.title}</td>
                <td>{request.date}</td>
                <td>{request.applicant}</td>
                <td>{request.documents.length}</td>
                <td>
                  <span className={`table-status ${staffStatusClass(request.status)}`}>
                    {request.status}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className="table-action"
                    onClick={() => navigate(`/revision-solicitudes/${encodeURIComponent(request.id)}`)}
                  >
                    Revisar expediente
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
