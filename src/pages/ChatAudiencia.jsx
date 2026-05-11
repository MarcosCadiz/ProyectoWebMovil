import React from 'react';
import { Link } from 'react-router-dom';

export default function ChatAudiencia() {
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <div>
          <h2 className="font-bold">Audiencia Virtual</h2>
          <p className="text-xs text-green-500">Funcionario Conectado</p>
        </div>
        <Link to="/menu-usuario" className="text-red-500 font-medium">Finalizar Sesión</Link>
      </nav>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-[#e9f5fe] p-3 rounded-lg max-w-[80%] self-start">
          <p className="text-sm">Hola, bienvenido. ¿En qué puedo ayudarle hoy con su trámite?</p>
          <span className="text-[10px] text-gray-500">10:00 AM</span>
        </div>
        <div className="bg-white p-3 rounded-lg max-w-[80%] self-end ml-auto border">
          <p className="text-sm">Buenos días, tengo una duda sobre el plano que adjunté.</p>
          <span className="text-[10px] text-gray-500">10:01 AM</span>
        </div>
      </div>

      <div className="p-4 bg-white border-t flex gap-2">
        <input type="text" placeholder="Escribe un mensaje..." className="flex-1 border rounded-full px-4 py-2 outline-none focus:border-[#0f69b4]" />
        <button className="bg-[#0f69b4] text-white p-2 rounded-full w-10 h-10 flex items-center justify-center">
          →
        </button>
      </div>
    </div>
  );
}
