export const publicUser = 'Juan Pérez';
export const staffUser = 'Roberto Gómez';

export const userRequests = [
  {
    title: 'Permiso de Obra Menor',
    id: '#45092',
    date: '02/05/2026',
    address: 'Las Araucarias 450, Santo Domingo',
    status: 'En Revisión (Filtro 1)',
    statusClass: 'status-warning',
    action: 'Ver Detalles',
    to: '/chat-audiencia',
    showStepper: true,
  },
  {
    title: 'Regularización de Vivienda',
    id: '#44831',
    date: '15/04/2026',
    address: 'Av. Los Lirios 123, Santo Domingo',
    status: 'Observado - Falta PDF',
    statusClass: 'status-danger',
    action: 'Ver Detalles',
    to: '/chat-audiencia',
  },
  {
    title: 'Patente Comercial',
    id: '#41200',
    date: '10/01/2026',
    address: 'Plaza Principal Local 4',
    status: 'Aprobado',
    statusClass: 'status-success',
    action: 'Descargar Certificado',
    to: '/mis-solicitudes',
  },
];

export const notifications = [
  {
    icon: '!',
    iconClass: '',
    unread: true,
    title: 'Trámite Observado - Acción Requerida',
    description: 'El funcionario DOM ha revisado su Regularización de Vivienda (Sol. #44831). Se requiere adjuntar el plano estructural actualizado en formato PDF.',
    highlight: 'Regularización de Vivienda (Sol. #44831)',
    time: 'Hoy, 10:30 hrs',
    action: 'Subir Documento',
    to: '/subir-archivos',
  },
  {
    icon: '✓',
    iconClass: 'success',
    unread: true,
    title: '¡Trámite Aprobado!',
    description: 'Su solicitud de Patente Comercial (Sol. #41200) ha superado la revisión normativa y ha sido aprobada exitosamente.',
    highlight: 'Patente Comercial (Sol. #41200)',
    time: 'Hoy, 08:15 hrs',
    action: 'Descargar Certificado',
    to: '/mis-solicitudes',
  },
  {
    icon: '▣',
    iconClass: 'neutral',
    title: 'Solicitud Ingresada a Revisión',
    description: 'Su Permiso de Obra Menor (Sol. #45092) ha pasado el filtro inicial y ahora se encuentra en revisión normativa.',
    highlight: 'Permiso de Obra Menor (Sol. #45092)',
    time: 'Ayer, 14:30 hrs',
    action: 'Ver Trámite',
    to: '/mis-solicitudes',
  },
];

export const staffRequests = [
  {
    id: '#45098',
    procedure: 'Permiso de Obra Menor',
    date: '06/05/2026',
    applicant: 'Juan Pérez',
    status: 'NUEVA',
    statusClass: 'new',
    action: 'Iniciar Revisión',
  },
  {
    id: '#45097',
    procedure: 'Regularización Vivienda',
    date: '05/05/2026',
    applicant: 'María Silva',
    status: 'NUEVA',
    statusClass: 'new',
    action: 'Iniciar Revisión',
  },
  {
    id: '#45090',
    procedure: 'Patente Comercial',
    date: '04/05/2026',
    applicant: 'Constructora XYZ',
    status: 'En Revisión',
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
  'El coeficiente de constructibilidad y ocupación de suelo están dentro de los límites permitidos.',
  'La planimetría coincide con las especificaciones técnicas adjuntas.',
];

export const chatMessages = [
  {
    from: 'Funcionario DOM',
    time: 'Ayer, 10:30 hrs',
    text: 'Estimado Juan, hemos revisado su solicitud. El plano estructural adjunto no respeta el distanciamiento exigido hacia el predio colindante oriente. Por favor, corrija la planimetría y vuelva a subirla en el Gestor de Documentos para continuar la revisión.',
  },
  {
    from: 'Tú',
    time: 'Hoy, 09:15 hrs',
    mine: true,
    text: 'Buenos días. Comprendo la observación. Acabo de subir la versión corregida (Plano_Estructural_V2.pdf) en el apartado de documentos. Quedo atento a sus comentarios.',
  },
];

export const uploadedDocuments = [
  'Formulario_Solicitud.pdf',
  'Plano_Estructural_V2.pdf',
];
