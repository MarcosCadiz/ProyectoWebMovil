import { Link, useNavigate } from 'react-router-dom';
import { projectDocuments, reviewChecklist } from '../../data/mockData';
import { paths } from '../../routes/paths';

function ProjectSummary() {
  return (
    <article className="review-panel soft">
      <h2 className="section-title">Antecedentes del Proyecto</h2>
      <div className="info-list">
        <p><strong>Dirección:</strong> Av. Los Lirios 123</p>
        <p><strong>Rol Avalúo:</strong> 1450-22</p>
        <p><strong>Zona PRCom:</strong> ZU-2 (Residencial)</p>
        <p><strong>Superficie:</strong> 45 m² a edificar</p>
      </div>
      <h2 className="section-title">Documentación Adjunta</h2>
      <div className="doc-list">
        {projectDocuments.map((doc) => (
          <div className="doc-item" key={doc}>
            <span>{doc}</span>
            <button>Visualizar</button>
          </div>
        ))}
      </div>
    </article>
  );
}

function NormativeChecklist() {
  const navigate = useNavigate();

  return (
    <article>
      <div className="review-panel">
        <h2 className="section-title">Checklist Normativo (Filtro 2)</h2>
        <div className="check-list">
          {reviewChecklist.map((item) => (
            <label key={item}>
              <input type="checkbox" defaultChecked />
              <span>{item}</span>
            </label>
          ))}
        </div>
        <h2 className="section-title">Observaciones del Revisor</h2>
        <textarea
          className="review-textarea"
          placeholder="Si el proyecto tiene observaciones o causales de rechazo, descríbalas aquí..."
        />
      </div>
      <div className="review-actions">
        <button className="action-warning" onClick={() => navigate(paths.chat)}>Observar Trámite</button>
        <button className="action-danger">Rechazar</button>
        <button className="action-success">Aprobar Permiso</button>
      </div>
    </article>
  );
}

export default function ReviewWorkspace() {
  return (
    <main className="staff-content">
      <header className="review-header">
        <Link className="back-link" to={paths.staffMenu}>← Volver a la Bandeja</Link>
        <h1>Revisión Solicitud #45098</h1>
        <p>Trámite: Permiso de Obra Menor | Solicitante: Juan Pérez</p>
      </header>
      <section className="review-grid">
        <ProjectSummary />
        <NormativeChecklist />
      </section>
    </main>
  );
}
