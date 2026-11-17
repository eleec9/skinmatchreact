import { categoryLabels } from "../data/siteContent.js";
import { formatPrice } from "../utils/formatPrice.js";

// One product of the shop. Reused for every product in the grid.
export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="shop-card">
      <div className="product-image-container">
        <div className="product-tags">
          <span className="product-tag">{categoryLabels[product.category]}</span>
        </div>
        <img src={product.image} alt={`${product.brand} ${product.name}`} loading="lazy" />
      </div>
      <p className="product-brand">{product.brand}</p>
      <h3>{product.name}</h3>
      <p className="product-ingredient">Key ingredient: <strong>{product.keyIngredient}</strong></p>
      <p className="product-description">{product.description}</p>
      <p className="product-price">{formatPrice(product.price)}</p>
      <button className="product-button" type="button" onClick={() => onAddToCart(product.id)}>ADD TO BAG</button>
    </article>
  );
}
