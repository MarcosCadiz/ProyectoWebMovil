export default function PrimaryButton({ text, onClick, className = "" }) {
  return (
    <a 
      onClick={onClick}
      className={`-translate-x-1/2 absolute content-stretch cursor-pointer drop-shadow-[0px_3.998px_1.999px_rgba(0,0,0,0.25)] flex h-[39.981px] items-center justify-center px-[15.993px] py-[7.996px] w-[434.799px] ${className}`}
      style={{ backgroundColor: 'var(--primario\\/darken-1,#0051a8)' }}
    >
      <p className="capitalize font-['Roboto:Bold',sans-serif] font-bold leading-[1.5] relative shrink-0 text-[15.99px] text-center whitespace-nowrap text-white">
        {text}
      </p>
    </a>
  );
}