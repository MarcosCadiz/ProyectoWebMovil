import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Notificaciones() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col bg-[#f3f4f5] overflow-hidden font-['Roboto',sans-serif]">
      
      {/* Barra de Navegación Superior */}
      <nav className="w-full h-[61px] bg-[#0051A8] border-b-[5px] border-[#E31837] shrink-0 flex items-center justify-between px-10 z-50">
        <div 
          className="text-white text-[19.20px] font-bold leading-[23.04px]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          DOM Santo Domingo
        </div>
        
        {/* Info de Usuario y Notificaciones */}
        <div className="flex items-center gap-6">
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
      </nav>

      {/* Contenido Principal */}
      <main className="flex-1 overflow-y-auto p-10 flex justify-center">
        <div className="w-full max-w-[800px] bg-white rounded-xl border border-gray-200 shadow-xl shadow-gray-200/50 flex flex-col p-8 h-fit">
          <button 
            onClick={() => navigate('/menu-usuario')} 
            className="text-[#0f69b4] mb-6 inline-block self-start text-sm font-medium hover:underline"
          >
            ← Volver al Menú
          </button>
          <h1 className="text-3xl font-bold text-[#0f69b4] mb-8">Notificaciones</h1>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map(i => ( // Aumentar notificaciones para poblar
              <div key={i} className="bg-gray-50 p-5 rounded-lg shadow-sm border-l-4 border-[#0f69b4]">
                <p className="font-bold text-gray-800">Actualización de Trámite</p>
                <p className="text-gray-600 mt-1">Su solicitud #554{i} ha cambiado de estado a "En Revisión".</p>
                <span className="text-xs text-gray-400 mt-2 block">Hace {i * 2} horas</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full h-[58px] bg-[#0051A8] border-t-[5px] border-[#E31837] shrink-0 flex items-center justify-center">
        <div 
          className="text-white text-[19.20px] font-normal"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Copyright © 2026 I. Municipalidad de Santo Domingo
        </div>
      </footer>
    </div>
  );
}
