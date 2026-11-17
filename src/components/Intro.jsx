export default function Intro() {
  return (
    <section className="intro-section" id="discover">
      <div className="intro-content">
        <p className="eyebrow">SKINCARE, BUT MAKE IT UNIQUE</p>
        <h2>Meet your skin.<br /><em>Find your match.</em></h2>
        <p className="intro-description">
          Skincare is not universal. Your skin has its own needs,
          your lifestyle has its own rhythm, and your routine should reflect both.
        </p>
        <a href="#quiz" className="intro-button">
          MEET YOUR SKIN
          <span className="intro-button-arrow" aria-hidden="true">↗︎</span>
        </a>
      </div>

      <div className="intro-image">
        <img src="images/skincare-routine.jpg" alt="Skincare products in a soft, natural setting" />
      </div>
    </section>
  );
}
