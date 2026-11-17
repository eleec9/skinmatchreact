import { useState } from "react";
import { searchBeautyProducts } from "../api/beautyFactsApi.js";
import CheckerAnalysis from "./CheckerAnalysis.jsx";

// "Check the product you already use"
// The user types the name of a product -> we search it on Open Beauty Facts (public API)
// -> the user picks one result -> CheckerAnalysis compares its ingredients with the quiz result.
//
// State:
//   query       -> text in the search field (controlled input)
//   inputError  -> validation message (empty or too short search)
//   status      -> "idle" | "loading" | "success" | "error"
//   results     -> products returned by the API
//   apiError    -> message shown when the request fails
//   selected    -> the product the user clicked
export default function ProductChecker({ result, products, onAddToCart }) {
  const [query, setQuery] = useState("");
  const [inputError, setInputError] = useState("");
  const [status, setStatus] = useState("idle");
  const [results, setResults] = useState([]);
  const [apiError, setApiError] = useState("");
  const [selected, setSelected] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    // Validation before calling the API
    const searchText = query.trim();
    if (searchText.length < 3) {
      setInputError("Please type at least 3 characters, e.g. a brand and a product name.");
      return;
    }

    setInputError("");
    setSelected(null);
    setStatus("loading");

    try {
      const foundProducts = await searchBeautyProducts(searchText);
      setResults(foundProducts);
      setStatus("success");
    } catch (error) {
      setApiError(error.message);
      setStatus("error");
    }
  }

  return (
    <section className="checker-section" id="checker">
      <div className="section-heading">
        <p className="eyebrow">ALREADY HAVE A FAVOURITE?</p>
        <h2>CHECK THE PRODUCT YOU USE</h2>
        <p>
          Search for a product you already own. We'll read its ingredients
          {result ? " and compare them with your SkinMatch profile." : ". Take the quiz first to compare them with your skin profile."}
        </p>
      </div>

      <form className="checker-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="checker-search" className="visually-hidden">Product name</label>
        <input
          id="checker-search"
          type="search"
          placeholder="e.g. Nivea Soft, CeraVe moisturising cream…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-invalid={inputError ? "true" : "false"}
          aria-describedby={inputError ? "checker-input-error" : undefined}
        />
        <button type="submit" className="button button-primary" disabled={status === "loading"}>
          {status === "loading" ? "SEARCHING…" : "SEARCH"}
        </button>
      </form>

      {inputError && <p className="form-error" id="checker-input-error" role="alert">{inputError}</p>}

      <div className="checker-content" aria-live="polite">
        {status === "loading" && (
          <p className="status-message"><span className="spinner" aria-hidden="true"></span> Searching the Open Beauty Facts database…</p>
        )}

        {status === "error" && (
          <div className="status-message status-error">
            <p>{apiError}</p>
            <button type="button" className="button button-secondary" onClick={handleSubmit}>TRY AGAIN</button>
          </div>
        )}

        {status === "success" && results.length === 0 && (
          <p className="status-message">
            No products found for "{query.trim()}". Try a shorter name or just the brand.
          </p>
        )}

        {status === "success" && results.length > 0 && !selected && (
          <>
            <p className="checker-hint">{results.length} products found. Choose yours:</p>
            <div className="checker-results">
              {results.map((product) => (
                <button type="button" className="checker-result" key={product.code} onClick={() => setSelected(product)}>
                  {product.image
                    ? <img src={product.image} alt="" loading="lazy" />
                    : <span className="checker-no-image" aria-hidden="true">?</span>}
                  <span>
                    <strong>{product.name}</strong>
                    <small>{product.brand || "Unknown brand"}</small>
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {selected && (
          <CheckerAnalysis
            product={selected}
            result={result}
            products={products}
            onAddToCart={onAddToCart}
            onBack={() => setSelected(null)}
          />
        )}
      </div>

      <p className="checker-credit">
        Product data from <a href="https://world.openbeautyfacts.org" target="_blank" rel="noopener noreferrer">Open Beauty Facts</a>, an open database built by volunteers.
      </p>
    </section>
  );
}
