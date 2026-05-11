import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SubirArchivos() {
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
        <div className="w-full max-w-[900px] bg-white rounded-xl border border-gray-200 shadow-xl shadow-gray-200/50 flex flex-col p-8 h-fit">
          <button 
            onClick={() => navigate('/menu-usuario')} 
            className="text-[#0f69b4] mb-6 inline-block self-start text-sm font-medium hover:underline"
          >
            ← Volver al Menú
          </button>
          <h1 className="text-3xl font-bold text-[#0f69b4] mb-8">Nueva Solicitud: Subir Archivos</h1>
          <p className="text-gray-700 mb-8">Por favor, sube los documentos requeridos para tu trámite. Asegúrate de que estén en formato PDF y no excedan los 5MB por archivo.</p>
          
          {/* Área de Carga de Archivos */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center text-gray-500 hover:border-[#0f69b4] hover:text-[#0f69b4] transition-all cursor-pointer">
            <p className="text-lg font-medium mb-4">Arrastra y suelta tus archivos aquí, o haz clic para seleccionarlos.</p>
            <input type="file" multiple className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="bg-[#0f69b4] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#0d5a9c] transition-all cursor-pointer">
              Seleccionar Archivos
            </label>
            <ul className="mt-6 text-left text-sm text-gray-600">
              <li>• Documento de Identidad (PDF)</li>
              <li>• Plano de Ubicación (PDF)</li>
              <li>• Certificado de Dominio Vigente (PDF)</li>
            </ul>
          </div>

          <button className="mt-10 bg-green-600 text-white px-8 py-3 rounded-md shadow-md hover:bg-green-700 transition-all self-end">
            Enviar Solicitud
          </button>
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