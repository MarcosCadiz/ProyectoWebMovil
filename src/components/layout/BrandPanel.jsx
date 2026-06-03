import MunicipalMarks from '../brand/MunicipalMarks';

export default function BrandPanel({ variant = 'blue' }) {
  return (
    <section className={`brand-panel ${variant === 'teal' ? 'brand-panel-teal' : ''}`}>
      <div className="brand-panel-copy">
        <h1>Plataforma DOM en Línea</h1>
        <p>
          Bienvenido al portal de la Dirección de Obras Municipales de la Municipalidad de Santo Domingo.
          <br />
          <br />
          Ingrese para gestionar sus permisos de edificación, patentes y hacer seguimiento a sus trámites de manera rápida, transparente y segura.
        </p>
      </div>
      <MunicipalMarks className="brand-marks" />
      <div className="brand-copyright">Copyright © 2026 I. Municipalidad de Santo Domingo</div>
      <div className="red-rule" />
    </section>
  );
}
