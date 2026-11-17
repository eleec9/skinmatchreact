export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="eyebrow">YOUR SKINCARE, REIMAGINED</p>
        <h1>Your skin had a routine.<br />Does it have the <em>right one?</em></h1>
        <p className="hero-description">
          Let's find it. Tell us about your habits, lifestyle and skin concerns. We'll build a routine made just for you!
        </p>

        <a href="#quiz" className="button-primary">
          <span>BUILD MY ROUTINE</span>
          <span className="button-arrow" aria-hidden="true">↗︎</span>
        </a>

        <p className="hero-note">Your skin. Your lifestyle. Your match.</p>
      </div>

      <div className="hero-visual">
        <video className="hero-video" autoPlay muted loop playsInline aria-label="Skincare routine video">
          <source src="videos/SkinCare_mp4.mp4" type="video/mp4" />
          Your browser does not support HTML video.
        </video>
      </div>
    </section>
  );
}
