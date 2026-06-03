import { Link } from 'react-router-dom';
import { paths } from '../../routes/paths';

export default function RegisterForm({ error, isLoading, onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onSubmit({
      name: formData.get('name'),
      rut: formData.get('rut'),
      password: formData.get('password'),
      role: 'usuario',
    });
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-heading">
        <h2>Crear cuenta</h2>
        <p>Registra tus datos para entrar a la plataforma</p>
      </div>
      <label>
        <span>Nombre completo</span>
        <input name="name" placeholder="Ej: Juan Perez" required />
      </label>
      <label>
        <span>RUT</span>
        <input name="rut" placeholder="Ej: 12.345.678-9" required />
      </label>
      <label>
        <span>Contrasena</span>
        <input name="password" type="password" minLength="8" placeholder="Minimo 8 caracteres" required />
      </label>
      {error ? <p className="login-error">{error}</p> : null}
      <button className="login-submit" type="submit" disabled={isLoading}>
        {isLoading ? 'Creando cuenta...' : 'Registrarse'}
      </button>
      <div className="login-links login-links-single">
        <Link to={paths.loginUser}>Ya tengo cuenta</Link>
      </div>
    </form>
  );
}
