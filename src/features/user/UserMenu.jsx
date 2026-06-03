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
          <h1>Plataforma DOM en línea</h1>
        </div>
        <h2 className="map-title">Mapa de la comuna</h2>
        <div className="map-placeholder">AQUI PONER EL MAPA</div>
      </section>
    </main>
  );
}
