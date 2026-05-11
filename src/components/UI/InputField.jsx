export default function InputField({ label, placeholder, type = "text", value, onChange }) {
  return (
    <div className="relative h-[72.966px] w-[449.792px] mb-[24.99px]">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[1.2] left-0 text-[#333] text-[13.994px] top-0 w-[457.788px]">
        {label}
      </p>
      <div className="absolute bg-white border border-[#ccc] border-solid h-[47.978px] left-0 overflow-clip rounded-[3.998px] top-[24.99px] w-[449.792px]">
        <input 
          type={type}
          placeholder={placeholder}
          className="absolute inset-0 px-[13.99px] text-[15.993px] outline-none"
        />
      </div>
    </div>
  );
}