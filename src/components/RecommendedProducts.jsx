import { formatPrice } from "../utils/formatPrice.js";

// The "Recommended products" block at the end of the quiz result.
export default function RecommendedProducts({ productIds, products, productsStatus, onAddToCart, onAddAll }) {
  // The products come from the API: they could still be loading or have failed
  if (productsStatus === "loading") {
    return <p className="status-message">Loading your recommended products…</p>;
  }
  if (productsStatus === "error") {
    return <p className="status-message status-error">We couldn't load our products, so we can't recommend any right now. Try reloading the shop below.</p>;
  }

  const recommended = productIds
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  const total = recommended.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="routine-group recommended-products">
      <h3>Recommended products</h3>

      {recommended.length === 0 ? (
        <p className="recommended-intro">We couldn't find a product that matches your answers. Explore the shop below.</p>
      ) : (
        <>
          <p className="recommended-intro">Selected from our shop to match your skin type, goals, routine and budget.</p>

          <div className="recommended-grid">
            {recommended.map((product) => (
              <article className="recommended-card" key={product.id}>
                <img src={product.image} alt={`${product.brand} ${product.name}`} />
                <div className="recommended-info">
                  <p className="product-brand">{product.brand}</p>
                  <h4>{product.name}</h4>
                  <p className="product-ingredient">Key ingredient: <strong>{product.keyIngredient}</strong></p>
                  <p className="recommended-price">{formatPrice(product.price)}</p>
                  <button type="button" className="recommended-button" onClick={() => onAddToCart(product.id)}>
                    ADD TO BAG
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="recommended-footer">
            <p>Routine total: <strong>{formatPrice(total)}</strong></p>
            <button type="button" className="recommended-add-all" onClick={() => onAddAll(recommended.map((product) => product.id))}>
              ADD ALL TO BAG
            </button>
          </div>
        </>
      )}
    </div>
  );
}
