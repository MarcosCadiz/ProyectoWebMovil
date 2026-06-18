import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandPanel from '../components/layout/BrandPanel';
import LoginForm from '../features/auth/LoginForm';
import { paths } from '../routes/paths';
import { clearSession, login, saveSession } from '../services/authApi';

export default function LoginFuncionario() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (credentials) => {
    try {
      setError('');
      setIsLoading(true);
      const session = await login(credentials);

      if (session.user.role !== 'funcionario') {
        clearSession();
        setError('Estas credenciales pertenecen a un usuario. Ingresa desde el acceso usuario.');
        return;
      }

      saveSession(session);
      navigate(paths.staffMenu);
    } catch {
      setError('Credenciales invalidas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="split-screen">
      <BrandPanel variant="teal" />
      <section className="login-side">
        <LoginForm
          error={error}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          registerPath={paths.register}
          role="funcionario"
        />
      </section>
    </main>
  );
}
