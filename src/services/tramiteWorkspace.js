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
  const seed = userRequests.find((item) => item.id === request.id) || {};

  return {
    ...seed,
    ...request,
    documents: request.documents?.length ? request.documents : seed.documents || [],
    description: request.description || seed.description || '',
    history: request.history?.length ? request.history : seed.history || [],
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
  const now = new Date().toLocaleString('es-CL');

  return {
    id: `TR-${timestamp}`,
    title: form.tipo,
    date: new Date().toLocaleDateString('es-CL'),
    address: form.direccion,
    status,
    statusClass: status === 'Borrador' ? 'status-neutral' : 'status-warning',
    action: status === 'Borrador' ? 'Continuar Borrador' : 'Ver Detalles',
    showStepper: status !== 'Borrador',
    applicant: form.solicitante,
    reviewer: status === 'Borrador' ? 'Sin asignar' : 'Pendiente de asignacion',
    expediente: status === 'Borrador' ? 'Borrador sin expediente' : `DOM-DIG-${timestamp}`,
    propertyRole: 'Pendiente de validacion',
    lastUpdate: now,
    progress: status === 'Borrador' ? 10 : 20,
    description: form.descripcion,
    observations: form.observaciones,
    generatedDocument: form.generatedDocument,
    documents: form.documents || [],
    history: [
      {
        date: now,
        title: status === 'Borrador' ? 'Borrador guardado' : 'Solicitud ingresada',
        description: status === 'Borrador'
          ? 'La solicitud permanece editable y aun no ha sido enviada a revision.'
          : 'La solicitud fue registrada y queda pendiente de revision documental.',
      },
    ],
  };
}

export function addTramite(tramite) {
  const tramites = [tramite, ...loadTramites()];
  saveTramites(tramites);
  return tramites;
}

export function findTramite(id) {
  return loadTramites().find((tramite) => tramite.id === id) || null;
}

export function downloadTextDocument(filename, content) {
  if (typeof document === 'undefined') return;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function buildTramiteSummary(tramite) {
  const documents = tramite.documents?.length
    ? tramite.documents.map((doc, index) => `${index + 1}. ${doc.name} - ${doc.status}`).join('\n')
    : 'Sin documentos asociados.';

  return [
    'RESUMEN DE EXPEDIENTE DOM - DEMO',
    'Municipalidad de Santo Domingo',
    '',
    `Solicitud: ${tramite.id}`,
    `Expediente: ${tramite.expediente || 'Pendiente'}`,
    `Tramite: ${tramite.title}`,
    `Estado: ${tramite.status}`,
    `Fecha de ingreso: ${tramite.date}`,
    `Direccion: ${tramite.address || 'Pendiente'}`,
    `Solicitante: ${tramite.applicant || 'Juan Perez'}`,
    `Funcionario asignado: ${tramite.reviewer || 'Pendiente de asignacion'}`,
    '',
    'Descripcion:',
    tramite.description || 'Sin descripcion.',
    '',
    'Observaciones:',
    tramite.observations || 'Sin observaciones.',
    '',
    'Documentos:',
    documents,
    '',
    'Documento demostrativo sin validez legal.',
  ].join('\n');
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
