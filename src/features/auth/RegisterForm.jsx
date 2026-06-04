import { Link } from 'react-router-dom';
import { paths } from '../../routes/paths';

export default function RegisterForm({ error, isLoading, onSubmit, role = 'usuario' }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onSubmit({
      name: formData.get('name'),
      rut: formData.get('rut'),
      email: formData.get('email'),
      department: formData.get('department'),
      password: formData.get('password'),
      role,
    });
  }

  const isStaff = role === 'funcionario';

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-heading">
        <h2>{isStaff ? 'Crear funcionario' : 'Crear cuenta'}</h2>
        <p>{isStaff ? 'Registra una cuenta para personal DOM' : 'Registra tus datos para entrar a la plataforma'}</p>
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
        <span>{isStaff ? 'Correo institucional' : 'Correo electronico'}</span>
        <input name="email" type="email" placeholder={isStaff ? 'nombre@santodomingo.cl' : 'correo@ejemplo.cl'} />
      </label>
      {isStaff ? (
        <label>
          <span>Cargo o unidad</span>
          <input name="department" placeholder="Ej: Revisor DOM" />
        </label>
      ) : null}
      <label>
        <span>Contrasena</span>
        <input name="password" type="password" minLength="8" placeholder="Minimo 8 caracteres" required />
      </label>
      {error ? <p className="login-error">{error}</p> : null}
      <button className="login-submit" type="submit" disabled={isLoading}>
        {isLoading ? 'Creando cuenta...' : isStaff ? 'Solicitar cuenta funcionario' : 'Crear cuenta'}
      </button>
      <div className="login-links login-links-single">
        <Link to={isStaff ? paths.loginStaff : paths.loginUser}>Ya tengo cuenta</Link>
      </div>
    </form>
  );
}
