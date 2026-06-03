import { tramites } from '../data/tramitesStore.js';

export function listTramites(req, res) {
  return res.json({ tramites });
}

export function createTramite(req, res) {
  const tramite = {
    id: `#${Date.now()}`,
    estado: 'Nueva',
    fechaIngreso: new Date().toISOString(),
    solicitante: req.user.name,
    ...req.body,
  };

  tramites.push(tramite);

  return res.status(201).json({ tramite });
}
