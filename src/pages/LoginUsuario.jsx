import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../components/UI/InputField';

// Assets del proyecto
const m = "https://www.figma.com/api/mcp/asset/743100c7-fbef-4cc8-98a7-9da99bb0976f"; // Ilustración
const g = "https://www.figma.com/api/mcp/asset/47fde787-8f3c-4579-9243-6789fab7ccbe"; // Fondo Logo
const _ = "https://www.figma.com/api/mcp/asset/00d1a15e-5d8a-4daa-904d-e7da935a72b6"; // Escudo
const imgClaveunica = "https://www.figma.com/api/mcp/asset/2dc227c2-786c-40ca-9e4d-d60f1aa673f4";

export default function LoginUsuario() {
  const navigate = useNavigate();

  const handleAccess = (e) => {
    if (e) e.preventDefault();
    navigate('/menu-usuario');
  };

  return (
    <div className="w-full h-screen relative bg-[#f3f4f5] overflow-hidden font-['Roboto',sans-serif] flex">
      
      {/* Panel Izquierdo - Informativo (Azul) */}
      <div className="w-[60%] h-full bg-[#0070A8] relative overflow-hidden flex flex-col items-center justify-center px-16 z-10">
        <h1 
          className="text-center text-white text-[48px] font-bold leading-tight mb-10"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Plataforma DOM en Línea
        </h1>

        <p 
          className="text-center text-white text-[28px] font-normal leading-relaxed whitespace-pre-wrap max-w-[800px] mb-20"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {"Acceso para ciudadanos.\n\nIngrese para gestionar sus trámites de manera rápida, transparente y segura."}
        </p>

        <div className="absolute w-[89px] h-[143.93px] right-[10%] bottom-[80px]">
          <img className="size-full object-contain" src={m} alt="" />
        </div>

        <div className="absolute w-[157.88px] h-[144px] left-[40px] bottom-[80px] overflow-hidden">
          <img className="absolute inset-0 size-full" src={g} alt="" />
          <div className="absolute inset-[6.55%_63.21%_68.95%_5.94%]">
            <img className="size-full" src={_} alt="Escudo Santo Domingo" />
          </div>
        </div>

        <div className="absolute left-[40px] bottom-[20px] text-white text-[16px] font-normal">
          Copyright © 2026 I. Municipalidad de Santo Domingo
        </div>
      </div>

      {/* Panel Derecho - Formulario (Blanco) */}
      <div className="w-[40%] h-full bg-white flex items-center justify-center border-l border-[#eeeeee]">
        <div className="w-[80%] max-w-[450px]">
          <div className="mb-10">
            <h2 className="font-['Roboto:Bold',sans-serif] font-bold text-[#0f69b4] text-[24px]">Iniciar Sesión</h2>
            <p className="font-['Roboto:Regular',sans-serif] font-normal text-[#333] text-[16px]">Ingresa tus credenciales para acceder (Ciudadano)</p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleAccess}>
            <InputField label="RUT" placeholder="Ej: 12.345.678-9" />
            <InputField label="Contraseña" placeholder="••••••••" type="password" />

            <button 
              type="submit"
              className="cursor-pointer drop-shadow-md flex h-[48px] items-center justify-center w-full rounded-[4px] bg-[#0051a8] hover:bg-[#003d7a] transition-all"
            >
              <span className="capitalize font-['Roboto:Bold',sans-serif] font-bold text-[16px] text-white">Iniciar sesión</span>
            </button>

            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">O ingresa con</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button 
              type="button"
              onClick={handleAccess}
              className="flex gap-2 h-[58px] items-center justify-center w-full rounded-[4px] bg-[#0051a8] border-2 border-transparent hover:opacity-90 transition-all text-white"
            >
              <img alt="" className="size-[24px]" src={imgClaveunica} />
              <span className="font-['Roboto:Bold',sans-serif] font-bold text-[16px]">ClaveÚnica</span>
            </button>

            <div className="flex justify-between mt-4">
              <Link to="#" className="text-[#0f69b4] text-[14px] font-medium hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
              <Link to="#" className="text-[#0f69b4] text-[14px] font-medium hover:underline text-right">
                Registrarse
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
