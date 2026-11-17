import { contactLinks } from "../data/siteContent.js";

export default function Contacts() {
  return (
    <section className="contacts-section" id="contacts">
      <div className="contacts-content">
        <div className="contacts-intro">
          <p className="eyebrow">A LITTLE NOTE TO YOUR SKIN</p>
          <h2>LET'S TALK<br /><span>SKINCARE.</span></h2>
          <p className="contacts-description">Questions, curiosities or just looking for your next skin favourite? We're only a message away.</p>
          <span className="contacts-decoration">Your skin, your story.</span>
        </div>

        <div className="contacts-details">
          {contactLinks.map((link) => {
            const isExternal = link.href.startsWith("http");
            return (
              <a
                key={link.id}
                href={link.href}
                className="contacts-link"
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
              >
                <span className="contacts-number">{link.number}</span>
                <span className="contacts-label">
                  <small>{link.small}</small>
                  <strong>{link.title}</strong>
                  <span>{link.text}</span>
                </span>
                <span className="contacts-arrow">↗︎</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
