// Rules used to turn the quiz answers into a skin profile and a routine.
// (Same rules as Project 1, moved here from script.js.)

export const profiles = {
  dry: { title: "The Hydration Seeker", description: "Focus on moisture and gentle skincare.", ingredients: ["Hyaluronic acid", "Collagen"] },
  oily: { title: "The Balance Seeker", description: "Explore lightweight products and gentle cleansing.", ingredients: ["Salicylic acid (BHA)"] },
  combination: { title: "The Multi-Tasker", description: "Balance different areas of your skin.", ingredients: ["Salicylic acid (BHA)"] },
  normal: { title: "The Everyday Essentialist", description: "Maintain a simple, consistent routine.", ingredients: ["Vitamin C", "Niacinamide"] },
  sensitive: { title: "The Gentle Care Seeker", description: "Prioritise comfort and tolerability.", ingredients: ["Centella asiatica"] },
  unsure: { title: "The Skin Explorer", description: "Start gently while discovering your skin type.", ingredients: [] }
};

export const concernIngredients = {
  hydration: ["Hyaluronic acid"],
  blemishes: ["Glycolic acid (AHA)"],
  "uneven-tone": ["Niacinamide"],
  redness: ["Centella asiatica"],
  pores: ["Salicylic acid (BHA)"],
  glow: ["Vitamin C"],
  wrinkles: ["Retinol", "Collagen"]
};

export const concernLabels = {
  hydration: "Hydration",
  blemishes: "Blemishes",
  "uneven-tone": "Uneven skin tone",
  redness: "Redness",
  pores: "Visible pores",
  glow: "Dullness and glow",
  wrinkles: "Wrinkles and fine lines"
};

// Main shop product for each ingredient the quiz can suggest
export const ingredientProducts = {
  "Hyaluronic acid": "hyaluronic-serum",
  "Collagen": "collagen-cream",
  "Salicylic acid (BHA)": "bha-cleanser",
  "Glycolic acid (AHA)": "aha-liquid",
  "Vitamin C": "vitamin-drop",
  "Niacinamide": "niacinamide-serum",
  "Centella asiatica": "centella-ampoule",
  "Retinol": "retinol-cream",
  "Peptides": "peptide-serum"
};

// Extra products that suit each skin type (used to fill the remaining places)
export const skinTypeProducts = {
  dry: ["snail-essence", "barrier-cream"],
  oily: ["heartleaf-toner", "bha-cleanser"],
  combination: ["heartleaf-toner", "snail-essence"],
  normal: ["snail-essence", "glow-serum"],
  sensitive: ["barrier-cream", "heartleaf-toner", "centella-ampoule"],
  unsure: ["snail-essence", "barrier-cream"]
};

// Gentle products suitable for most skin types
export const gentleBasics = ["snail-essence", "hyaluronic-serum", "barrier-cream", "centella-ampoule", "heartleaf-toner"];

// Acid exfoliants: never suggest more than one together
export const exfoliatingAcids = ["bha-cleanser", "aha-liquid"];

// Strong actives left out for sensitive skin
export const strongActives = ["retinol-cream", "aha-liquid"];

// How many products to suggest for each routine level (minimal, regular, multi-step)
export const productsPerLevel = [2, 3, 5];

// Maximum total for each budget answer
export const budgetLimits = { under40: 40, "40-80": 80, "80-150": 150, over150: Infinity };
