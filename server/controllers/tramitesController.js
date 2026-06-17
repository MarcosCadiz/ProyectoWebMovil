import {
  createTramiteStore,
  deleteTramiteStore,
  findTramiteById,
  listTramitesStore,
  updateTramiteStore,
} from '../data/tramitesStore.js';

export function listTramites(req, res) {
  return res.json({ tramites: listTramitesStore() });
}

export function getTramite(req, res) {
  const tramite = findTramiteById(req.params.id);

  if (!tramite) {
    throw new Error('TRAMITE_NOT_FOUND');
  }

  return res.json({ tramite });
}

export function createTramite(req, res) {
  const { tipo, descripcion } = req.body;

  if (!tipo) {
    throw new Error('TRAMITE_TYPE_REQUIRED');
  }

  const tramite = createTramiteStore({
    tipo,
    solicitante: req.user.name,
    descripcion,
  });

  return res.status(201).json({ tramite });
}

export function updateTramite(req, res) {
  const { tipo, descripcion, estado } = req.body;

  if (tipo === undefined && descripcion === undefined && estado === undefined) {
    throw new Error('TRAMITE_UPDATE_REQUIRED');
  }

  const tramite = updateTramiteStore(req.params.id, { tipo, descripcion, estado });

  if (!tramite) {
    throw new Error('TRAMITE_NOT_FOUND');
  }

  return res.json({ tramite });
}

export function deleteTramite(req, res) {
  const tramite = deleteTramiteStore(req.params.id);

  if (!tramite) {
    throw new Error('TRAMITE_NOT_FOUND');
  }

  return res.status(204).send();
}
