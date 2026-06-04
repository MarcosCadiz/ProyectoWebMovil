import { useNavigate } from 'react-router-dom';
import BrandPanel from '../components/layout/BrandPanel';
import { paths } from '../routes/paths';

export default function RegistroTipoUsuario() {
  const navigate = useNavigate();

  return (
    <main className="split-screen">
      <BrandPanel />
      <section className="login-side">
        <div className="register-select">
          <div className="login-heading">
            <h2>Crear nuevo usuario</h2>
            <p>Selecciona el perfil que deseas registrar</p>
          </div>

          <button className="register-role-card" type="button" onClick={() => navigate(paths.registerUser)}>
            <strong>Usuario comun</strong>
            <span>Para vecinos o solicitantes que ingresan y revisan tramites DOM.</span>
          </button>

          <button className="register-role-card register-role-card-staff" type="button" onClick={() => navigate(paths.registerStaff)}>
            <strong>Usuario funcionario</strong>
            <span>Para personal DOM autorizado a revisar solicitudes y documentos.</span>
          </button>

          <div className="login-links login-links-single">
            <button className="link-button" type="button" onClick={() => navigate(paths.loginUser)}>
              Volver al login
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
