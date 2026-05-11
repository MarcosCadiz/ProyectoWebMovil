import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './src/pages/Inicio';
import LoginUsuario from './src/pages/LoginUsuario';
import LoginFuncionario from './src/pages/LoginFuncionario';
import MenuUsuario from './src/pages/MenuUsuario';
import MenuFuncionario from './src/pages/MenuFuncionario';
import MisSolicitudes from './src/pages/MisSolicitudes';
import RevisionSolicitudes from './src/pages/RevisionSolicitudes';
import Notificaciones from './src/pages/Notificaciones';
import SubirArchivos from './src/pages/SubirArchivos';
import ChatAudiencia from './src/pages/ChatAudiencia';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login-usuario" element={<LoginUsuario />} />
        <Route path="/login-funcionario" element={<LoginFuncionario />} />
        <Route path="/menu-usuario" element={<MenuUsuario />} />
        <Route path="/menu-funcionario" element={<MenuFuncionario />} />
        <Route path="/mis-solicitudes" element={<MisSolicitudes />} />
        <Route path="/revision-solicitudes" element={<RevisionSolicitudes />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/subir-archivos" element={<SubirArchivos />} />
        <Route path="/chat-audiencia" element={<ChatAudiencia />} />
      </Routes>
    </Router>
  );
}

export default App;