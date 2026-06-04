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
      if (apiError === 'PASSWORD_TOO_SHORT') {
        setError('La contrasena debe tener al menos 8 caracteres');
      } else if (apiError === 'USER_ALREADY_EXISTS') {
        setError('Ya existe una cuenta asociada a ese RUT');
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
