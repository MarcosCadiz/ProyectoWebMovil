import apiClient from './apiClient';

function statusClass(status) {
  if (status === 'Aprobado') return 'status-success';
  if (status === 'Rechazado' || status === 'Observado') return 'status-danger';
  if (status === 'Borrador') return 'status-neutral';
  return 'status-warning';
}

export function normalizeApiTramite(tramite) {
  return {
    ...tramite,
    title: tramite.tipo,
    date: new Date(tramite.fechaIngreso).toLocaleDateString('es-CL'),
    address: tramite.direccion,
    status: tramite.estado,
    statusClass: statusClass(tramite.estado),
    applicant: tramite.solicitante,
    reviewer: tramite.funcionario || 'Pendiente de asignacion',
    observations: tramite.observaciones,
    generatedDocument: tramite.contenidoSolicitud,
    documents: tramite.documents || [],
    resolution: tramite.resolution,
    progress: tramite.estado === 'Aprobado' || tramite.estado === 'Rechazado'
      ? 100
      : tramite.estado === 'En Revision'
        ? 55
        : tramite.estado === 'Observado'
          ? 40
          : 20,
    showStepper: tramite.estado !== 'Borrador',
  };
}

export async function fetchTramites() {
  const { data } = await apiClient.get('/tramites');
  return data.tramites.map(normalizeApiTramite);
}

export async function fetchTramite(id) {
  const { data } = await apiClient.get(`/tramites/${encodeURIComponent(id)}`);
  return normalizeApiTramite(data.tramite);
}

export async function createTramite(payload) {
  const { data } = await apiClient.post('/tramites', payload);
  return normalizeApiTramite(data.tramite);
}

export async function decideTramite(id, payload) {
  const { data } = await apiClient.post(`/tramites/${encodeURIComponent(id)}/decision`, payload);
  return normalizeApiTramite(data.tramite);
}

export async function updateTramite(id, payload) {
  const { data } = await apiClient.patch(`/tramites/${encodeURIComponent(id)}`, payload);
  return normalizeApiTramite(data.tramite);
}

export async function deleteTramite(id) {
  await apiClient.delete(`/tramites/${encodeURIComponent(id)}`);
}
