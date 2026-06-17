import { userRequests } from '../data/mockData';

const STORAGE_KEY = 'dom_tramites_workspace';

export const tramiteTypes = [
  'Permiso de Obra Menor',
  'Regularizacion de Vivienda',
  'Recepcion Final',
  'Certificado de Informaciones Previas',
  'Patente Comercial',
];

export const documentCategories = [
  'Formulario DOM',
  'Plano',
  'Especificaciones tecnicas',
  'Certificado',
  'Fotografia',
  'Otro antecedente',
];

function canUseStorage() {
  return typeof window !== 'undefined' && window.localStorage;
}

function normalizeRequest(request) {
  return {
    ...request,
    documents: request.documents || [],
    description: request.description || '',
  };
}

function seedRequests() {
  return userRequests.map(normalizeRequest);
}

export function loadTramites() {
  if (!canUseStorage()) {
    return seedRequests();
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    const seeded = seedRequests();
    saveTramites(seeded);
    return seeded;
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.map(normalizeRequest) : seedRequests();
  } catch {
    return seedRequests();
  }
}

export function saveTramites(tramites) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tramites));
}

export function createLocalTramite(form, status = 'Ingresado') {
  const timestamp = Date.now();

  return {
    id: `TR-${timestamp}`,
    title: form.tipo,
    date: new Date().toLocaleDateString('es-CL'),
    address: form.direccion,
    status,
    statusClass: status === 'Borrador' ? 'status-neutral' : 'status-warning',
    action: status === 'Borrador' ? 'Continuar Borrador' : 'Ver Detalles',
    to: '/mis-solicitudes',
    showStepper: status !== 'Borrador',
    applicant: form.solicitante,
    description: form.descripcion,
    observations: form.observaciones,
    generatedDocument: form.generatedDocument,
    documents: form.documents || [],
  };
}

export function addTramite(tramite) {
  const tramites = [tramite, ...loadTramites()];
  saveTramites(tramites);
  return tramites;
}

export function formatFileSize(size = 0) {
  if (!size) return '0 KB';

  const kb = size / 1024;

  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  return `${(kb / 1024).toFixed(1)} MB`;
}

export function buildSolicitudText(form, documents) {
  const docList = documents.length
    ? documents.map((doc, index) => `${index + 1}. ${doc.name} (${doc.category})`).join('\n')
    : 'Sin documentos adjuntos al momento de generar el borrador.';

  return [
    'SOLICITUD DIGITAL DIRECCION DE OBRAS MUNICIPALES',
    'Municipalidad de Santo Domingo',
    '',
    `Tipo de tramite: ${form.tipo || 'Pendiente de seleccion'}`,
    `Solicitante: ${form.solicitante || 'Pendiente'}`,
    `RUT solicitante: ${form.rut || 'Pendiente'}`,
    `Direccion del proyecto: ${form.direccion || 'Pendiente'}`,
    '',
    'Descripcion del requerimiento:',
    form.descripcion || 'Pendiente de completar.',
    '',
    'Observaciones del solicitante:',
    form.observaciones || 'Sin observaciones adicionales.',
    '',
    'Documentos adjuntos:',
    docList,
    '',
    'Declaracion:',
    'Declaro que la informacion ingresada corresponde a los antecedentes disponibles para la revision DOM.',
  ].join('\n');
}
