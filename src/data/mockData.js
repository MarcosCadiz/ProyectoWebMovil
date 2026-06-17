export const publicUser = 'Juan Perez';
export const staffUser = 'Roberto Gomez';

export const userRequests = [
  {
    title: 'Permiso de Obra Menor',
    id: 'TR-45092',
    date: '02/05/2026',
    address: 'Las Araucarias 450, Santo Domingo',
    status: 'En Revision (Filtro 1)',
    statusClass: 'status-warning',
    action: 'Ver Detalles',
    to: '/chat-audiencia',
    showStepper: true,
    description: 'Solicitud de permiso para ampliacion menor de vivienda.',
    documents: [
      { name: 'Formulario_Solicitud.pdf', category: 'Formulario DOM', status: 'Recibido' },
      { name: 'Plano_Arquitectura.pdf', category: 'Plano', status: 'Recibido' },
    ],
  },
  {
    title: 'Regularizacion de Vivienda',
    id: 'TR-44831',
    date: '15/04/2026',
    address: 'Av. Los Lirios 123, Santo Domingo',
    status: 'Observado - Falta PDF',
    statusClass: 'status-danger',
    action: 'Ver Detalles',
    to: '/chat-audiencia',
    description: 'Regularizacion de obra existente con observacion pendiente.',
    documents: [
      { name: 'Formulario_Solicitud.pdf', category: 'Formulario DOM', status: 'Recibido' },
      { name: 'Plano_Estructural_V1.pdf', category: 'Plano', status: 'Observado' },
    ],
  },
  {
    title: 'Patente Comercial',
    id: 'TR-41200',
    date: '10/01/2026',
    address: 'Plaza Principal Local 4',
    status: 'Aprobado',
    statusClass: 'status-success',
    action: 'Descargar Certificado',
    to: '/mis-solicitudes',
    description: 'Solicitud aprobada para patente comercial.',
    documents: [
      { name: 'Certificado_Patente_Comercial.pdf', category: 'Certificado', status: 'Emitido' },
    ],
  },
];

export const notifications = [
  {
    icon: '!',
    iconClass: '',
    unread: true,
    title: 'Tramite Observado - Accion Requerida',
    description: 'El funcionario DOM ha revisado su Regularizacion de Vivienda (Sol. TR-44831). Se requiere adjuntar el plano estructural actualizado en formato PDF.',
    highlight: 'Regularizacion de Vivienda (Sol. TR-44831)',
    time: 'Hoy, 10:30 hrs',
    action: 'Subir Documento',
    to: '/subir-archivos',
  },
  {
    icon: 'OK',
    iconClass: 'success',
    unread: true,
    title: 'Tramite Aprobado',
    description: 'Su solicitud de Patente Comercial (Sol. TR-41200) ha superado la revision normativa y ha sido aprobada exitosamente.',
    highlight: 'Patente Comercial (Sol. TR-41200)',
    time: 'Hoy, 08:15 hrs',
    action: 'Descargar Certificado',
    to: '/mis-solicitudes',
  },
  {
    icon: 'DOC',
    iconClass: 'neutral',
    title: 'Solicitud Ingresada a Revision',
    description: 'Su Permiso de Obra Menor (Sol. TR-45092) ha pasado el filtro inicial y ahora se encuentra en revision normativa.',
    highlight: 'Permiso de Obra Menor (Sol. TR-45092)',
    time: 'Ayer, 14:30 hrs',
    action: 'Ver Tramite',
    to: '/mis-solicitudes',
  },
];

export const staffRequests = [
  {
    id: 'TR-45098',
    procedure: 'Permiso de Obra Menor',
    date: '06/05/2026',
    applicant: 'Juan Perez',
    status: 'NUEVA',
    statusClass: 'new',
    action: 'Iniciar Revision',
  },
  {
    id: 'TR-45097',
    procedure: 'Regularizacion Vivienda',
    date: '05/05/2026',
    applicant: 'Maria Silva',
    status: 'NUEVA',
    statusClass: 'new',
    action: 'Iniciar Revision',
  },
  {
    id: 'TR-45090',
    procedure: 'Patente Comercial',
    date: '04/05/2026',
    applicant: 'Constructora XYZ',
    status: 'En Revision',
    statusClass: 'review',
    action: 'Continuar',
  },
];

export const projectDocuments = [
  'Formulario_Solicitud.pdf',
  'Plano_Arquitectura.pdf',
  'Especificaciones_Tecnicas.pdf',
];

export const reviewChecklist = [
  'El uso de suelo propuesto es compatible con la Zona ZU-2 del Plan Regulador Comunal vigente.',
  'Cumple con las normas de distanciamiento, adosamiento y rasantes (Art. 2.6.3 OGUC).',
  'El coeficiente de constructibilidad y ocupacion de suelo estan dentro de los limites permitidos.',
  'La planimetria coincide con las especificaciones tecnicas adjuntas.',
];

export const chatMessages = [
  {
    from: 'Funcionario DOM',
    time: 'Ayer, 10:30 hrs',
    text: 'Estimado Juan, hemos revisado su solicitud. El plano estructural adjunto no respeta el distanciamiento exigido hacia el predio colindante oriente. Por favor, corrija la planimetria y vuelva a subirla en el Gestor de Documentos para continuar la revision.',
  },
  {
    from: 'Tu',
    time: 'Hoy, 09:15 hrs',
    mine: true,
    text: 'Buenos dias. Comprendo la observacion. Acabo de subir la version corregida (Plano_Estructural_V2.pdf) en el apartado de documentos. Quedo atento a sus comentarios.',
  },
];

export const uploadedDocuments = [
  'Formulario_Solicitud.pdf',
  'Plano_Estructural_V2.pdf',
];
