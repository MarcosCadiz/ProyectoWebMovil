import { Link, useParams } from 'react-router-dom';
import PageShell from '../components/layout/PageShell';
import PublicNavbar from '../components/navigation/PublicNavbar';
import { OutlineButton, PrimaryButton } from '../components/ui/AppButton';
import { paths } from '../routes/paths';
import {
  buildTramiteSummary,
  downloadTextDocument,
  findTramite,
} from '../services/tramiteWorkspace';

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
  const tramite = findTramite(id);

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
            <p>{tramite.description || 'Sin descripcion registrada.'}</p>
            <h3>Observaciones vigentes</h3>
            <p>{tramite.observations || 'No existen observaciones vigentes.'}</p>
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
