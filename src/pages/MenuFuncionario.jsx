import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MenuFuncionario() {
  const navigate = useNavigate();

  const handleLogout = () => navigate('/');

  const solicitudes = [
    { id: "#45098", tramite: "Permiso de Obra Menor", fecha: "06/05/2026", solicitante: "Juan Pérez", estado: "Nueva" },
    { id: "#45097", tramite: "Regularización Vivienda", fecha: "05/05/2026", solicitante: "María Silva", estado: "Nueva" },
    { id: "#45090", tramite: "Patente Comercial", fecha: "04/05/2026", solicitante: "Constructora XYZ", estado: "En Revisión" },
    { id: "#45085", tramite: "Certificado de Informaciones Previas", fecha: "03/05/2026", solicitante: "Ricardo Lagos", estado: "Nueva" },
    { id: "#45079", tramite: "Recepción Definitiva", fecha: "01/05/2026", solicitante: "Patricia Soto", estado: "Nueva" },
    { id: "#45060", tramite: "Demolición", fecha: "28/04/2026", solicitante: "Andrés Bello", estado: "Nueva" },
  ];

  return (
    <div className="w-full h-screen bg-[#F3F4F5] font-['Roboto',sans-serif] flex flex-col overflow-hidden">
      
      {/* Navbar Intranet */}
      <div className="w-full h-[65px] min-h-[65px] bg-[#139CA6] border-b-[5px] border-[#E31837] flex items-center justify-between px-10 shadow-md z-50">
        <div className="text-white text-[20px] font-bold tracking-tight">
          DOM Santo Domingo - Intranet
        </div>
        
        {/* Espaciado extremo en el header (gap-20) */}
        <div className="flex items-center gap-20">
          <div className="bg-white px-4 py-1 rounded shadow-sm">
            <span className="text-[#0F69B4] text-[12px] font-bold uppercase">Funcionario DOM</span>
          </div>
          <div className="text-white text-[15px] font-medium">Roberto Gómez</div>
          <button 
            onClick={handleLogout}
            className="px-5 py-1.5 border border-white rounded text-white text-[12px] font-bold hover:bg-white/10 transition-all cursor-pointer"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Contenedor con scroll */}
      <div className="flex-1 overflow-y-auto px-12">
        
        {/* CAMBIO REAL 1: Espaciador físico superior de 100px */}
        <div className="h-[100px] w-full"></div>

        {/* Card de la Bandeja */}
        <div className="w-full max-w-[1350px] mx-auto bg-white rounded-xl border border-gray-200 shadow-2xl mb-20">
          
          <div className="p-10 border-b-2 border-gray-50">
            <h2 className="text-[#0F69B4] text-[32px] font-black">
              Bandeja de Entrada (Filtro Inicial)
            </h2>
          </div>

          <div className="p-10">
            {/* CAMBIO REAL 2: border-separate y border-spacing para separar filas físicamente */}
            <table className="w-full text-left border-separate border-spacing-y-8">
              <thead>
                <tr className="text-gray-400 text-[14px] font-bold uppercase tracking-widest">
                  <th className="px-8 pb-6">N° Solicitud</th>
                  <th className="px-8 pb-6">Trámite</th>
                  <th className="px-8 pb-6">Fecha Ingreso</th>
                  <th className="px-8 pb-6">Solicitante</th>
                  <th className="px-8 pb-6 text-center">Estado</th>
                  <th className="px-8 pb-6 text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((s, index) => (
                  <tr key={index} className="bg-white shadow-sm hover:shadow-md transition-all group border border-gray-100">
                    {/* CAMBIO REAL 3: py-20 para un alto de fila gigante */}
                    <td className="py-20 px-8 font-bold text-gray-800 border-y border-l border-gray-100 rounded-l-xl">{s.id}</td>
                    <td className="py-20 px-8 text-gray-600 border-y border-gray-100">{s.tramite}</td>
                    <td className="py-20 px-8 text-gray-600 border-y border-gray-100">{s.fecha}</td>
                    <td className="py-20 px-8 text-gray-600 border-y border-gray-100">{s.solicitante}</td>
                    <td className="py-20 px-8 text-center border-y border-gray-100">
                      <span className={`text-[12px] font-black px-4 py-2 rounded-full uppercase ${
                        s.estado === 'Nueva' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {s.estado}
                      </span>
                    </td>
                    <td className="py-20 px-8 text-center border-y border-r border-gray-100 rounded-r-xl">
                      <button className="bg-[#0F69B4] text-white text-[13px] font-bold px-8 py-3 rounded shadow-lg hover:scale-105 transition-all cursor-pointer">
                        {s.estado === 'Nueva' ? 'Iniciar Revisión' : 'Continuar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full h-[60px] bg-[#0051A8] border-t-[5px] border-[#E31837] flex items-center justify-center shrink-0">
        <div className="text-white text-[15px] font-light">
          Copyright © 2026 I. Municipalidad de Santo Domingo
        </div>
      </div>
    </div>
  );
}