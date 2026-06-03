import { Link } from 'react-router-dom';
import { municipalAssets } from '../../data/assets';

export default function LoginForm({ demoCredentials, error, isLoading, onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onSubmit({
      rut: formData.get('rut'),
      password: formData.get('password'),
    });
  }

  function handleClaveUnica() {
    onSubmit(demoCredentials);
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-heading">
        <h2>Iniciar Sesión</h2>
        <p>Ingresa tus credenciales para acceder</p>
      </div>
      <label>
        <span>RUT</span>
        <input name="rut" placeholder="Ej: 12.345.678-9" />
      </label>
      <label>
        <span>Contraseña</span>
        <input name="password" type="password" placeholder="••••••••" />
      </label>
      {error ? <p className="login-error">{error}</p> : null}
      <button className="login-submit" type="submit" disabled={isLoading}>
        {isLoading ? 'Validando...' : 'Iniciar Sesión'}
      </button>
      <span className="login-separator">O ingresa con</span>
      <button className="clave-button" type="button" onClick={handleClaveUnica} disabled={isLoading}>
        <img src={municipalAssets.claveUnica} alt="" />
        ClaveÚnica
      </button>
      <div className="login-links">
        <Link to="#">¿Olvidaste tu contraseña?</Link>
        <Link to="#">Registrarse</Link>
      </div>
    </form>
  );
}
