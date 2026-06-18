import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandPanel from '../components/layout/BrandPanel';
import RegisterForm from '../features/auth/RegisterForm';
import { paths } from '../routes/paths';
import { register } from '../services/authApi';

export default function RegistroUsuario({ role = 'usuario' }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (profile) => {
    try {
      setError('');
      setIsLoading(true);
      await register({ ...profile, role });
      navigate(role === 'funcionario' ? paths.loginStaff : paths.loginUser);
    } catch (requestError) {
      const apiError = requestError.response?.data?.error;

      if (!requestError.response) {
        setError('API no disponible. Levanta el backend con npm run dev:api e intenta nuevamente.');
      } else if (apiError === 'MISSING_REQUIRED_FIELDS') {
        setError('Completa nombre, RUT y contrasena para crear la cuenta');
      } else if (apiError === 'PASSWORD_TOO_SHORT') {
        setError('La contrasena debe tener al menos 8 caracteres');
      } else if (apiError === 'PASSWORD_TOO_LONG') {
        setError('La contrasena no puede superar 72 caracteres');
      } else if (apiError === 'INVALID_RUT') {
        setError('Ingresa un RUT valido, por ejemplo 12.345.678-9');
      } else if (apiError === 'INVALID_NAME') {
        setError('El nombre debe tener entre 3 y 120 caracteres');
      } else if (apiError === 'USER_ALREADY_EXISTS') {
        setError('Ya existe una cuenta asociada a ese RUT');
      } else if (apiError === 'INVALID_ROLE') {
        setError('El tipo de cuenta seleccionado no es valido');
      } else {
        setError('No se pudo crear la cuenta');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="split-screen">
      <BrandPanel variant={role === 'funcionario' ? 'teal' : undefined} />
      <section className="login-side">
        <RegisterForm error={error} isLoading={isLoading} onSubmit={handleSubmit} role={role} />
      </section>
    </main>
  );
}
