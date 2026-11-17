// Open Beauty Facts: free, public database of cosmetic products (no API key needed).
// We use its search to find the face cream the user already owns and read its ingredients.
// Docs: https://openfoodfacts.github.io/documentation/docs/Product-Opener/api/

const SEARCH_URL = "https://world.openbeautyfacts.org/cgi/search.pl";

// Only the fields we use, so the JSON response stays small
const FIELDS = "code,product_name,brands,image_front_small_url,ingredients_text,ingredients_text_en";

export async function searchBeautyProducts(searchText) {
  const params = new URLSearchParams({
    search_terms: searchText,
    search_simple: "1",
    action: "process",
    // Search only inside the "face creams" category:
    // without this filter the database also returns shampoos, toothpastes, shower gels...
    tagtype_0: "categories",
    tag_contains_0: "contains",
    tag_0: "face-creams",
    json: "1",
    page_size: "24",
    fields: FIELDS
  });

  // Stop waiting after 15 seconds: the public server can sometimes be slow
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);

  let response;
  try {
    response = await fetch(`${SEARCH_URL}?${params}`, { signal: controller.signal });
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("The product database is taking too long to answer. Please try again.");
    }
    throw new Error("We couldn't reach the product database. Check your connection and try again.");
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 429) {
    throw new Error("Too many searches in a short time. Please wait a minute and try again.");
  }
  if (!response.ok) {
    throw new Error(`The product database answered with an error (HTTP ${response.status}).`);
  }

  const data = await response.json();

  // How many face creams match the search, before removing the ones we can't check
  const foundCount = (data.products || []).length;

  // Keep only products we can actually check: with a barcode, an ingredient list,
  // and once per barcode. Then give every product the same simple shape.
  const seenCodes = new Set();
  const products = (data.products || [])
    .map((product) => ({
      code: product.code,
      name: product.product_name || product.brands || "",
      brand: product.brands || "",
      image: product.image_front_small_url || "",
      ingredients: (product.ingredients_text_en || product.ingredients_text || "").trim()
    }))
    .filter((product) => {
      if (!product.code || !product.name || !product.ingredients || seenCodes.has(product.code)) return false;
      seenCodes.add(product.code);
      return true;
    })
    .slice(0, 12);

  return { products, foundCount };
}
