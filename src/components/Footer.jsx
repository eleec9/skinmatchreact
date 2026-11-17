import Logo from "./Logo.jsx";
import { footerLinks } from "../data/siteContent.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Logo href="#top" />
          <p className="footer-tagline">Skincare discovery, made unique.</p>
        </div>

        <nav className="footer-navigation" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href}><span>{link.number}</span> {link.label}</a>
          ))}
        </nav>

        <div className="footer-contacts">
          <h3>Follow the glow</h3>

          <div className="footer-socials">
            <a href="https://www.instagram.com/skinmatch/" className="footer-social" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                <circle cx="12" cy="12" r="4"></circle>
                <circle cx="17.5" cy="6.5" r="0.8" className="icon-dot"></circle>
              </svg>
            </a>

            <a href="https://wa.me/393299764612" className="footer-social" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z"></path>
                <path d="M9 8.5c.5 2 2 3.5 4.5 4.5l1.5-1 2 1c-.2 1.5-1.2 2.5-2.7 2.5-3.5-.5-6.5-3.5-7-7 0-1.5 1-2.5 2.5-2.7l1 2Z"></path>
              </svg>
            </a>

            <a href="mailto:iulm.group@skinmatch.com" className="footer-social" aria-label="Email">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="1.5"></rect>
                <path d="m4 7 8 6 8-6"></path>
              </svg>
            </a>
          </div>

          <p className="footer-contacts-text">
            Skincare tips, new arrivals and more.<br />
            Stay connected.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 SkinMatch. All rights reserved.</p>
        <button className="back-to-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span>Back to top</span>
          <span className="back-to-top-arrow" aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
}
