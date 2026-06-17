import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OutlineButton, PrimaryButton } from '../../components/ui/AppButton';
import { paths } from '../../routes/paths';
import {
  addTramite,
  buildSolicitudText,
  createLocalTramite,
  documentCategories,
  formatFileSize,
  tramiteTypes,
} from '../../services/tramiteWorkspace';

const initialForm = {
  tipo: tramiteTypes[0],
  solicitante: 'Juan Perez',
  rut: '12.345.678-9',
  direccion: '',
  descripcion: '',
  observaciones: '',
};

function downloadDraft(text) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `solicitud-dom-${Date.now()}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function UploadPanel() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [documents, setDocuments] = useState([]);
  const [category, setCategory] = useState(documentCategories[0]);
  const [feedback, setFeedback] = useState('');

  const generatedDocument = useMemo(
    () => buildSolicitudText(form, documents),
    [form, documents],
  );

  function updateForm(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleFileChange(event) {
    const selectedFiles = Array.from(event.target.files || []);

    const mappedFiles = selectedFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Date.now()}`,
      name: file.name,
      category,
      size: formatFileSize(file.size),
      status: 'Listo para enviar',
    }));

    setDocuments((current) => [...current, ...mappedFiles]);
    event.target.value = '';
  }

  function removeDocument(id) {
    setDocuments((current) => current.filter((document) => document.id !== id));
  }

  function persistTramite(status) {
    if (!form.direccion.trim() || !form.descripcion.trim()) {
      setFeedback('Completa direccion y descripcion antes de guardar la solicitud.');
      return;
    }

    addTramite(createLocalTramite({
      ...form,
      documents,
      generatedDocument,
    }, status));

    setFeedback(status === 'Borrador'
      ? 'Borrador guardado en Mis Solicitudes.'
      : 'Solicitud ingresada y disponible en Mis Solicitudes.');

    setTimeout(() => navigate(paths.requests), 550);
  }

  return (
    <main className="upload-workspace">
      <Link className="back-link" to={paths.userMenu}>Volver al Menu</Link>
      <div className="workspace-header">
        <div>
          <h1 className="page-title">Redaccion de Tramites y Documentos</h1>
          <p>
            Completa los antecedentes, adjunta respaldos y genera un borrador formal para enviar a revision DOM.
          </p>
        </div>
        <span className="workspace-status">Modo demostracion funcional</span>
      </div>

      <div className="document-workspace-grid">
        <section className="document-panel">
          <h2>Antecedentes del tramite</h2>
          <div className="form-grid">
            <label>
              Tipo de tramite
              <select name="tipo" value={form.tipo} onChange={updateForm}>
                {tramiteTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </label>
            <label>
              Solicitante
              <input name="solicitante" value={form.solicitante} onChange={updateForm} />
            </label>
            <label>
              RUT
              <input name="rut" value={form.rut} onChange={updateForm} />
            </label>
            <label>
              Direccion del proyecto
              <input
                name="direccion"
                value={form.direccion}
                onChange={updateForm}
                placeholder="Ej: Las Araucarias 450, Santo Domingo"
              />
            </label>
          </div>

          <label className="field-block">
            Descripcion del requerimiento
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={updateForm}
              placeholder="Describe la obra, regularizacion, certificado o solicitud que deseas ingresar."
            />
          </label>

          <label className="field-block">
            Observaciones adicionales
            <textarea
              name="observaciones"
              value={form.observaciones}
              onChange={updateForm}
              placeholder="Incluye antecedentes relevantes para el funcionario revisor."
            />
          </label>
        </section>

        <section className="document-panel">
          <h2>Documentos adjuntos</h2>
          <div className="upload-controls">
            <label>
              Categoria
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                {documentCategories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="upload-drop compact" htmlFor="file-upload">
              <span>
                <strong>Seleccionar archivos</strong>
                <br />
                PDF, JPG o PNG. Maximo recomendado: 5MB.
              </span>
              <input id="file-upload" type="file" multiple hidden onChange={handleFileChange} />
            </label>
          </div>

          <div className="doc-list">
            {documents.length ? documents.map((doc) => (
              <div className="doc-item" key={doc.id}>
                <span>
                  <strong>{doc.name}</strong>
                  <small>{doc.category} - {doc.size} - {doc.status}</small>
                </span>
                <button type="button" onClick={() => removeDocument(doc.id)}>Quitar</button>
              </div>
            )) : (
              <div className="empty-state">Aun no hay documentos adjuntos.</div>
            )}
          </div>
        </section>
      </div>

      <section className="document-preview">
        <div className="preview-header">
          <h2>Borrador generado</h2>
          <button type="button" onClick={() => downloadDraft(generatedDocument)}>Descargar TXT</button>
        </div>
        <pre>{generatedDocument}</pre>
      </section>

      {feedback ? <p className="form-feedback">{feedback}</p> : null}

      <div className="upload-actions">
        <OutlineButton to={paths.requests}>Cancelar</OutlineButton>
        <OutlineButton onClick={() => persistTramite('Borrador')}>Guardar Borrador</OutlineButton>
        <PrimaryButton onClick={() => persistTramite('Ingresado')}>Enviar Solicitud</PrimaryButton>
      </div>
    </main>
  );
}
