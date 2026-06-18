import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { paths } from '../../routes/paths';
import { decideTramite, fetchTramite } from '../../services/tramiteApi';
import { downloadTextDocument } from '../../services/tramiteWorkspace';

const approvalSteps = [
  'Descargar la resolucion emitida desde Mis Solicitudes.',
  'Validar identidad y firma digital avanzada en una notaria o proveedor autorizado.',
  'Presentar la resolucion firmada ante la Direccion de Obras Municipales.',
  'Coordinar inspeccion final si corresponde al tipo de permiso.',
  'Descargar el certificado definitivo cuando la DOM cierre el expediente.',
];

const rejectionSteps = [
  'Descargar la resolucion de rechazo y revisar sus fundamentos.',
  'Reunir los antecedentes corregidos indicados por el funcionario.',
  'Solicitar orientacion DOM si alguna causal requiere aclaracion.',
  'Crear una nueva solicitud o presentar reposicion dentro del plazo informado.',
];

const observationSteps = [
  'Revisar cada observacion indicada en la resolucion.',
  'Corregir planos, formularios o certificados pendientes.',
  'Adjuntar los documentos actualizados desde el gestor documental.',
  'Reenviar el expediente para continuar la revision.',
];

function stepsFor(decision) {
  if (decision === 'Aprobado') return approvalSteps;
  if (decision === 'Rechazado') return rejectionSteps;
  return observationSteps;
}

function decisionTitle(decision) {
  if (decision === 'Aprobado') return 'Resolucion de Aprobacion';
  if (decision === 'Rechazado') return 'Resolucion de Rechazo';
  return 'Acta de Observaciones';
}

function buildDocument(tramite, decision, folio, fundamento, steps) {
  return [
    'MUNICIPALIDAD DE SANTO DOMINGO',
    'DIRECCION DE OBRAS MUNICIPALES',
    decisionTitle(decision).toUpperCase(),
    '',
    `Folio: ${folio}`,
    `Expediente: ${tramite.id}`,
    `Tipo de tramite: ${tramite.title}`,
    `Solicitante: ${tramite.applicant}`,
    `Direccion: ${tramite.address || 'No informada'}`,
    '',
    'VISTOS:',
    `La solicitud ${tramite.id}, los antecedentes digitales y documentos aportados por el solicitante.`,
    '',
    'CONSIDERANDO:',
    fundamento,
    '',
    'SE RESUELVE:',
    `${decision.toUpperCase()} el tramite individualizado, conforme a los fundamentos precedentes.`,
    '',
    'PASOS POSTERIORES:',
    ...steps.map((step, index) => `${index + 1}. ${step}`),
    '',
    'Funcionario responsable: Roberto Gomez',
    `Fecha de emision: ${new Date().toLocaleDateString('es-CL')}`,
    '',
    'Documento demostrativo sin validez legal.',
  ].join('\n');
}

export default function ResolutionWorkspace() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const decision = searchParams.get('decision') || 'Aprobado';
  const initialObservations = searchParams.get('observations') || '';
  const checkedItems = searchParams.get('checks') || '0';
  const [tramite, setTramite] = useState(null);
  const [fundamento, setFundamento] = useState(initialObservations);
  const [folio, setFolio] = useState(`RES-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`);
  const [steps, setSteps] = useState(() => stepsFor(decision));
  const [customDocument, setCustomDocument] = useState('');
  const [issued, setIssued] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTramite(id).then(setTramite).catch(() => setError('No fue posible cargar el expediente.'));
  }, [id]);

  const generatedDocument = useMemo(() => {
    if (!tramite) return '';
    return buildDocument(
      tramite,
      decision,
      folio,
      fundamento || `Se verificaron ${checkedItems} criterios normativos y los antecedentes disponibles.`,
      steps,
    );
  }, [checkedItems, decision, folio, fundamento, steps, tramite]);

  useEffect(() => {
    setCustomDocument(generatedDocument);
  }, [generatedDocument]);

  function updateStep(index, value) {
    setSteps((current) => current.map((step, stepIndex) => stepIndex === index ? value : step));
  }

  async function issueResolution() {
    if (!fundamento.trim()) {
      setError('Debes indicar el fundamento tecnico o administrativo de la decision.');
      return;
    }

    try {
      setError('');
      const updated = await decideTramite(id, {
        decision,
        fundamento,
        document: customDocument,
        nextSteps: steps.filter(Boolean),
        folio,
      });
      setIssued(updated);
    } catch {
      setError('No fue posible emitir la resolucion. Verifica que la API este activa.');
    }
  }

  if (!tramite) {
    return <main className="staff-content" aria-busy="true"><h1>Cargando redaccion...</h1>{error ? <p role="alert">{error}</p> : null}</main>;
  }

  return (
    <main className="staff-content resolution-workspace">
      <header className="resolution-header">
        <div>
          <Link className="back-link" to={`/revision-solicitudes/${encodeURIComponent(id)}`}>
            Volver a la revision
          </Link>
          <h1>{decisionTitle(decision)}</h1>
          <p>{tramite.id} - {tramite.title} - {tramite.applicant}</p>
        </div>
        <span className={`decision-badge decision-${decision.toLowerCase()}`}>{decision}</span>
      </header>

      {issued ? (
        <section className="resolution-success" aria-live="polite">
          <h2>Resolucion emitida correctamente</h2>
          <p>El expediente fue actualizado y el usuario podra descargar la resolucion desde Mis Solicitudes.</p>
          <div>
            <button
              type="button"
              onClick={() => downloadTextDocument(`Resolucion_${folio}.txt`, customDocument)}
            >
              Descargar resolucion
            </button>
            <Link className="table-action button-link-inline" to={paths.staffMenu}>
              Volver a la bandeja
            </Link>
          </div>
        </section>
      ) : (
        <>
          <div className="resolution-grid">
            <section className="resolution-form-panel">
              <h2>Datos de la decision</h2>
              <label>
                Folio
                <input value={folio} onChange={(event) => setFolio(event.target.value)} required />
              </label>
              <label>
                Fundamento tecnico o administrativo
                <textarea
                  value={fundamento}
                  onChange={(event) => setFundamento(event.target.value)}
                  placeholder="Explica normas revisadas, cumplimiento, incumplimientos o antecedentes pendientes."
                />
              </label>

              <h2>Pasos posteriores para el usuario</h2>
              <div className="resolution-steps-editor">
                {steps.map((step, index) => (
                  <label key={`${decision}-${index}`}>
                    <span>{index + 1}</span>
                    <input
                      aria-label={`Paso posterior ${index + 1}`}
                      value={step}
                      onChange={(event) => updateStep(index, event.target.value)}
                    />
                  </label>
                ))}
              </div>
            </section>

            <section className="resolution-preview">
              <div>
                <h2>Documento de resolucion</h2>
                <span>Editable antes de emitir</span>
              </div>
              <textarea
                aria-label="Documento de resolucion editable"
                value={customDocument}
                onChange={(event) => setCustomDocument(event.target.value)}
              />
            </section>
          </div>

          {error ? <p className="staff-error" role="alert">{error}</p> : null}
          <div className="resolution-actions">
            <button type="button" className="table-action secondary" onClick={() => downloadTextDocument(`Borrador_${folio}.txt`, customDocument)}>
              Descargar borrador
            </button>
            <button type="button" className="table-action" onClick={issueResolution}>
              Emitir y notificar al usuario
            </button>
          </div>
        </>
      )}
    </main>
  );
}
