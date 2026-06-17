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
    reviewer: 'Roberto Gomez - Arquitecto Revisor DOM',
    expediente: 'DOM-POM-2026-184',
    propertyRole: 'Manzana 18, Predio 42',
    lastUpdate: '06/05/2026, 14:30 hrs',
    progress: 55,
    showStepper: true,
    description: 'Solicitud de permiso para ampliacion menor de vivienda.',
    observations: 'Antecedentes completos. La solicitud se encuentra en revision normativa.',
    documents: [
      { name: 'Formulario_Solicitud.pdf', category: 'Formulario DOM', status: 'Recibido', content: 'Formulario oficial de solicitud de Permiso de Obra Menor. Solicitante: Juan Perez. Direccion: Las Araucarias 450, Santo Domingo.' },
      { name: 'Plano_Arquitectura.pdf', category: 'Plano', status: 'Recibido', content: 'Plano de arquitectura demo. Lamina A-01. Escala referencial 1:100. Superficie proyectada: 38,5 m2.' },
    ],
    history: [
      { date: '02/05/2026, 09:12 hrs', title: 'Solicitud ingresada', description: 'Se genero el expediente DOM-POM-2026-184.' },
      { date: '03/05/2026, 11:40 hrs', title: 'Revision documental completa', description: 'Los documentos obligatorios fueron recibidos correctamente.' },
      { date: '06/05/2026, 14:30 hrs', title: 'Revision normativa iniciada', description: 'La solicitud fue asignada al arquitecto revisor.' },
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
    reviewer: 'Carolina Munoz - Revisora DOM',
    expediente: 'DOM-REG-2026-097',
    propertyRole: 'Manzana 7, Predio 15',
    lastUpdate: '17/06/2026, 10:30 hrs',
    progress: 35,
    description: 'Regularizacion de obra existente con observacion pendiente.',
    observations: 'Se requiere reemplazar el plano estructural por una version firmada y actualizada.',
    documents: [
      { name: 'Formulario_Solicitud.pdf', category: 'Formulario DOM', status: 'Recibido', content: 'Formulario de regularizacion de vivienda. Solicitante: Juan Perez. Superficie declarada: 72 m2.' },
      { name: 'Plano_Estructural_V1.pdf', category: 'Plano', status: 'Observado', content: 'Plano estructural version 1. Documento observado por ausencia de firma profesional y diferencias en cotas.' },
    ],
    history: [
      { date: '15/04/2026, 12:05 hrs', title: 'Solicitud ingresada', description: 'Se genero el expediente DOM-REG-2026-097.' },
      { date: '16/04/2026, 09:20 hrs', title: 'Antecedentes derivados', description: 'La solicitud fue enviada a revision tecnica.' },
      { date: '17/06/2026, 10:30 hrs', title: 'Observacion emitida', description: 'Se solicito un nuevo plano estructural firmado.' },
    ],
  },
  {
    title: 'Patente Comercial',
    id: 'TR-41200',
    date: '10/01/2026',
    address: 'Plaza Principal Local 4',
    status: 'Aprobado',
    statusClass: 'status-success',
    action: 'Ver Detalles',
    downloadable: true,
    reviewer: 'Roberto Gomez - Arquitecto Revisor DOM',
    expediente: 'DOM-PAT-2026-021',
    propertyRole: 'Local comercial 4',
    lastUpdate: '28/01/2026, 16:10 hrs',
    progress: 100,
    description: 'Solicitud aprobada para patente comercial.',
    observations: 'Tramite finalizado sin observaciones pendientes.',
    certificate: {
      name: 'Certificado_Patente_Comercial_TR-41200.txt',
      folio: 'CERT-DOM-2026-00412',
      issuedAt: '28/01/2026',
      content: 'CERTIFICADO DEMO DE APROBACION\nMunicipalidad de Santo Domingo\nFolio: CERT-DOM-2026-00412\nSolicitud: TR-41200\nTitular: Juan Perez\nUbicacion: Plaza Principal Local 4\nResultado: APROBADO\nFecha de emision: 28/01/2026\n\nDocumento demostrativo sin validez legal.',
    },
    documents: [
      { name: 'Resolucion_Aprobacion.txt', category: 'Resolucion', status: 'Emitido', content: 'Resolucion demo: se aprueba la solicitud de patente comercial TR-41200, sujeta a las condiciones municipales vigentes.' },
    ],
    history: [
      { date: '10/01/2026, 08:45 hrs', title: 'Solicitud ingresada', description: 'Se genero el expediente DOM-PAT-2026-021.' },
      { date: '19/01/2026, 13:15 hrs', title: 'Revision completada', description: 'La documentacion comercial fue validada.' },
      { date: '28/01/2026, 16:10 hrs', title: 'Tramite aprobado', description: 'Se emitio el certificado de aprobacion demo.' },
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
    helpTo: '/chat-audiencia?tramite=TR-44831',
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
    to: '/mis-solicitudes/TR-41200',
    helpTo: '/chat-audiencia?tramite=TR-41200',
  },
  {
    icon: 'DOC',
    iconClass: 'neutral',
    title: 'Solicitud Ingresada a Revision',
    description: 'Su Permiso de Obra Menor (Sol. TR-45092) ha pasado el filtro inicial y ahora se encuentra en revision normativa.',
    highlight: 'Permiso de Obra Menor (Sol. TR-45092)',
    time: 'Ayer, 14:30 hrs',
    action: 'Ver Tramite',
    to: '/mis-solicitudes/TR-45092',
    helpTo: '/chat-audiencia?tramite=TR-45092',
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
