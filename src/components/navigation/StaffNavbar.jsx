import { Link } from 'react-router-dom';
import { staffUser } from '../../data/mockData';
import { paths } from '../../routes/paths';

export default function StaffNavbar({ user = staffUser }) {
  return (
    <header className="topbar topbar-teal">
      <Link className="brand intranet" to={paths.staffMenu}>DOM Santo Domingo - Intranet</Link>
      <div className="topbar-user staff-user">
        <span className="role-badge">Funcionario DOM</span>
        <span>{user}</span>
      </div>
    </header>
  );
}
