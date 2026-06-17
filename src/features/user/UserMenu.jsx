import { PrimaryButton } from '../../components/ui/AppButton';
import { paths } from '../../routes/paths';

export default function UserMenu() {
  return (
    <main className="main-grid">
      <aside className="side-card">
        <h1>Tramites</h1>
        <PrimaryButton to={paths.upload}>Generar Nueva Solicitud +</PrimaryButton>
        <PrimaryButton to={paths.requests}>Mis Solicitudes</PrimaryButton>
      </aside>

      <section className="content-card">
        <div className="header-rule">
          <h1>Plataforma DOM en linea</h1>
        </div>
        <h2 className="map-title">Mapa de la comuna</h2>
        <div className="map-panel">
          <iframe
            title="Mapa interactivo de Santo Domingo, Valparaiso"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-71.7190%2C-33.6820%2C-71.5650%2C-33.5850&layer=mapnik&marker=-33.6360%2C-71.6290"
            loading="lazy"
          />
          <div className="map-summary">
            <strong>Santo Domingo, Valparaiso</strong>
            <span>Referencia territorial para tramites, direcciones y revision DOM.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
