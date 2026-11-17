// Used by the Product Checker to read the ingredient list (INCI) returned by Open Beauty Facts.
// Each SkinMatch ingredient has the words that appear on real labels.
// Example: Hyaluronic acid is often written as "sodium hyaluronate".

export const inciKeywords = {
  "Hyaluronic acid": ["hyaluron"],
  "Collagen": ["collagen"],
  "Salicylic acid (BHA)": ["salicylic"],
  "Glycolic acid (AHA)": ["glycolic"],
  "Vitamin C": ["ascorbic", "ascorbyl"],
  "Niacinamide": ["niacinamide"],
  "Centella asiatica": ["centella", "madecassoside", "asiaticoside"],
  "Retinol": ["retinol", "retinal", "retinyl"],
  "Peptides": ["peptide"],
  "Ceramides": ["ceramide"],
  "Panthenol": ["panthenol"],
  "Snail mucin": ["snail"]
};

// Ingredients that people with sensitive skin often prefer to avoid
export const watchOutFor = {
  "Fragrance": ["parfum", "fragrance"],
  "Drying alcohol": ["alcohol denat"]
};
