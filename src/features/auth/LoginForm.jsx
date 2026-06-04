import { Link } from 'react-router-dom';
import { municipalAssets } from '../../data/assets';

export default function LoginForm({ error, isLoading, onSubmit, registerPath }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onSubmit({
      rut: formData.get('rut'),
      password: formData.get('password'),
    });
  }

  function handleClaveUnica() {
    window.alert('La integracion con ClaveUnica se encuentra en desarrollo.');
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-heading">
        <h2>Iniciar sesion</h2>
        <p>Ingresa tus credenciales para acceder</p>
      </div>
      <label>
        <span>RUT</span>
        <input name="rut" placeholder="Ej: 12.345.678-9" required />
      </label>
      <label>
        <span>Contrasena</span>
        <input name="password" type="password" placeholder="Contrasena" required />
      </label>
      {error ? <p className="login-error">{error}</p> : null}
      <button className="login-submit" type="submit" disabled={isLoading}>
        {isLoading ? 'Validando...' : 'Iniciar sesion'}
      </button>
      <span className="login-separator">O ingresa con</span>
      <button className="clave-button" type="button" onClick={handleClaveUnica} disabled={isLoading}>
        <img src={municipalAssets.claveUnica} alt="" />
        ClaveUnica
      </button>
      <div className="login-links">
        <Link to="#">Olvidaste tu contrasena?</Link>
        {registerPath ? <Link to={registerPath}>Registrarse</Link> : null}
      </div>
    </form>
  );
}
