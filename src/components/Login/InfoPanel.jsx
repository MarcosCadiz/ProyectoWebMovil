const imgImage1 = "https://www.figma.com/api/mcp/asset/743100c7-fbef-4cc8-98a7-9da99bb0976f";
const imgLogo = "https://www.figma.com/api/mcp/asset/47fde787-8f3c-4579-9243-6789fab7ccbe";
const imgEscudo = "https://www.figma.com/api/mcp/asset/00d1a15e-5d8a-4daa-904d-e7da935a72b6";

export default function InfoPanel() {
  return (
    <div className="absolute bg-[#139ca6] h-[1079.5px] left-[-5px] top-[2px] w-[1157.123px]">
      <div className="absolute h-[143.933px] left-[222px] top-[886px] w-[89.002px]">
        <img alt="" className="absolute h-full w-full" src={imgImage1} />
      </div>
      <p className="-translate-x-1/2 absolute font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] left-[calc(50%-43.34px)] text-[47.978px] text-center text-white top-[294px] w-[784.437px]">
        Plataforma DOM en Línea
      </p>
      <div className="-translate-x-1/2 absolute font-['Roboto:Regular',sans-serif] font-normal h-[263px] leading-[0] left-[calc(50%-0.06px)] text-[32px] text-center text-white top-[422px] w-[783px] whitespace-pre-wrap">
        <p className="leading-[30.706px] mb-0">Bienvenido al portal de la Dirección de Obras Municipales de la Municipalidad de Santo Domingo.</p>
        <p className="leading-[30.706px] mt-4">Ingrese para gestionar sus permisos de edificación, patentes y hacer seguimiento a sus trámites de manera rápida, transparente y segura.</p>
      </div>
      <div className="absolute bg-[#e31837] h-[7.996px] left-0 top-[1071.5px] w-[1151.467px]" />
      <div className="absolute h-[144px] left-[29px] top-[886px] w-[157.879px]">
        <img alt="Logo" className="absolute size-full" src={imgLogo} />
        <img alt="Escudo" className="absolute left-[5.94%] top-[6.55%] w-[30%]" src={imgEscudo} />
      </div>
      <p className="-translate-x-1/2 absolute font-['Roboto:Regular',sans-serif] font-normal h-[33px] leading-[30.72px] left-[calc(50%-342.06px)] text-[19.2px] text-center text-white top-[1039px] w-[479px]">
        Copyright © 2026 I. Municipalidad de Santo Domingo
      </p>
    </div>
  );
}