import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandPanel from '../components/layout/BrandPanel';
import LoginForm from '../features/auth/LoginForm';
import { paths } from '../routes/paths';
import { login, saveSession } from '../services/authApi';

export default function LoginUsuario() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (credentials) => {
    try {
      setError('');
      setIsLoading(true);
      const session = await login(credentials);
      saveSession(session);
      if (session.user.role !== 'usuario') {
        navigate(paths.staffMenu);
        return;
      }
      navigate(paths.userMenu);
    } catch {
      setError('Credenciales inválidas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="split-screen">
      <BrandPanel />
      <section className="login-side">
        <LoginForm
          error={error}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          registerPath={paths.registerUser}
        />
      </section>
    </main>
  );
}
