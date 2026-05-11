import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MisSolicitudes() {
  const navigate = useNavigate();

  const solicitudes = [
    { id: "#12345", tramite: "Permiso de Edificación", fecha: "25/05/2026", estado: "En Revisión" },
    { id: "#12344", tramite: "Recepción Definitiva", fecha: "24/05/2026", estado: "Aprobada" },
    { id: "#12343", tramite: "Certificado de Informaciones Previas", fecha: "23/05/2026", estado: "Finalizada" },
    { id: "#12342", tramite: "Patente Comercial", fecha: "22/05/2026", estado: "Rechazada" },
    { id: "#12341", tramite: "Permiso de Obra Menor", fecha: "21/05/2026", estado: "En Revisión" },
    { id: "#12340", tramite: "Subdivisión de Predio", fecha: "20/05/2026", estado: "Aprobada" },
  ];

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
        <div className="w-full max-w-[1150px] bg-white rounded-xl border border-gray-200 shadow-xl shadow-gray-200/50 flex flex-col p-8 h-fit">
          <button 
            onClick={() => navigate('/menu-usuario')} 
            className="text-[#0f69b4] mb-6 inline-block self-start text-sm font-medium hover:underline"
          >
            ← Volver al Menú
          </button>
          <h1 className="text-3xl font-bold text-[#0f69b4] mb-8">Mis Solicitudes</h1>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead>
                <tr className="text-gray-500 text-[13px] font-bold uppercase tracking-wide bg-gray-50/50">
                  <th className="p-4 rounded-l-lg">ID</th>
                  <th className="p-4">Trámite</th>
                  <th className="p-4">Fecha</th>
                  <th className="p-4 text-center rounded-r-lg">Estado</th>
                  <th className="p-4 text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((s, index) => (
                  <tr key={index} className="bg-white shadow-sm hover:shadow-md transition-all group border border-gray-100">
                    <td className="p-4 font-bold text-gray-800 rounded-l-lg">{s.id}</td>
                    <td className="p-4 text-gray-600">{s.tramite}</td>
                    <td className="p-4 text-gray-600">{s.fecha}</td>
                    <td className="p-4 text-center">
                      <span className={`text-[12px] font-black px-3 py-1 rounded-full uppercase ${
                        s.estado === 'En Revisión' ? 'bg-yellow-100 text-yellow-800' :
                        s.estado === 'Aprobada' ? 'bg-green-100 text-green-800' :
                        s.estado === 'Rechazada' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {s.estado}
                      </span>
                    </td>
                    <td className="p-4 text-center rounded-r-lg">
                      <button className="text-[#0f69b4] text-[13px] font-medium hover:underline cursor-pointer">Ver detalle</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
