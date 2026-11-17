import { useState } from "react";
import FilterBar from "./FilterBar.jsx";
import ProductCard from "./ProductCard.jsx";

// The shop: filters + product grid.
// The products come from App, which loads them from the API.
// State: activeFilter -> the filter button currently selected
export default function Shop({ products, status, error, onRetry, onAddToCart }) {
  const [activeFilter, setActiveFilter] = useState("all");

  // The visible products are calculated from the state, nothing is hidden by hand
  const visibleProducts = products.filter((product) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "must-have") return product.mustHave;
    return product.category === activeFilter;
  });

  return (
    <section className="shop-section" id="shop">
      <div className="shop-heading">
        <p className="eyebrow">YOUR SKINCARE DESTINATION</p>
        <h2>FIND YOUR SKINMATCH</h2>
        <p>Discover Korean skincare selected for your skin needs.</p>
      </div>

      <FilterBar activeFilter={activeFilter} onChange={setActiveFilter} />

      {status === "loading" && (
        <p className="status-message"><span className="spinner" aria-hidden="true"></span> Loading products…</p>
      )}

      {status === "error" && (
        <div className="status-message status-error" role="alert">
          <p>We couldn't load the products. {error}</p>
          <button type="button" className="button button-secondary" onClick={onRetry}>TRY AGAIN</button>
        </div>
      )}

      {status === "success" && visibleProducts.length === 0 && (
        <p className="status-message">No products in this category yet.</p>
      )}

      {status === "success" && (
        <div className="shop-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}

      <div className="shop-quiz-cta">
        <p className="eyebrow">NOT SURE WHERE TO START?</p>
        <h2>LET YOUR SKIN DECIDE</h2>
        <p>Take our quiz and discover a routine tailored to your needs.</p>
        <a href="#quiz" className="shop-quiz-button">FIND MY ROUTINE</a>
      </div>
    </section>
  );
}
