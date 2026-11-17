// Reads the ingredient list of a product found with the Product Checker
// and compares it with the user's quiz result.

import { inciKeywords, watchOutFor } from "../data/checkerIngredients.js";
import { ingredientProducts } from "../data/skinRules.js";
import { allergyWords } from "./recommendations.js";

function containsAny(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

export function analyseIngredients(ingredientsText, result) {
  const text = ingredientsText.toLowerCase();

  // Every SkinMatch ingredient we can recognise in the label
  const found = Object.keys(inciKeywords).filter((name) => containsAny(text, inciKeywords[name]));

  // Ingredients to watch out for (fragrance, drying alcohol)
  const warnings = Object.keys(watchOutFor).filter((name) => containsAny(text, watchOutFor[name]));

  // Without a quiz result we can only list what the product contains
  if (!result) {
    return { found, warnings, matching: [], missing: [], allergyMatches: [] };
  }

  // Ingredients suggested by the quiz: which are in the product and which are missing
  const matching = result.ingredients.filter((name) => found.includes(name));
  const missing = result.ingredients.filter(
    (name) => !found.includes(name) && ingredientProducts[name]
  );

  // Words typed in the allergies field that appear in the label.
  // On labels fragrance is written "parfum", so we look for both words.
  const labelSynonyms = { fragrance: ["parfum"], perfume: ["parfum"] };
  const allergyMatches = allergyWords(result.allergies).filter((word) =>
    containsAny(text, [word, ...(labelSynonyms[word] || [])])
  );

  return { found, warnings, matching, missing, allergyMatches };
}
