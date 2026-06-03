import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandPanel from '../components/layout/BrandPanel';
import RegisterForm from '../features/auth/RegisterForm';
import { paths } from '../routes/paths';
import { login, register, saveSession } from '../services/authApi';

export default function RegistroUsuario() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (profile) => {
    try {
      setError('');
      setIsLoading(true);
      await register(profile);
      const session = await login({ rut: profile.rut, password: profile.password });
      saveSession(session);
      navigate(paths.userMenu);
    } catch (requestError) {
      const apiError = requestError.response?.data?.error;
      setError(apiError === 'PASSWORD_TOO_SHORT' ? 'La contrasena debe tener al menos 8 caracteres' : 'No se pudo crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="split-screen">
      <BrandPanel />
      <section className="login-side">
        <RegisterForm error={error} isLoading={isLoading} onSubmit={handleSubmit} />
      </section>
    </main>
  );
}
