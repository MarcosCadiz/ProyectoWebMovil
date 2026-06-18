import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { reviewChecklist } from '../../data/mockData';
import { paths } from '../../routes/paths';
import { fetchTramite } from '../../services/tramiteApi';
import { downloadTextDocument } from '../../services/tramiteWorkspace';

function documentContent(tramite, document) {
  return document.content || [
    `DOCUMENTO ENVIADO POR ${tramite.applicant}`,
    `Expediente: ${tramite.id}`,
    `Archivo: ${document.name}`,
    `Categoria: ${document.category}`,
    `Estado: ${document.status}`,
  ].join('\n');
}

export default function ReviewWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tramite, setTramite] = useState(null);
  const [observations, setObservations] = useState('');
  const [checks, setChecks] = useState(() => reviewChecklist.map(() => false));

  useEffect(() => {
    fetchTramite(id).then((data) => {
      setTramite(data);
      setObservations(data.observations || '');
    });
  }, [id]);

  if (!tramite) {
    return <main className="staff-content" aria-busy="true"><h1>Cargando expediente...</h1></main>;
  }

  function openResolution(decision) {
    const params = new URLSearchParams({
      decision,
      observations,
      checks: String(checks.filter(Boolean).length),
    });
    navigate(`/resolucion-tramite/${encodeURIComponent(tramite.id)}?${params}`);
  }

  return (
    <main className="staff-content staff-review-wide">
      <header className="review-header">
        <Link className="back-link" to={paths.staffMenu}>Volver a la Bandeja</Link>
        <h1>Revision Solicitud {tramite.id}</h1>
        <p>Tramite: {tramite.title} | Solicitante: {tramite.applicant}</p>
      </header>

      <section className="review-grid">
        <article className="review-panel soft">
          <h2 className="section-title">Antecedentes enviados por el usuario</h2>
          <div className="info-list">
            <p><strong>Direccion:</strong> {tramite.address || 'Pendiente'}</p>
            <p><strong>Fecha de ingreso:</strong> {tramite.date}</p>
            <p><strong>Descripcion:</strong> {tramite.description}</p>
            <p><strong>Observaciones del usuario:</strong> {tramite.observations || 'Sin observaciones'}</p>
          </div>

          {tramite.generatedDocument ? (
            <button
              className="staff-document-primary"
              type="button"
              onClick={() => downloadTextDocument(
                `Solicitud_Digital_${tramite.id}.txt`,
                tramite.generatedDocument,
              )}
            >
              Descargar formulario digital
            </button>
          ) : null}

          <h2 className="section-title staff-doc-title">Documentacion adjunta</h2>
          <div className="doc-list">
            {tramite.documents.length ? tramite.documents.map((document) => (
              <div className="doc-item" key={document.id || document.name}>
                <span>
                  <strong>{document.name}</strong>
                  <small>{document.category} - {document.size || 'Sin tamano'} - {document.status}</small>
                </span>
                <button
                  type="button"
                  onClick={() => downloadTextDocument(
                    document.name.replace(/\.pdf$/i, '.txt'),
                    documentContent(tramite, document),
                  )}
                >
                  Descargar
                </button>
              </div>
            )) : <p className="empty-state">No hay documentos adjuntos.</p>}
          </div>
        </article>

        <article>
          <div className="review-panel">
            <h2 className="section-title">Checklist Normativo</h2>
            <div className="check-list">
              {reviewChecklist.map((item, index) => (
                <label key={item}>
                  <input
                    type="checkbox"
                    checked={checks[index]}
                    onChange={() => setChecks((current) => current.map(
                      (checked, checkIndex) => checkIndex === index ? !checked : checked,
                    ))}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
            <h2 className="section-title">Observaciones del Revisor</h2>
            <textarea
              className="review-textarea"
              aria-label="Observaciones del revisor"
              value={observations}
              onChange={(event) => setObservations(event.target.value)}
              placeholder="Describe fundamentos, observaciones o causales de rechazo."
            />
          </div>
          <div className="review-actions">
            <button type="button" className="action-warning" onClick={() => openResolution('Observado')}>
              Observar Tramite
            </button>
            <button type="button" className="action-danger" onClick={() => openResolution('Rechazado')}>
              Redactar Rechazo
            </button>
            <button type="button" className="action-success" onClick={() => openResolution('Aprobado')}>
              Redactar Aprobacion
            </button>
          </div>
        </article>
      </section>
    </main>
  );
}
