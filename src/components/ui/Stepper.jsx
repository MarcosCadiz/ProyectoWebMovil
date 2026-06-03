export default function Stepper() {
  return (
    <div className="stepper" aria-label="Etapas del trámite">
      <span className="step complete">✓</span>
      <span className="step-line" />
      <span className="step">2</span>
      <span className="step-line" />
      <span className="step">3</span>
    </div>
  );
}
