import { useEffect, useRef } from "react";
import ResultList from "./ResultList.jsx";
import RecommendedProducts from "./RecommendedProducts.jsx";

// Shows the quiz result. Everything it displays comes from the "result" prop,
// calculated in utils/buildResult.js.
export default function Result({ result, products, productsStatus, onAddToCart, onAddAll, onRetake }) {
  const sectionRef = useRef(null);

  // When the result appears, scroll down to it
  useEffect(() => {
    sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  function handleRetake() {
    onRetake();
    document.getElementById("quiz").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const ingredients = result.ingredients.length
    ? result.ingredients
    : ["Begin with gentle, basic products while you learn about your skin."];

  return (
    <div className="results-section" ref={sectionRef} aria-live="polite">
      <p className="eyebrow">YOUR SKINMATCH PROFILE</p>
      <h2>{result.title}</h2>
      <p id="profile-description">{result.description}</p>

      <div id="routine-recommendations">
        <ResultList title="Ingredients to explore" items={ingredients} />
        <ResultList title={`Your ${result.routineName} morning routine`} items={result.morning} numbered />
        <ResultList title={`Your ${result.routineName} evening routine`} items={result.evening} numbered />
        {result.concernList.length > 0 && <ResultList title="Your selected concerns" items={result.concernList} />}
        {result.notes.length > 0 && <ResultList title="Important notes" items={result.notes} />}

        <RecommendedProducts
          productIds={result.recommendedIds}
          products={products}
          productsStatus={productsStatus}
          onAddToCart={onAddToCart}
          onAddAll={onAddAll}
        />
      </div>

      <div className="result-actions">
        <a href="#checker" className="button button-primary">CHECK THE CREAM YOU USE ↓</a>
        <button type="button" className="button button-secondary" onClick={handleRetake}>RETAKE THE QUIZ ↻</button>
      </div>
    </div>
  );
}
