import { useState } from "react";

// Newsletter sign-up: a small controlled form with validation.
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    // Simple email check: something@something.something
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!isValid) {
      setIsError(true);
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsError(false);
    setMessage("Thank you for joining the SkinMatch community!");
    setEmail("");
  }

  return (
    <>
      <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="newsletter-email" className="visually-hidden">Your email address</label>
        <input
          type="email"
          id="newsletter-email"
          placeholder="Your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={isError}
        />
        <button type="submit" aria-label="Join the community">→</button>
      </form>
      <p className={`newsletter-message ${isError ? "is-error" : ""}`} aria-live="polite">{message}</p>
    </>
  );
}
