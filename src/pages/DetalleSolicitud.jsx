import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageShell from '../components/layout/PageShell';
import PublicNavbar from '../components/navigation/PublicNavbar';
import { OutlineButton, PrimaryButton } from '../components/ui/AppButton';
import { paths } from '../routes/paths';
import {
  buildTramiteSummary,
  downloadTextDocument,
  findTramite,
} from '../services/tramiteWorkspace';
import { deleteTramite, fetchTramite, updateTramite } from '../services/tramiteApi';

function downloadableContent(tramite, document) {
  return document.content || [
    `DOCUMENTO ASOCIADO A ${tramite.id}`,
    `Nombre: ${document.name}`,
    `Categoria: ${document.category}`,
    `Estado: ${document.status}`,
    '',
    'Contenido demostrativo. El archivo original no se almacena en esta version local.',
  ].join('\n');
}

export default function DetalleSolicitud() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tramite, setTramite] = useState(() => findTramite(id));
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ descripcion: '', observaciones: '' });
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    fetchTramite(id)
      .then((data) => {
        setTramite(data);
        setEditForm({
          descripcion: data.description || '',
          observaciones: data.observations || '',
        });
      })
      .catch(() => setTramite((current) => current || findTramite(id)))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading && !tramite) {
    return (
      <PageShell>
        <PublicNavbar />
        <main className="container-center">
          <section className="request-detail missing-detail">
            <h1>Cargando expediente...</h1>
          </section>
        </main>
      </PageShell>
    );
  }

  if (!tramite) {
    return (
      <PageShell>
        <PublicNavbar />
        <main className="container-center">
          <section className="request-detail missing-detail">
            <h1>Solicitud no encontrada</h1>
            <p>El registro solicitado no existe o fue eliminado del almacenamiento local.</p>
            <PrimaryButton to={paths.requests}>Volver a Mis Solicitudes</PrimaryButton>
          </section>
        </main>
      </PageShell>
    );
  }

  async function saveChanges() {
    try {
      const updated = await updateTramite(tramite.id, editForm);
      setTramite(updated);
      setEditing(false);
      setActionError('');
    } catch {
      setActionError('No fue posible actualizar el tramite.');
    }
  }

  async function removeTramite() {
    const confirmed = window.confirm(`Eliminar definitivamente la solicitud ${tramite.id}?`);
    if (!confirmed) return;

    try {
      await deleteTramite(tramite.id);
      navigate(paths.requests);
    } catch {
      setActionError('No fue posible eliminar el tramite.');
    }
  }

  return (
    <PageShell>
      <PublicNavbar />
      <main className="request-detail-layout">
        <Link className="back-link" to={paths.requests}>Volver a Mis Solicitudes</Link>

        <header className="request-detail-header">
          <div>
            <span className="detail-eyebrow">{tramite.expediente}</span>
            <h1>{tramite.title}</h1>
            <p>Solicitud {tramite.id} - Ultima actualizacion: {tramite.lastUpdate || tramite.date}</p>
          </div>
          <span className={`status-pill ${tramite.statusClass}`}>{tramite.status}</span>
        </header>

        <section className="detail-progress" aria-label="Avance del tramite">
          <div>
            <strong>Avance estimado</strong>
            <span>{tramite.progress || 20}%</span>
          </div>
          <progress max="100" value={tramite.progress || 20} />
        </section>

        <div className="request-detail-grid">
          <section className="detail-panel">
            <h2>Antecedentes del expediente</h2>
            <dl className="detail-list">
              <div><dt>Solicitante</dt><dd>{tramite.applicant || 'Juan Perez'}</dd></div>
              <div><dt>Direccion</dt><dd>{tramite.address || 'Pendiente'}</dd></div>
              <div><dt>Rol o referencia</dt><dd>{tramite.propertyRole || 'Pendiente'}</dd></div>
              <div><dt>Fecha de ingreso</dt><dd>{tramite.date}</dd></div>
              <div><dt>Funcionario asignado</dt><dd>{tramite.reviewer || 'Pendiente de asignacion'}</dd></div>
            </dl>
            <h3>Descripcion</h3>
            {editing ? (
              <textarea
                className="detail-edit-textarea"
                aria-label="Descripcion de la solicitud"
                value={editForm.descripcion}
                onChange={(event) => setEditForm((current) => ({
                  ...current,
                  descripcion: event.target.value,
                }))}
              />
            ) : <p>{tramite.description || 'Sin descripcion registrada.'}</p>}
            <h3>Observaciones vigentes</h3>
            {editing ? (
              <textarea
                className="detail-edit-textarea"
                aria-label="Observaciones de la solicitud"
                value={editForm.observaciones}
                onChange={(event) => setEditForm((current) => ({
                  ...current,
                  observaciones: event.target.value,
                }))}
              />
            ) : <p>{tramite.observations || 'No existen observaciones vigentes.'}</p>}

            {!['Aprobado', 'Rechazado'].includes(tramite.status) ? (
              <div className="detail-crud-actions">
                {editing ? (
                  <>
                    <button type="button" onClick={() => setEditing(false)}>Cancelar</button>
                    <button type="button" className="primary-crud" onClick={saveChanges}>Guardar cambios</button>
                  </>
                ) : (
                  <>
                    <button type="button" onClick={() => setEditing(true)}>Editar solicitud</button>
                    <button type="button" className="danger-crud" onClick={removeTramite}>Eliminar solicitud</button>
                  </>
                )}
              </div>
            ) : null}
            {actionError ? <p className="detail-action-error" role="alert">{actionError}</p> : null}
          </section>

          <section className="detail-panel">
            <div className="detail-panel-heading">
              <h2>Documentos</h2>
              <button
                type="button"
                onClick={() => downloadTextDocument(
                  `Resumen_${tramite.id}.txt`,
                  buildTramiteSummary(tramite),
                )}
              >
                Descargar resumen
              </button>
            </div>

            <div className="detail-document-list">
              {tramite.documents?.length ? tramite.documents.map((document) => (
                <article key={document.name}>
                  <div>
                    <strong>{document.name}</strong>
                    <span>{document.category} - {document.status}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => downloadTextDocument(
                      document.name.replace(/\.pdf$/i, '.txt'),
                      downloadableContent(tramite, document),
                    )}
                  >
                    Descargar
                  </button>
                </article>
              )) : <p className="empty-state">No hay documentos asociados.</p>}
            </div>

            {tramite.generatedDocument ? (
              <button
                className="wide-download"
                type="button"
                onClick={() => downloadTextDocument(
                  `Solicitud_Digital_${tramite.id}.txt`,
                  tramite.generatedDocument,
                )}
              >
                Descargar solicitud digital
              </button>
            ) : null}

            {tramite.certificate ? (
              <button
                className="wide-download certificate-download"
                type="button"
                onClick={() => downloadTextDocument(
                  tramite.certificate.name,
                  tramite.certificate.content,
                )}
              >
                Descargar certificado aprobado
              </button>
            ) : null}

            {tramite.resolution ? (
              <button
                className="wide-download certificate-download"
                type="button"
                onClick={() => downloadTextDocument(
                  `Resolucion_${tramite.resolution.folio}.txt`,
                  tramite.resolution.document,
                )}
              >
                Descargar resolucion {tramite.resolution.decision.toLowerCase()}
              </button>
            ) : null}
          </section>
        </div>

        <section className="detail-panel detail-history">
          <h2>Historial del tramite</h2>
          <ol>
            {(tramite.history || []).map((event) => (
              <li key={`${event.date}-${event.title}`}>
                <time>{event.date}</time>
                <div>
                  <strong>{event.title}</strong>
                  <p>{event.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {tramite.resolution ? (
          <section className="detail-panel user-resolution">
            <div>
              <span>Resolucion emitida</span>
              <h2>{tramite.resolution.decision} - Folio {tramite.resolution.folio}</h2>
              <p>{tramite.resolution.fundamento}</p>
            </div>
            <ol>
              {(tramite.resolution.nextSteps || []).map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        ) : null}

        <section className="request-help-callout">
          <div>
            <h2>Necesitas ayuda con esta solicitud?</h2>
            <p>Consulta plazos, documentos, observaciones o el significado del estado actual.</p>
          </div>
          <div className="detail-actions">
            {tramite.statusClass === 'status-danger' ? (
              <OutlineButton to={paths.upload}>Adjuntar correccion</OutlineButton>
            ) : null}
            <PrimaryButton to={`${paths.chat}?tramite=${encodeURIComponent(tramite.id)}`}>
              Ir a Ayuda DOM
            </PrimaryButton>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
