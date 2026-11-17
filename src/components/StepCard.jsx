// One of the three "How it works" cards. Reused three times with different props.
export default function StepCard({ step }) {
  return (
    <article className={`step-card ${step.className}`}>
      <div className="step-top">
        <span className="step-number">{step.number}</span>
      </div>
      <div className="step-content">
        <p className="step-label">{step.label}</p>
        <h3>{step.title[0]}<br />{step.title[1]}</h3>
        <p>{step.text}</p>
      </div>
    </article>
  );
}
