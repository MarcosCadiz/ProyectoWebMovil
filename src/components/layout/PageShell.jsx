import MunicipalMarks from '../brand/MunicipalMarks';

export default function PageShell({ children, variant = 'blue', marks = true }) {
  const isStaff = variant === 'staff';

  return (
    <div className={`figma-page ${isStaff ? 'staff-theme' : ''}`}>
      {children}
      {marks && <MunicipalMarks className="shell-marks" />}
      <footer className={`figma-footer ${isStaff ? 'footer-teal' : ''}`}>
        Copyright © 2026 I. Municipalidad de Santo Domingo
      </footer>
    </div>
  );
}
