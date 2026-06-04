import { Link, useNavigate } from 'react-router-dom';
import { publicUser } from '../../data/mockData';
import { paths } from '../../routes/paths';
import { clearSession } from '../../services/authSession';

export default function PublicNavbar({ user = publicUser }) {
  const navigate = useNavigate();

  function handleLogout() {
    clearSession();
    navigate(paths.home);
  }

  return (
    <header className="topbar topbar-blue">
      <Link className="brand" to={paths.userMenu}>DOM Santo Domingo</Link>
      <div className="topbar-user">
        <button className="notification-button" onClick={() => navigate(paths.notifications)} aria-label="Notificaciones">
          <span className="bell">!</span>
          <span className="badge">2</span>
        </button>
        <span>{user}</span>
        <button className="logout-button" onClick={handleLogout}>Cerrar Sesion</button>
      </div>
    </header>
  );
}
