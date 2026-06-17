export const tramites = [
  {
    id: 'TR-45092',
    tipo: 'Permiso de Obra Menor',
    estado: 'En Revision',
    fechaIngreso: '02/05/2026',
    solicitante: 'Juan Perez',
    descripcion: 'Tramite de demostracion para revision DOM.',
  },
  {
    id: 'TR-44831',
    tipo: 'Regularizacion de Vivienda',
    estado: 'Observado',
    fechaIngreso: '15/04/2026',
    solicitante: 'Juan Perez',
    descripcion: 'Solicitud observada por documentos pendientes.',
  },
  {
    id: 'TR-45098',
    tipo: 'Permiso de Obra Menor',
    estado: 'Nueva',
    fechaIngreso: '06/05/2026',
    solicitante: 'Juan Perez',
    descripcion: 'Solicitud nueva pendiente de asignacion.',
  },
];

export function listTramitesStore() {
  return tramites;
}

export function findTramiteById(id) {
  return tramites.find((tramite) => tramite.id === id);
}

export function createTramiteStore({ tipo, descripcion, solicitante }) {
  const tramite = {
    id: `TR-${Date.now()}`,
    tipo,
    estado: 'Nueva',
    fechaIngreso: new Date().toISOString(),
    solicitante,
    descripcion: descripcion || '',
  };

  tramites.push(tramite);
  return tramite;
}

export function updateTramiteStore(id, updates) {
  const tramite = findTramiteById(id);

  if (!tramite) {
    return null;
  }

  const allowedUpdates = ['tipo', 'descripcion', 'estado'];

  for (const key of allowedUpdates) {
    if (updates[key] !== undefined) {
      tramite[key] = updates[key];
    }
  }

  tramite.updatedAt = new Date().toISOString();
  return tramite;
}

export function deleteTramiteStore(id) {
  const index = tramites.findIndex((tramite) => tramite.id === id);

  if (index === -1) {
    return null;
  }

  const [deletedTramite] = tramites.splice(index, 1);
  return deletedTramite;
}
