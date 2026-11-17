import { analyseIngredients } from "../utils/analyseIngredients.js";
import { ingredientProducts } from "../data/skinRules.js";
import { formatPrice } from "../utils/formatPrice.js";

// Shows what we found in the ingredients of the product chosen in ProductChecker.
export default function CheckerAnalysis({ product, result, products, onAddToCart, onBack }) {
  const header = (
    <div className="checker-product">
      {product.image && <img src={product.image} alt={product.name} />}
      <div>
        <p className="product-brand">{product.brand || "Unknown brand"}</p>
        <h3>{product.name}</h3>
        <button type="button" className="checker-back" onClick={onBack}>← Choose another product</button>
      </div>
    </div>
  );

  // Some products in the database have no ingredient list
  if (!product.ingredients) {
    return (
      <div className="checker-analysis">
        {header}
        <p className="status-message">
          This product has no ingredient list in the database yet, so we can't check it. Try another result.
        </p>
      </div>
    );
  }

  const analysis = analyseIngredients(product.ingredients, result);

  // For each ingredient missing from the user's product, the SkinMatch product that contains it
  const suggestions = analysis.missing
    .map((name) => ({ ingredient: name, product: products.find((item) => item.id === ingredientProducts[name]) }))
    .filter((suggestion) => suggestion.product);

  return (
    <div className="checker-analysis">
      {header}

      <div className="checker-grid">
        <div className="checker-box">
          <h4>Key ingredients we recognised</h4>
          {analysis.found.length > 0 ? (
            <ul className="checker-tags">
              {analysis.found.map((name) => <li key={name}>{name}</li>)}
            </ul>
          ) : (
            <p>None of the key ingredients we follow.</p>
          )}
        </div>

        {result && (
          <div className="checker-box">
            <h4>Your profile: {result.title}</h4>
            {analysis.matching.length > 0 && (
              <p className="checker-good">✓ Contains {analysis.matching.join(", ")}, suggested for your skin.</p>
            )}
            {analysis.matching.length === 0 && result.ingredients.length > 0 && (
              <p>It doesn't contain the ingredients suggested for your skin.</p>
            )}
            {analysis.allergyMatches.length > 0 && (
              <p className="checker-warning">⚠ Contains "{analysis.allergyMatches.join(", ")}", which you asked to avoid.</p>
            )}
          </div>
        )}

        {analysis.warnings.length > 0 && (
          <div className="checker-box">
            <h4>Good to know</h4>
            <p>Contains {analysis.warnings.join(" and ").toLowerCase()}. Sensitive skin may prefer formulas without it.</p>
          </div>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="checker-suggestions">
          <h4>Complete your routine</h4>
          {suggestions.map((suggestion) => (
            <div className="checker-suggestion" key={suggestion.ingredient}>
              <img src={suggestion.product.image} alt="" />
              <p>
                Missing <strong>{suggestion.ingredient}</strong>? Try {suggestion.product.brand} {suggestion.product.name} — {formatPrice(suggestion.product.price)}
              </p>
              <button type="button" className="recommended-button" onClick={() => onAddToCart(suggestion.product.id)}>ADD TO BAG</button>
            </div>
          ))}
        </div>
      )}

      <details className="checker-inci">
        <summary>Full ingredient list</summary>
        <p>{product.ingredients}</p>
      </details>
    </div>
  );
}
