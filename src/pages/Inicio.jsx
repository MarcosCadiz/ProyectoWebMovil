import React from 'react';
import { useNavigate } from 'react-router-dom';

// Assets definidos según el patrón del proyecto
const m = "https://www.figma.com/api/mcp/asset/743100c7-fbef-4cc8-98a7-9da99bb0976f"; // Ilustración/Imagen 1
const g = "https://www.figma.com/api/mcp/asset/47fde787-8f3c-4579-9243-6789fab7ccbe"; // Fondo Logo
const _ = "https://www.figma.com/api/mcp/asset/00d1a15e-5d8a-4daa-904d-e7da935a72b6"; // Escudo

export default function Inicio() {
  const navigate = useNavigate();

  const handleUserLogin = () => {
    navigate('/login-usuario');
  };

  const handleStaffLogin = () => {
    navigate('/login-funcionario');
  };

  return (
    <div className="w-full h-screen relative bg-[#f3f4f5] overflow-hidden font-['Roboto',sans-serif] flex">
      
        {/* Panel Izquierdo - Informativo (Azul) */}
        <div className="w-[60%] h-full bg-[#0070A8] relative overflow-hidden flex flex-col items-center justify-center px-16 z-10">
          
          {/* Título Principal */}
          <h1 
            className="text-center text-white text-[48px] font-bold leading-tight mb-10"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Plataforma DOM en Línea
          </h1>

          {/* Texto de Bienvenida / Descripción */}
          <p 
            className="text-center text-white text-[28px] font-normal leading-relaxed whitespace-pre-wrap max-w-[800px] mb-20"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {"Bienvenido al portal de la Dirección de Obras Municipales de la Municipalidad de Santo Domingo.\n\nIngrese para gestionar sus permisos de edificación, patentes y hacer seguimiento a sus trámites de manera rápida, transparente y segura."}
          </p>

          {/* Ilustración / Image 1 */}
          <div className="absolute w-[89px] h-[143.93px] right-[10%] bottom-[80px]">
            <img className="size-full object-contain" src={m} alt="" />
          </div>

          {/* Logo y Escudo Municipal */}
          <div className="absolute w-[157.88px] h-[144px] left-[40px] bottom-[80px] overflow-hidden">
            <img className="absolute inset-0 size-full" src={g} alt="" />
            <div className="absolute inset-[6.55%_63.21%_68.95%_5.94%]">
              <img className="size-full" src={_} alt="Escudo Santo Domingo" />
            </div>
          </div>

          {/* Copyright */}
          <div 
            className="absolute left-[40px] bottom-[20px] text-white text-[16px] font-normal"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Copyright © 2026 I. Municipalidad de Santo Domingo
          </div>

          {/* Barra Roja - Margen inferior del panel azul */}
          <div className="absolute inset-x-0 bottom-0 h-[8px] bg-[#E31837] z-50"></div>
        </div>

        {/* Panel Derecho - Selección de Perfil (Blanco) */}
        <div className="w-[40%] h-full bg-white flex items-center justify-center border-l border-[#eeeeee]">
          <div className="w-[80%] max-w-[434px] flex flex-col items-center">
            <p 
              className="text-[#333] text-[26px] font-medium mb-14 text-center"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              ¿Cómo desea iniciar sesión?
            </p>
            
            <div className="flex flex-col gap-8 w-full">
              <button 
                onClick={handleUserLogin}
                className="flex h-[58px] items-center justify-center bg-[#0051a8] text-white font-bold rounded-full shadow-lg hover:bg-[#003d7a] transition-all text-[18px] uppercase tracking-wider cursor-pointer"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Usuario
              </button>
              <button 
                onClick={handleStaffLogin}
                className="flex h-[58px] items-center justify-center bg-[#139ca6] text-white font-bold rounded-full shadow-lg hover:opacity-90 transition-all text-[18px] uppercase tracking-wider cursor-pointer"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Funcionario
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}
