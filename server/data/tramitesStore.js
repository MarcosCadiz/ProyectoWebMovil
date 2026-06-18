import { randomUUID } from 'node:crypto';
import { getPool } from '../config/database.js';
import { createNotificationStore } from './notificationsStore.js';

const tramites = [
  {
    internalId: randomUUID(),
    id: 'TR-45092',
    tipo: 'Permiso de Obra Menor',
    estado: 'En Revision',
    fechaIngreso: '2026-05-02T09:12:00.000Z',
    solicitante: 'Juan Perez',
    solicitanteRut: '12.345.678-9',
    direccion: 'Las Araucarias 450, Santo Domingo',
    descripcion: 'Solicitud de permiso para ampliacion menor de vivienda.',
    observaciones: 'Antecedentes completos. En revision normativa.',
    contenidoSolicitud: 'Solicitud digital demo para Permiso de Obra Menor TR-45092.',
    documents: [
      {
        id: randomUUID(),
        name: 'Formulario_Solicitud.pdf',
        category: 'Formulario DOM',
        size: '184 KB',
        status: 'Recibido',
        content: 'Formulario oficial demo de la solicitud TR-45092.',
      },
      {
        id: randomUUID(),
        name: 'Plano_Arquitectura.pdf',
        category: 'Plano',
        size: '1.8 MB',
        status: 'Recibido',
        content: 'Plano demo A-01, escala referencial 1:100.',
      },
    ],
    resolution: null,
  },
  {
    internalId: randomUUID(),
    id: 'TR-44831',
    tipo: 'Regularizacion de Vivienda',
    estado: 'Observado',
    fechaIngreso: '2026-04-15T12:05:00.000Z',
    solicitante: 'Juan Perez',
    solicitanteRut: '12.345.678-9',
    direccion: 'Av. Los Lirios 123, Santo Domingo',
    descripcion: 'Regularizacion de obra existente.',
    observaciones: 'Se requiere plano estructural actualizado y firmado.',
    contenidoSolicitud: 'Solicitud digital demo de regularizacion TR-44831.',
    documents: [
      {
        id: randomUUID(),
        name: 'Plano_Estructural_V1.pdf',
        category: 'Plano',
        size: '2.1 MB',
        status: 'Observado',
        content: 'Plano estructural demo observado por ausencia de firma profesional.',
      },
    ],
    resolution: null,
  },
];

function mapDocument(row) {
  return {
    id: row.id,
    name: row.nombre_archivo,
    category: row.tipo_documento,
    size: row.tamano,
    status: row.estado,
    content: row.contenido,
    observation: row.observacion,
    createdAt: row.created_at,
  };
}

function mapResolution(row) {
  if (!row) return null;

  return {
    id: row.id,
    decision: row.decision,
    fundamento: row.fundamento,
    document: row.documento,
    nextSteps: row.pasos_posteriores || [],
    folio: row.folio,
    funcionario: row.funcionario,
    createdAt: row.created_at,
  };
}

async function enrichDbTramite(pool, row) {
  const [documentsResult, resolutionResult] = await Promise.all([
    pool.query(
      `SELECT id, nombre_archivo, tipo_documento, tamano, contenido, estado, observacion, created_at
       FROM tramite_documentos WHERE tramite_id = $1 ORDER BY created_at`,
      [row.internal_id],
    ),
    pool.query(
      `SELECT r.id, r.decision, r.fundamento, r.documento, r.pasos_posteriores, r.folio,
              r.created_at, u.name AS funcionario
       FROM tramite_resoluciones r
       JOIN users u ON u.id = r.funcionario_id
       WHERE r.tramite_id = $1 ORDER BY r.created_at DESC LIMIT 1`,
      [row.internal_id],
    ),
  ]);

  return {
    internalId: row.internal_id,
    id: row.codigo,
    tipo: row.tipo,
    estado: row.estado,
    fechaIngreso: row.fecha_ingreso,
    solicitante: row.solicitante,
    solicitanteRut: row.solicitante_rut,
    funcionario: row.funcionario,
    direccion: row.direccion,
    descripcion: row.descripcion,
    observaciones: row.observaciones,
    contenidoSolicitud: row.contenido_solicitud,
    documents: documentsResult.rows.map(mapDocument),
    resolution: mapResolution(resolutionResult.rows[0]),
    updatedAt: row.updated_at,
  };
}

const baseSelect = `
  SELECT t.id AS internal_id, t.codigo, t.tipo, t.estado, t.fecha_ingreso,
         t.direccion, t.descripcion, t.observaciones, t.contenido_solicitud, t.updated_at,
         applicant.name AS solicitante, applicant.rut AS solicitante_rut,
         reviewer.name AS funcionario
  FROM tramites t
  JOIN users applicant ON applicant.id = t.solicitante_id
  LEFT JOIN users reviewer ON reviewer.id = t.funcionario_id
`;

