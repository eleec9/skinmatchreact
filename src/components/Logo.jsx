// SkinMatch logo, used in the header and in the footer
export default function Logo({ href = "#home" }) {
  return (
    <a href={href} className="logo" aria-label="SkinMatch home">
      <span className="logo-initial">S</span>
      <span className="logo-rest">kin</span>
      <span className="logo-initial">M</span>
      <span className="logo-rest">atch</span>
      <span className="logo-dot">.</span>
    </a>
  );
}
