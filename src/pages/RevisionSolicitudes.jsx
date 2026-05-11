import React from 'react';
import { Link } from 'react-router-dom';

export default function RevisionSolicitudes() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/menu-funcionario" className="text-[#139ca6] mb-4 inline-block">← Volver al Panel</Link>
        <h1 className="text-3xl font-bold mb-8">Bandeja de Revisión</h1>
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <input type="text" placeholder="Filtrar por RUT o ID..." className="border p-2 rounded w-full max-w-sm" />
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">RUT Ciudadano</th>
                <th className="p-4">Tipo Solicitud</th>
                <th className="p-4">Fecha</th>
                <th className="p-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-4">12.345.678-9</td>
                <td className="p-4">Ampliación de Vivienda</td>
                <td className="p-4">24/05/2026</td>
                <td className="p-4 flex gap-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded">Aprobar</button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded">Rechazar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
