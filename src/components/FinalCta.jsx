import Newsletter from "./Newsletter.jsx";

export default function FinalCta() {
  return (
    <section className="final-cta" id="community">
      <div className="cta-main">
        <p className="eyebrow">YOUR SKIN DESERVES A BETTER MATCH</p>
        <h2>Ready to meet<br /><em>your skin?</em></h2>
        <p className="cta-description">Your skin is unique. Your routine should be, too. Take the first step towards your perfect match.</p>
        <a href="#quiz" className="cta-button">BUILD MY ROUTINE <span>↗︎</span></a>
        <p className="cta-note">A little self-care goes a long way.</p>
      </div>

      <div className="community-box">
        <p className="eyebrow">A NOTE FROM SKINMATCH</p>
        <h3>Good skin days,<br /><em>delivered.</em></h3>
        <p className="community-description">Join our community for skincare tips, Korean beauty discoveries and product recommendations.</p>
        <Newsletter />
        <p className="newsletter-note">Just skincare inspiration. No unnecessary noise.</p>
      </div>
    </section>
  );
}
