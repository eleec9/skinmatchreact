import { useState } from "react";
import { formatPrice } from "../utils/formatPrice.js";

// The shopping bag panel.
// The cart only stores { id, quantity }: name and price come from the products list.
export default function CartDrawer({ isOpen, cart, products, onClose, onRemove }) {
  const [checkoutMessage, setCheckoutMessage] = useState("");

  // Join each cart item with its product data
  const items = cart
    .map((item) => ({ ...item, product: products.find((product) => product.id === item.id) }))
    .filter((item) => item.product);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  function handleCheckout() {
    setCheckoutMessage("Thank you! Checkout is a demo for now, stay tuned!");
  }

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose}></div>}

      <aside
        className={`cart-panel ${isOpen ? "is-open" : ""}`}
        aria-labelledby="cart-title"
        aria-hidden={!isOpen}
      >
        <div className="cart-header">
          <h2 id="cart-title">Your bag</h2>
          <button type="button" className="cart-close" aria-label="Close shopping cart" onClick={onClose}>×</button>
        </div>

        <div className="cart-items">
          {items.length === 0 && <p className="cart-empty">Your bag is empty.</p>}

          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <strong>{item.product.brand} {item.product.name}</strong>
                <p>Qty: {item.quantity}</p>
                <button type="button" onClick={() => onRemove(item.id)}>Remove</button>
              </div>
              <span>{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <p>Total <strong>{formatPrice(total)}</strong></p>
          <button type="button" className="checkout-button" onClick={handleCheckout} disabled={items.length === 0}>
            CONTINUE TO CHECKOUT
          </button>
          {checkoutMessage && <p className="checkout-message" role="status">{checkoutMessage}</p>}
          <p className="cart-note">Group project — demo cart, no real payments.</p>
        </div>
      </aside>
    </>
  );
}
