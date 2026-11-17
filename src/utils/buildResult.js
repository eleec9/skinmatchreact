// Turns the quiz answers into the result shown in Result.jsx.
// It only calculates data: no DOM, no React. The components decide how to show it.

import { profiles, concernIngredients, concernLabels } from "../data/skinRules.js";
import { pickRecommendedProducts } from "./recommendations.js";

export function buildResult(answers, products) {
  const { skinType, concerns, routine, budget, allergies, time } = answers;
  const profile = profiles[skinType] || profiles.unsure;

  // Ingredients from the skin type + ingredients from the selected concerns (no duplicates)
  const ingredients = [...new Set([
    ...profile.ingredients,
    ...concerns.flatMap((concern) => concernIngredients[concern] || [])
  ])];

  // Time limits the number of steps; routine preference sets the preferred complexity
  const levels = { minimal: 0, beginner: 0, regular: 1, advanced: 2 };
  const timeLimits = { quick: 0, medium: 1, long: 2 };
  const level = Math.min(levels[routine] ?? 0, timeLimits[time] ?? 0);
  const routineName = ["minimal", "regular", "multi-step"][level];

  // One gentle serum suggestion; strong actives stay optional
  const gentleOptions = ingredients.filter((name) =>
    !name.includes("Salicylic") && !name.includes("Glycolic") && name !== "Retinol"
  );
  const serum = gentleOptions[0] || (skinType === "unsure" ? "a simple hydrating serum" : "a gentle hydrating serum");
  const exfoliationSuggested = skinType === "oily" || skinType === "combination" ||
    concerns.includes("blemishes") || concerns.includes("pores");

  let morning;
  let evening;
  if (level === 0) {
    morning = ["Gentle cleanser", "Moisturiser with broad-spectrum SPF 30+ (or moisturiser followed by SPF 30+)"];
    evening = ["Gentle cleanser", "Hydrating moisturiser"];
  } else if (level === 1) {
    morning = ["Gentle cleanser", `Serum to explore: ${serum}`, "Hydrating moisturiser", "Broad-spectrum SPF 30+"];
    evening = ["Gentle cleanser", "Hydrating moisturiser"];
  } else {
    morning = [skinType === "dry" || skinType === "sensitive" ? "Gentle cleanser" : "Gentle gel or mousse cleanser", `Serum to explore: ${serum}`, "Optional eye cream", "Hydrating moisturiser", "Broad-spectrum SPF 30+"];
    evening = ["Gentle cleanser (double cleansing only when useful and tolerated)", "Serum to explore according to your skin goals", "Optional eye cream", "Hydrating moisturiser"];
    if (skinType === "dry") {
      morning.splice(2, 0, "Optional Vitamin C serum, if your skin tolerates it");
      evening.splice(2, 0, "Optional peptide serum for dry skin");
    }
    if (exfoliationSuggested) evening.splice(1, 0, "Optional acid exfoliation on selected evenings, not every day");
  }

  const concernList = concerns.map((concern) =>
    `${concernLabels[concern]}: ${(concernIngredients[concern] || []).join(", ")}`
  );

  const notes = [];
  if (level === 0 && exfoliationSuggested) notes.push("If you have oily skin or blemishes, optional exfoliation can be considered occasionally, not as an essential daily step.");
  if (budget === "under40") notes.push("Budget: focus on affordable essentials before adding extra treatments.");
  if (time === "quick" && level === 0) notes.push("Your routine has been kept short to fit 5 minutes or less.");
  if (skinType === "sensitive") notes.push("For sensitive skin, introduce new ingredients cautiously and prioritise gentle formulas.");
  if (ingredients.includes("Retinol")) notes.push("Retinol is an optional night-time treatment, not a required step. Avoid retinoids during pregnancy; seek professional guidance when appropriate.");
  if (ingredients.some((name) => name.includes("Salicylic") || name.includes("Glycolic"))) notes.push("Acid exfoliants are optional, should be introduced gradually, and should not all be layered together. Daily sunscreen is important.");
  if (allergies.trim()) notes.push(`You listed ingredients to avoid: ${allergies.trim()}. Products whose name or key ingredient matches have been left out, but full formulas have NOT been checked; verify ingredient labels before use.`);

  const recommendedIds = pickRecommendedProducts({
    products,
    skinType,
    budget,
    level,
    concerns,
    ingredients,
    allergies
  });

  return {
    title: profile.title,
    description: profile.description,
    ingredients,
    routineName,
    morning,
    evening,
    concernList,
    notes,
    recommendedIds,
    allergies: allergies.trim()
  };
}
