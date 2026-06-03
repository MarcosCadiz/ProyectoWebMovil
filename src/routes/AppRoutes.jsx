import { Route, Routes } from 'react-router-dom';
import { paths } from './paths';
import ChatAudiencia from '../pages/ChatAudiencia';
import Inicio from '../pages/Inicio';
import LoginFuncionario from '../pages/LoginFuncionario';
import LoginUsuario from '../pages/LoginUsuario';
import MenuFuncionario from '../pages/MenuFuncionario';
import MenuUsuario from '../pages/MenuUsuario';
import MisSolicitudes from '../pages/MisSolicitudes';
import Notificaciones from '../pages/Notificaciones';
import RevisionSolicitudes from '../pages/RevisionSolicitudes';
import SubirArchivos from '../pages/SubirArchivos';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={paths.home} element={<Inicio />} />
      <Route path={paths.loginUser} element={<LoginUsuario />} />
      <Route path={paths.loginStaff} element={<LoginFuncionario />} />
      <Route path={paths.userMenu} element={<MenuUsuario />} />
      <Route path={paths.staffMenu} element={<MenuFuncionario />} />
      <Route path={paths.requests} element={<MisSolicitudes />} />
      <Route path={paths.review} element={<RevisionSolicitudes />} />
      <Route path={paths.notifications} element={<Notificaciones />} />
      <Route path={paths.upload} element={<SubirArchivos />} />
      <Route path={paths.chat} element={<ChatAudiencia />} />
    </Routes>
  );
}
