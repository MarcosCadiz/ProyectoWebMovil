import React from 'react';
import { useNavigate } from 'react-router-dom';

// Assets del proyecto
const m = "https://www.figma.com/api/mcp/asset/743100c7-fbef-4cc8-98a7-9da99bb0976f"; // Ilustración
const g = "https://www.figma.com/api/mcp/asset/47fde787-8f3c-4579-9243-6789fab7ccbe"; // Fondo Logo
const _ = "https://www.figma.com/api/mcp/asset/00d1a15e-5d8a-4daa-904d-e7da935a72b6"; // Escudo

export default function MenuUsuario() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
  };

  const handleNewRequest = () => {
    navigate('/subir-archivos');
  };

  return (
    <div className="w-full h-screen relative bg-[#f3f4f5] overflow-hidden font-['Roboto',sans-serif]">
      
        {/* Barra de Navegación Superior */}
        <div className="absolute w-full h-[61px] left-0 top-0 bg-[#0051A8] border-b-[5px] border-[#E31837] z-50">
          <div 
            className="absolute left-[30px] top-[16.50px] text-white text-[19.20px] font-bold leading-[23.04px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            DOM Santo Domingo
          </div>
          
          {/* Info de Usuario y Cierre de Sesión */}
          <div className="absolute h-[26px] right-[30px] top-[15px] flex items-center gap-6">
            {/* Icono Notificación (Campana) */}
            <div className="relative cursor-pointer flex items-center justify-center" onClick={() => navigate('/notificaciones')}>
              <span className="text-white text-[20px]">🔔</span>
              <div className="absolute -top-1 -right-1 w-[15px] h-[15px] bg-[#E31837] rounded-full flex items-center justify-center border border-white">
                <span className="text-white text-[9px] font-bold">2</span>
              </div>
            </div>

            <div 
              className="text-white text-[16px] font-medium leading-[17.28px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Juan Pérez
            </div>
          </div>
        </div>

        {/* Panel Lateral - Trámites */}
        <div className="absolute w-[402px] h-[318px] left-[39px] top-[111px] bg-white rounded-[8.76px] border border-[#CCCCCC] shadow-sm overflow-hidden">
          <div 
            className="absolute left-[29.55px] top-[36.12px] text-[#0F69B4] text-[32.55px] font-bold leading-[39.05px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Trámites
          </div>

          <div className="absolute w-full top-[110px] flex flex-col items-center gap-6">
            <button 
              onClick={handleNewRequest}
              className="w-[292.91px] h-[51.87px] bg-[#0051A8] flex items-center justify-center gap-2 cursor-pointer hover:bg-[#003d7a] transition-all rounded-[4px]"
            >
              <span className="text-white text-[20.68px] font-bold capitalize">Generar Nueva solicitud</span>
            </button>

            <button 
              onClick={() => navigate('/mis-solicitudes')}
              className="w-[292.91px] h-[51.87px] bg-[#0051A8] flex items-center justify-center cursor-pointer hover:bg-[#003d7a] transition-all rounded-[4px]"
            >
              <span className="text-white text-[20.68px] font-bold capitalize">Mis solicitudes</span>
            </button>
          </div>
        </div>

        {/* Panel Principal - Mapa */}
        <div className="absolute w-[calc(100%-550px)] h-[calc(100%-150px)] left-[475px] top-[105px] bg-white rounded-[9.57px] border border-[#CCCCCC] shadow-sm overflow-hidden">
          <div className="absolute w-[calc(100%-74.14px)] h-[53.82px] left-[37.07px] top-[37.07px]">
            <h1 
              className="text-[#0F69B4] text-[40px] font-bold leading-[48px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Plataforma DOM en línea
            </h1>
          </div>

          <div 
            className="absolute left-[60px] top-[166px] text-[#0F69B4] text-[32px] font-bold leading-[38.40px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Mapa de la comuna
          </div>

          {/* Contenedor del Mapa */}
          <div className="absolute w-[calc(100%-120px)] h-[calc(100%-250px)] left-[60px] top-[204px] bg-[#D9D9D9] flex items-center justify-center border border-[#CCCCCC]">
            <span className="text-black text-[28.70px] font-bold uppercase">Aquí se desplegará el mapa interactivo</span>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute w-full h-[58px] left-0 bottom-0 bg-[#0051A8] flex items-center justify-center border-t-[5px] border-[#E31837]">
          <div 
            className="text-white text-[19.20px] font-normal"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Copyright © 2026 I. Municipalidad de Santo Domingo
          </div>
        </div>
    </div>
  );
}