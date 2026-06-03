import { municipalAssets } from '../../data/assets';

export default function MunicipalMarks({ className = '' }) {
  return (
    <div className={`municipal-marks ${className}`}>
      <img className="gob-mark" src={municipalAssets.gobierno} alt="Gobierno de Chile" />
      <div className="sd-mark" aria-label="Municipalidad de Santo Domingo">
        <img src={municipalAssets.logo} alt="" />
        <img className="sd-escudo" src={municipalAssets.escudo} alt="" />
        <img className="sd-texto" src={municipalAssets.texto} alt="" />
      </div>
    </div>
  );
}
