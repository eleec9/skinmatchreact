// SkinMatch products API.
// For now the "API" is a JSON file served by Vite from public/api/products.json (mock API).
// For the final exam this URL will point to our Node.js + Express endpoint (GET /api/products)
// and the React code will not need to change.

const PRODUCTS_URL = "api/products.json";

export async function fetchProducts() {
  const response = await fetch(PRODUCTS_URL);

  // fetch() does not fail on HTTP errors (404, 500...), so we check response.ok ourselves
  if (!response.ok) {
    throw new Error(`Products request failed (HTTP ${response.status})`);
  }

  const products = await response.json();
  return products;
}
