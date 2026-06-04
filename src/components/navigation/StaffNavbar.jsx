import { Link, useNavigate } from 'react-router-dom';
import { staffUser } from '../../data/mockData';
import { paths } from '../../routes/paths';
import { clearSession } from '../../services/authSession';

export default function StaffNavbar({ user = staffUser }) {
  const navigate = useNavigate();

  function handleLogout() {
    clearSession();
    navigate(paths.home);
  }

  return (
    <header className="topbar topbar-teal">
      <Link className="brand intranet" to={paths.staffMenu}>DOM Santo Domingo - Intranet</Link>
      <div className="topbar-user staff-user">
        <span className="role-badge">Funcionario DOM</span>
        <span>{user}</span>
        <button className="logout-button" onClick={handleLogout}>Cerrar Sesion</button>
      </div>
    </header>
  );
}
