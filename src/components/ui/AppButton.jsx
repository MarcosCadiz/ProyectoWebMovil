import { Link } from 'react-router-dom';

function RoutedButton({ children, to, className, type, onClick }) {
  const button = (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );

  if (to) {
    return <Link className="button-link" to={to}>{button}</Link>;
  }

  return button;
}

export function PrimaryButton({ children, to, onClick, className = '', type = 'button' }) {
  return (
    <RoutedButton className={`primary-button ${className}`} type={type} to={to} onClick={onClick}>
      {children}
    </RoutedButton>
  );
}

export function OutlineButton({ children, to, onClick, className = '' }) {
  return (
    <RoutedButton className={`outline-button ${className}`} type="button" to={to} onClick={onClick}>
      {children}
    </RoutedButton>
  );
}
