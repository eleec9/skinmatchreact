// Chooses the shop products that match the quiz answers.
// "products" is the list loaded from the API (/api/products.json).

import {
  ingredientProducts,
  skinTypeProducts,
  gentleBasics,
  exfoliatingAcids,
  strongActives,
  productsPerLevel,
  budgetLimits
} from "../data/skinRules.js";

// Words of 4+ letters typed in the allergies field, e.g. "vitamin c, fragrance" -> ["vitamin", "fragrance"]
export function allergyWords(allergies) {
  return allergies
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length >= 4);
}

function matchesAllergies(product, allergies) {
  const words = allergyWords(allergies);
  if (!words.length) return false;
  const productText = `${product.name} ${product.keyIngredient}`.toLowerCase();
  return words.some((word) => productText.includes(word));
}

export function pickRecommendedProducts({ products, skinType, budget, level, concerns, ingredients, allergies }) {
  if (!products.length) return [];

  const findProduct = (id) => products.find((product) => product.id === id);

  // 1. products for the suggested ingredients
  // 2. products for the skin type
  // 3. gentle basics, used only if there are still free places
  const candidates = ingredients.map((name) => ingredientProducts[name]).filter(Boolean);
  if (concerns.includes("wrinkles") || (skinType === "dry" && level === 2)) candidates.push("peptide-serum");
  candidates.push(...(skinTypeProducts[skinType] || skinTypeProducts.unsure), ...gentleBasics);

  let acidChosen = false;
  const allowed = [...new Set(candidates)].filter((id) => {
    const product = findProduct(id);
    if (!product) return false;
    if (skinType === "sensitive" && strongActives.includes(id)) return false;
    if (matchesAllergies(product, allergies)) return false;
    // Only one acid exfoliant per routine: they should not be layered together
    if (exfoliatingAcids.includes(id)) {
      if (acidChosen) return false;
      acidChosen = true;
    }
    return true;
  });

  // Keep the order of priority, but stay within the number of products and the budget
  const maxProducts = productsPerLevel[level] || 2;
  const limit = budgetLimits[budget] ?? Infinity;
  const chosen = [];
  let total = 0;

  allowed.forEach((id) => {
    const price = findProduct(id).price;
    if (chosen.length >= maxProducts) return;
    if (total + price > limit) return;
    chosen.push(id);
    total += price;
  });

  // Always suggest at least one product (the cheapest available)
  if (!chosen.length && allowed.length) {
    const cheapest = allowed.reduce((a, b) => (findProduct(a).price <= findProduct(b).price ? a : b));
    chosen.push(cheapest);
  }

  return chosen;
}
