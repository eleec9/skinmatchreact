import { useState } from "react";
import { searchBeautyProducts } from "../api/beautyFactsApi.js";
import CheckerAnalysis from "./CheckerAnalysis.jsx";

// "Is your everyday cream right for you?"
// The user types the name of the face cream they already use (often a supermarket brand)
// -> we search it on Open Beauty Facts (public API), only among face creams
// -> the user picks one result -> CheckerAnalysis compares its ingredients with the quiz result
//    and suggests the Korean skincare product that adds what is missing.
//
// State:
//   query       -> text in the search field (controlled input)
//   inputError  -> validation message (empty or too short search)
//   status      -> "idle" | "loading" | "success" | "error"
//   results     -> products returned by the API (only the ones with an ingredient list)
//   foundCount  -> how many face creams matched, including the ones without ingredients
//   apiError    -> message shown when the request fails
//   selected    -> the product the user clicked

// Brands with many face creams in the database: one click to try the search
const quickSearches = ["Nivea", "Neutrogena", "Garnier", "Diadermine", "L'Oréal", "La Roche-Posay"];

export default function ProductChecker({ result, products, onAddToCart }) {
  const [query, setQuery] = useState("");
  const [inputError, setInputError] = useState("");
  const [status, setStatus] = useState("idle");
  const [results, setResults] = useState([]);
  const [foundCount, setFoundCount] = useState(0);
  const [apiError, setApiError] = useState("");
  const [selected, setSelected] = useState(null);

  // Calls the API and updates the state with the answer
  async function runSearch(text) {
    const searchText = text.trim();

    // Validation before calling the API
    if (searchText.length < 3) {
      setInputError("Please type at least 3 characters, e.g. a brand or a cream name.");
      return;
    }

    setInputError("");
    setSelected(null);
    setStatus("loading");

    try {
      const data = await searchBeautyProducts(searchText);
      setResults(data.products);
      setFoundCount(data.foundCount);
      setStatus("success");
    } catch (error) {
      setApiError(error.message);
      setStatus("error");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    runSearch(query);
  }

  // A quick-search button fills the field and searches straight away
  function handleQuickSearch(brand) {
    setQuery(brand);
    runSearch(brand);
  }

  return (
    <section className="checker-section" id="checker">
      <div className="section-heading">
        <p className="eyebrow">ALREADY HAVE A FAVOURITE?</p>
        <h2>IS YOUR EVERYDAY CREAM RIGHT FOR YOU?</h2>
        <p>
          Search for the face cream you already use. We'll read its ingredients
          {result
            ? ", compare them with your SkinMatch profile and show you which Korean skincare step could complete it."
            : ". Take the quiz first to compare them with your skin profile."}
        </p>
      </div>

      <form className="checker-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="checker-search" className="visually-hidden">Product name</label>
        <input
          id="checker-search"
          type="search"
          placeholder="Brand or cream name, e.g. Nivea, Hydro Boost…"
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

      <div className="checker-quick" aria-label="Popular brands">
        <span>Try:</span>
        {quickSearches.map((brand) => (
          <button type="button" key={brand} className="shop-filter" onClick={() => handleQuickSearch(brand)} disabled={status === "loading"}>
            {brand}
          </button>
        ))}
      </div>

      <div className="checker-content" aria-live="polite">
        {status === "loading" && (
          <p className="status-message"><span className="spinner" aria-hidden="true"></span> Searching face creams on Open Beauty Facts…</p>
        )}

        {status === "error" && (
          <div className="status-message status-error">
            <p>{apiError}</p>
            <button type="button" className="button button-secondary" onClick={() => runSearch(query)}>TRY AGAIN</button>
          </div>
        )}

        {/* Nothing found: unknown brand or product name */}
        {status === "success" && foundCount === 0 && (
          <p className="status-message">
            We couldn't find "{query.trim()}" among the face creams in the Open Beauty Facts database.
            Check the spelling, try just the brand name, or pick one of the suggestions above.
          </p>
        )}

        {/* Found, but none of the results has an ingredient list we can read */}
        {status === "success" && foundCount > 0 && results.length === 0 && (
          <p className="status-message">
            {foundCount === 1
              ? `We found a face cream for "${query.trim()}", but its ingredient list hasn't been added to the database yet, so we can't check it.`
              : `We found ${foundCount} face creams for "${query.trim()}", but their ingredient lists haven't been added to the database yet, so we can't check them.`}
            {" "}Try another product or one of the suggestions above.
          </p>
        )}

        {status === "success" && results.length > 0 && !selected && (
          <>
            <p className="checker-hint">{results.length} face creams found. Choose yours:</p>
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
