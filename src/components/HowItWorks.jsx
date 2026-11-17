import StepCard from "./StepCard.jsx";
import { steps } from "../data/siteContent.js";

export default function HowItWorks() {
  return (
    <section className="steps-section" id="how-it-works">
      <div className="steps-intro">
        <div>
          <p className="eyebrow">LESS GUESSING, MORE GLOW</p>
          <h2>Your skin.<br /><em>Your own kind of glow.</em></h2>
        </div>
        <p className="steps-intro-text">Skincare is personal. Your routine should be, too. Let's find what feels right for you.</p>
      </div>

      <div className="steps-grid">
        {steps.map((step) => (
          <StepCard key={step.id} step={step} />
        ))}
      </div>

      <div className="steps-footer">
        <span>01 — DISCOVER</span>
        <span className="steps-footer-line"></span>
        <span>02 — MATCH</span>
        <span className="steps-footer-line"></span>
        <span>03 — GLOW</span>
      </div>
    </section>
  );
}
