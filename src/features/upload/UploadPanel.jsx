import { Link, useNavigate } from 'react-router-dom';
import { OutlineButton, PrimaryButton } from '../../components/ui/AppButton';
import { uploadedDocuments } from '../../data/mockData';
import { paths } from '../../routes/paths';

export default function UploadPanel() {
  const navigate = useNavigate();

  return (
    <main className="upload-card">
      <Link className="back-link" to={paths.userMenu}>← Volver al Menú</Link>
      <h1 className="page-title">Gestor de Documentos</h1>
      <p>
        Adjunta los documentos requeridos para crear una nueva solicitud o responder una observación del funcionario DOM.
      </p>
      <label className="upload-drop" htmlFor="file-upload">
        <span>
          <strong>Arrastra y suelta tus archivos aquí</strong>
          <br />
          Formatos permitidos: PDF, JPG o PNG. Tamaño máximo: 5MB por archivo.
        </span>
        <input id="file-upload" type="file" multiple hidden />
      </label>
      <div className="doc-list">
        {uploadedDocuments.map((doc) => (
          <div className="doc-item" key={doc}>
            <span>{doc}</span>
            <button>Reemplazar</button>
          </div>
        ))}
      </div>
      <div className="upload-actions">
        <OutlineButton to={paths.requests}>Cancelar</OutlineButton>
        <PrimaryButton onClick={() => navigate(paths.requests)}>Enviar Solicitud</PrimaryButton>
      </div>
    </main>
  );
}
