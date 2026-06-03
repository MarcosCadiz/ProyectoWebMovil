import { tramites } from '../data/tramitesStore.js';

export function listTramites(req, res) {
  return res.json({ tramites });
}

export function createTramite(req, res) {
  const { tipo, descripcion } = req.body;

  if (!tipo) {
    throw new Error('TRAMITE_TYPE_REQUIRED');
  }

  const tramite = {
    id: `#${Date.now()}`,
    tipo,
    estado: 'Nueva',
    fechaIngreso: new Date().toISOString(),
    solicitante: req.user.name,
    descripcion: descripcion || '',
  };

  tramites.push(tramite);

  return res.status(201).json({ tramite });
}
