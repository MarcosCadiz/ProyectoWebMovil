import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MenuFuncionario() {
  const navigate = useNavigate();

  const handleLogout = () => navigate('/');
  const handleRevision = (id) => {
    // In a real app, you'd navigate to a specific revision page for this ID
    console.log(`Navegando a revisión de solicitud ${id}`);
    navigate('/revision-solicitudes'); 
  };

  const solicitudes = [
    { id: "#45098", tramite: "Permiso de Obra Menor", fecha: "06/05/2026", solicitante: "Juan Pérez", estado: "Nueva" },
    { id: "#45097", tramite: "Regularización Vivienda", fecha: "05/05/2026", solicitante: "María Silva", estado: "Nueva" },
    { id: "#45090", tramite: "Patente Comercial", fecha: "04/05/2026", solicitante: "Constructora XYZ", estado: "En Revisión" },
    { id: "#45085", tramite: "Certificado de Informaciones Previas", fecha: "03/05/2026", solicitante: "Ricardo Lagos", estado: "Nueva" },
    { id: "#45079", tramite: "Recepción Definitiva", fecha: "01/05/2026", solicitante: "Patricia Soto", estado: "Nueva" },
    { id: "#45060", tramite: "Demolición", fecha: "28/04/2026", solicitante: "Andrés Bello", estado: "Nueva" },
    { id: "#45079", tramite: "Recepción Definitiva", fecha: "01/05/2026", solicitante: "Patricia Soto", estado: "Aprobada" },
    { id: "#45060", tramite: "Demolición", fecha: "28/04/2026", solicitante: "Andrés Bello", estado: "Rechazada" },
    { id: "#45055", tramite: "Fusión de Predios", fecha: "27/04/2026", solicitante: "Constructora Alfa", estado: "Nueva" },
    { id: "#45050", tramite: "Cambio de Destino", fecha: "26/04/2026", solicitante: "Pedro Pascal", estado: "En Revisión" },
    { id: "#45045", tramite: "Modificación de Proyecto", fecha: "25/04/2026", solicitante: "Sofía Vergara", estado: "Nueva" },
  ];

  return (
    <div className="w-full h-screen bg-[#F3F4F5] font-['Roboto',sans-serif] flex flex-col overflow-hidden">
      
      {/* Navbar Intranet */}
      <nav className="w-full h-[65px] min-h-[65px] bg-[#139CA6] border-b-[5px] border-[#E31837] flex items-center justify-between px-10 shadow-md z-50">
        <div className="text-white text-[20px] font-bold tracking-tight">
          DOM Santo Domingo - Intranet
        </div>
        
        <div className="flex items-center gap-6">
          <div className="bg-white px-4 py-1 rounded shadow-sm">
            <span className="text-[#0F69B4] text-[12px] font-bold uppercase">Funcionario DOM</span>
          </div>
          <div className="text-white text-[15px] font-medium">Roberto Gómez</div>
          <button 
            onClick={handleLogout}
            className="px-4 py-1.5 border border-white rounded text-white text-[12px] font-bold hover:bg-white/10 transition-all cursor-pointer"
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* Contenedor con scroll */}
      <main className="flex-1 overflow-y-auto px-12 py-10">
        
        {/* Card de la Bandeja */}
        <div className="w-full max-w-[1250px] mx-auto bg-white rounded-xl border border-gray-200 shadow-xl mb-10">
          
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-[#0F69B4] text-[28px] font-bold">
              Bandeja de Entrada (Filtro Inicial)
            </h2>
          </div>

          <div className="p-8">
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr className="text-gray-400 text-[13px] font-bold uppercase tracking-widest">
                  <th className="px-6 pb-4">N° Solicitud</th>
                  <th className="px-6 pb-4">Trámite</th>
                  <th className="px-6 pb-4">Fecha Ingreso</th>
                  <th className="px-6 pb-4">Solicitante</th>
                  <th className="px-6 pb-4 text-center">Estado</th>
                  <th className="px-6 pb-4 text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((s, index) => (
                  <tr key={index} className="bg-white shadow-sm hover:shadow-md transition-all group border border-gray-100 rounded-lg">
                    <td className="py-4 px-6 font-bold text-gray-800 border-y border-l border-gray-100 rounded-l-lg">{s.id}</td>
                    <td className="py-4 px-6 text-gray-600 border-y border-gray-100">{s.tramite}</td>
                    <td className="py-4 px-6 text-gray-600 border-y border-gray-100">{s.fecha}</td>
                    <td className="py-4 px-6 text-gray-600 border-y border-gray-100">{s.solicitante}</td>
                    <td className="py-4 px-6 text-center border-y border-gray-100">
                      <span className={`text-[11px] font-black px-3 py-1 rounded-full uppercase ${
                        s.estado === 'Nueva' ? 'bg-orange-100 text-orange-600' :
                        s.estado === 'En Revisión' ? 'bg-blue-100 text-blue-600' :
                        s.estado === 'Aprobada' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {s.estado}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center border-y border-r border-gray-100 rounded-r-lg">
                      <button 
                        onClick={() => handleRevision(s.id)}
                        className="bg-[#0F69B4] text-white text-[12px] font-bold px-4 py-2 rounded shadow-md hover:bg-[#0d5a9c] transition-all cursor-pointer"
                      >
                        {s.estado === 'Nueva' ? 'Iniciar Revisión' : 'Continuar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full h-[58px] min-h-[58px] bg-[#0051A8] border-t-[5px] border-[#E31837] flex items-center justify-center shrink-0">
        <div className="text-white text-[16px] font-normal">
          Copyright © 2026 I. Municipalidad de Santo Domingo
        </div>
      </footer>
    </div>
  );
}