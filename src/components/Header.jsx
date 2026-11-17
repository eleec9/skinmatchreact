import Logo from "./Logo.jsx";
import { navLinks } from "../data/siteContent.js";

// Props:
//   cartCount  -> number shown on the bag icon
//   onOpenCart -> function called when the bag icon is clicked
export default function Header({ cartCount, onOpenCart }) {
  return (
    <header className="site-header" id="top">
      <Logo />

      <nav className="main-nav" aria-label="Main navigation">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
      </nav>

      <a href="#quiz" className="header-cta">
        FIND YOUR MATCH <span className="button-arrow" aria-hidden="true">↗︎</span>
      </a>

      <button className="cart-button" type="button" aria-label={`Open shopping bag, ${cartCount} items`} onClick={onOpenCart}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 7h12l1 14H5L6 7Z"></path>
          <path d="M9 7a3 3 0 0 1 6 0"></path>
        </svg>
        <span className="cart-count">{cartCount}</span>
      </button>
    </header>
  );
}