function mapAggregatedTramite(row) {
  return {
    internalId: row.internal_id,
    id: row.codigo,
    tipo: row.tipo,
    estado: row.estado,
    fechaIngreso: row.fecha_ingreso,
    solicitante: row.solicitante,
    solicitanteRut: row.solicitante_rut,
    funcionario: row.funcionario,
    direccion: row.direccion,
    descripcion: row.descripcion,
    observaciones: row.observaciones,
    contenidoSolicitud: row.contenido_solicitud,
    documents: row.documents || [],
    resolution: row.resolution || null,
    updatedAt: row.updated_at,
  };
}

export async function listTramitesStore(user, options = {}) {
  const pool = getPool();
  const limit = Math.min(Math.max(Number(options.limit) || 50, 1), 100);
  const offset = Math.max(Number(options.offset) || 0, 0);
  const status = options.status || '';
  const search = options.search || '';

  if (!pool) {
    const accessible = user.role === 'funcionario'
      ? tramites
      : tramites.filter((tramite) => tramite.solicitanteRut === user.rut);

    return accessible
      .filter((tramite) => !status || tramite.estado === status)
      .filter((tramite) => {
        if (!search) return true;
        return `${tramite.id} ${tramite.tipo} ${tramite.solicitante}`
          .toLowerCase()
          .includes(search.toLowerCase());
      })
      .slice(offset, offset + limit);
  }

  const values = [];
  const conditions = [];

  if (user.role !== 'funcionario') {
    values.push(user.id);
    conditions.push(`t.solicitante_id = $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`t.estado = $${values.length}`);
  }

  if (search) {
    values.push(`%${search}%`);
    conditions.push(`(
      t.codigo ILIKE $${values.length}
      OR t.tipo ILIKE $${values.length}
      OR applicant.name ILIKE $${values.length}
    )`);
  }

  values.push(limit, offset);
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const limitParameter = `$${values.length - 1}`;
  const offsetParameter = `$${values.length}`;

  const result = await pool.query(
    `
      SELECT t.id AS internal_id, t.codigo, t.tipo, t.estado, t.fecha_ingreso,
             t.direccion, t.descripcion, t.observaciones, t.contenido_solicitud, t.updated_at,
             applicant.name AS solicitante, applicant.rut AS solicitante_rut,
             reviewer.name AS funcionario,
             COALESCE((
               SELECT jsonb_agg(
                 jsonb_build_object(
                   'id', d.id,
                   'name', d.nombre_archivo,
                   'category', d.tipo_documento,
                   'size', d.tamano,
                   'status', d.estado,
                   'content', d.contenido,
                   'observation', d.observacion,
                   'createdAt', d.created_at
                 ) ORDER BY d.created_at
               )
               FROM tramite_documentos d
               WHERE d.tramite_id = t.id
             ), '[]'::jsonb) AS documents,
             (
               SELECT jsonb_build_object(
                 'id', r.id,
                 'decision', r.decision,
                 'fundamento', r.fundamento,
                 'document', r.documento,
                 'nextSteps', r.pasos_posteriores,
                 'folio', r.folio,
                 'funcionario', resolution_user.name,
                 'createdAt', r.created_at
               )
               FROM tramite_resoluciones r
               JOIN users resolution_user ON resolution_user.id = r.funcionario_id
               WHERE r.tramite_id = t.id
               ORDER BY r.created_at DESC
               LIMIT 1
             ) AS resolution
      FROM tramites t
      JOIN users applicant ON applicant.id = t.solicitante_id
      LEFT JOIN users reviewer ON reviewer.id = t.funcionario_id
      ${where}
      ORDER BY t.fecha_ingreso DESC
      LIMIT ${limitParameter} OFFSET ${offsetParameter}
    `,
    values,
  );

  return result.rows.map(mapAggregatedTramite);
}

export async function findTramiteById(id, user) {
  const pool = getPool();

  if (!pool) {
    const tramite = tramites.find((item) => item.id === id);
    if (!tramite) return null;
    if (user.role !== 'funcionario' && tramite.solicitanteRut !== user.rut) return null;
    return tramite;
  }

  const values = [id];
  let access = '';

  if (user.role !== 'funcionario') {
    values.push(user.id);
    access = 'AND t.solicitante_id = $2';
  }

  const result = await pool.query(
    `${baseSelect} WHERE t.codigo = $1 ${access} LIMIT 1`,
    values,
  );

  return result.rows[0] ? enrichDbTramite(pool, result.rows[0]) : null;
}

export async function createTramiteStore({ tipo, descripcion, direccion, observaciones, contenidoSolicitud, documents }, user) {
  const pool = getPool();
  const codigo = `TR-${Date.now()}`;

  if (!pool) {
    const tramite = {
      internalId: randomUUID(),
      id: codigo,
      tipo,
      estado: 'Nueva',
      fechaIngreso: new Date().toISOString(),
      solicitante: user.name,
      solicitanteRut: user.rut,
      direccion: direccion || '',
      descripcion: descripcion || '',
      observaciones: observaciones || '',
      contenidoSolicitud: contenidoSolicitud || '',
      documents: (documents || []).map((document) => ({
        id: randomUUID(),
        name: document.name,
        category: document.category,
        size: document.size,
        status: 'Recibido',
        content: document.content || `Documento demo asociado a ${codigo}: ${document.name}`,
      })),
      resolution: null,
    };

    tramites.unshift(tramite);
    return tramite;
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const result = await client.query(
      `INSERT INTO tramites
       (codigo, tipo, estado, solicitante_id, direccion, descripcion, observaciones, contenido_solicitud)
       VALUES ($1, $2, 'Nueva', $3, $4, $5, $6, $7)
       RETURNING id`,
      [codigo, tipo, user.id, direccion || null, descripcion || null, observaciones || null, contenidoSolicitud || null],
    );

    for (const document of documents || []) {
      await client.query(
        `INSERT INTO tramite_documentos
         (tramite_id, nombre_archivo, tipo_documento, tamano, contenido, estado, uploaded_by)
         VALUES ($1, $2, $3, $4, $5, 'Recibido', $6)`,
        [
          result.rows[0].id,
          document.name,
          document.category || 'Otro antecedente',
          document.size || null,
          document.content || `Documento demo asociado a ${codigo}: ${document.name}`,
          user.id,
        ],
      );
    }

    await client.query('COMMIT');
    return findTramiteById(codigo, user);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function updateTramiteStore(id, updates, user) {
  const pool = getPool();

  if (!pool) {
    const tramite = await findTramiteById(id, user);
    if (!tramite) return null;
    for (const key of ['tipo', 'descripcion', 'estado', 'observaciones']) {
      if (updates[key] !== undefined) tramite[key] = updates[key];
    }
    tramite.updatedAt = new Date().toISOString();
    return tramite;
  }

  const current = await findTramiteById(id, user);
  if (!current) return null;

  await pool.query(
    `UPDATE tramites SET
       tipo = COALESCE($2, tipo),
       descripcion = COALESCE($3, descripcion),
       estado = COALESCE($4, estado),
       observaciones = COALESCE($5, observaciones),
       updated_at = NOW()
     WHERE codigo = $1`,
    [id, updates.tipo ?? null, updates.descripcion ?? null, updates.estado ?? null, updates.observaciones ?? null],
  );

  return findTramiteById(id, user);
}

export async function createResolutionStore(id, payload, user) {
  const tramite = await findTramiteById(id, user);
  if (!tramite) return null;

  const resolution = {
    id: randomUUID(),
    decision: payload.decision,
    fundamento: payload.fundamento,
    document: payload.document,
    nextSteps: payload.nextSteps || [],
    folio: payload.folio,
    funcionario: user.name,
    createdAt: new Date().toISOString(),
  };

  const pool = getPool();

  if (!pool) {
    tramite.estado = payload.decision;
    tramite.observaciones = payload.fundamento;
    tramite.funcionario = user.name;
    tramite.resolution = resolution;
    tramite.updatedAt = resolution.createdAt;
    await createNotificationStore({
      userRut: tramite.solicitanteRut,
      tramiteId: tramite.id,
      title: `Tramite ${payload.decision}`,
      body: `La solicitud ${tramite.id} fue ${payload.decision.toLowerCase()}. Folio: ${payload.folio}.`,
    });
    return tramite;
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    await client.query(
      `UPDATE tramites SET estado = $2, funcionario_id = $3, observaciones = $4, updated_at = NOW()
       WHERE codigo = $1`,
      [id, payload.decision, user.id, payload.fundamento],
    );
    await client.query(
      `INSERT INTO tramite_resoluciones
       (tramite_id, funcionario_id, decision, fundamento, documento, pasos_posteriores, folio)
       VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7)`,
      [
        tramite.internalId,
        user.id,
        payload.decision,
        payload.fundamento,
        payload.document,
        JSON.stringify(payload.nextSteps || []),
        payload.folio,
      ],
    );
    await client.query('COMMIT');
    const updatedTramite = await findTramiteById(id, user);
    await createNotificationStore({
      userRut: tramite.solicitanteRut,
      tramiteInternalId: tramite.internalId,
      tramiteId: tramite.id,
      title: `Tramite ${payload.decision}`,
      body: `La solicitud ${tramite.id} fue ${payload.decision.toLowerCase()}. Folio: ${payload.folio}.`,
    });
    return updatedTramite;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function deleteTramiteStore(id, user) {
  const tramite = await findTramiteById(id, user);
  if (!tramite) return null;

  const pool = getPool();

  if (!pool) {
    const index = tramites.findIndex((item) => item.id === id);
    return tramites.splice(index, 1)[0];
  }

  await pool.query('DELETE FROM tramites WHERE codigo = $1', [id]);
  return tramite;
}
