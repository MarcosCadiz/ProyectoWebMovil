import {
  createTramiteStore,
  createResolutionStore,
  deleteTramiteStore,
  findTramiteById,
  listTramitesStore,
  updateTramiteStore,
} from '../data/tramitesStore.js';
import { validateResolution, validateTramitePayload } from '../services/validationService.js';

export async function listTramites(req, res) {
  const tramites = await listTramitesStore(req.user, {
    limit: req.query.limit,
    offset: req.query.offset,
    status: req.query.status,
    search: req.query.search,
  });

  return res.json({
    tramites,
    pagination: {
      limit: Math.min(Math.max(Number(req.query.limit) || 50, 1), 100),
      offset: Math.max(Number(req.query.offset) || 0, 0),
      returned: tramites.length,
    },
  });
}

export async function getTramite(req, res) {
  const tramite = await findTramiteById(req.params.id, req.user);

  if (!tramite) {
    throw new Error('TRAMITE_NOT_FOUND');
  }

  return res.json({ tramite });
}

export async function createTramite(req, res) {
  const {
    tipo,
    descripcion,
    direccion,
    observaciones,
    contenidoSolicitud,
    documents,
  } = req.body;

  validateTramitePayload({ tipo, descripcion, direccion, observaciones, contenidoSolicitud, documents });

  const tramite = await createTramiteStore({
    tipo,
    descripcion,
    direccion,
    observaciones,
    contenidoSolicitud,
    documents,
  }, req.user);

  return res.status(201).json({ tramite });
}

export async function updateTramite(req, res) {
  const { tipo, descripcion, estado, observaciones } = req.body;

  if (tipo === undefined && descripcion === undefined && estado === undefined && observaciones === undefined) {
    throw new Error('TRAMITE_UPDATE_REQUIRED');
  }

  const tramite = await updateTramiteStore(
    req.params.id,
    { tipo, descripcion, estado, observaciones },
    req.user,
  );

  if (!tramite) {
    throw new Error('TRAMITE_NOT_FOUND');
  }

  return res.json({ tramite });
}

export async function decideTramite(req, res) {
  const { decision, fundamento, document, nextSteps, folio } = req.body;

  validateResolution({ decision, fundamento, document, nextSteps, folio });

  const tramite = await createResolutionStore(req.params.id, {
    decision,
    fundamento,
    document,
    nextSteps,
    folio,
  }, req.user);

  if (!tramite) {
    throw new Error('TRAMITE_NOT_FOUND');
  }

  return res.status(201).json({ tramite });
}

export async function deleteTramite(req, res) {
  const tramite = await deleteTramiteStore(req.params.id, req.user);

  if (!tramite) {
    throw new Error('TRAMITE_NOT_FOUND');
  }

  return res.status(204).send();
}
