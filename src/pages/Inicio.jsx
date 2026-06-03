import React from 'react';
import { useNavigate } from 'react-router-dom';
import BrandPanel from '../components/layout/BrandPanel';
import { paths } from '../routes/paths';

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <main className="split-screen">
      <BrandPanel />
      <section className="role-select-panel">
        <div className="role-select">
          <h2>
            ¿Como desea iniciar sesión?
            <br />
            Como:
          </h2>
          <button className="role-pill role-user" onClick={() => navigate(paths.loginUser)}>
            Usuario
          </button>
          <span className="or">O</span>
          <button className="role-pill role-staff" onClick={() => navigate(paths.loginStaff)}>
            FUNCIONARIO
          </button>
        </div>
      </section>
    </main>
  );
}
