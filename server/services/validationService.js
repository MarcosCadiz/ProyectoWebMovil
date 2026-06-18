const rutPattern = /^\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]$/;
const allowedRoles = new Set(['usuario', 'funcionario']);
const allowedDecisions = new Set(['Aprobado', 'Rechazado', 'Observado']);

export function validateRegistration({ name, rut, password, role }) {
  if (!name || !rut || !password) throw new Error('MISSING_REQUIRED_FIELDS');
  if (name.length < 3 || name.length > 120) throw new Error('INVALID_NAME');
  if (!rutPattern.test(rut)) throw new Error('INVALID_RUT');
  if (password.length < 8) throw new Error('PASSWORD_TOO_SHORT');
  if (password.length > 72) throw new Error('PASSWORD_TOO_LONG');
  if (!allowedRoles.has(role)) throw new Error('INVALID_ROLE');
}

export function validateTramitePayload(payload) {
  if (!payload.tipo) throw new Error('TRAMITE_TYPE_REQUIRED');
  if (payload.tipo.length > 120) throw new Error('INVALID_TRAMITE_PAYLOAD');
  if ((payload.descripcion || '').length > 5000) throw new Error('INVALID_TRAMITE_PAYLOAD');
  if ((payload.direccion || '').length > 500) throw new Error('INVALID_TRAMITE_PAYLOAD');
  if (!Array.isArray(payload.documents || [])) throw new Error('INVALID_TRAMITE_PAYLOAD');
  if ((payload.documents || []).length > 20) throw new Error('TOO_MANY_DOCUMENTS');

  for (const document of payload.documents || []) {
    if (!document.name || document.name.length > 180) throw new Error('INVALID_DOCUMENT');
    if ((document.content || '').length > 250_000) throw new Error('DOCUMENT_TOO_LARGE');
  }
}

export function validateResolution(payload) {
  if (!allowedDecisions.has(payload.decision)) throw new Error('INVALID_TRAMITE_DECISION');
  if (!payload.fundamento || !payload.document || !payload.folio) {
    throw new Error('RESOLUTION_FIELDS_REQUIRED');
  }
  if (payload.fundamento.length > 10_000 || payload.document.length > 100_000) {
    throw new Error('INVALID_RESOLUTION_PAYLOAD');
  }
  if (!Array.isArray(payload.nextSteps || []) || (payload.nextSteps || []).length > 15) {
    throw new Error('INVALID_RESOLUTION_PAYLOAD');
  }
}
