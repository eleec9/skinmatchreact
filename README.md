# SkinMatch — Project 2 (React + API)

**Digital Interaction Engagement Strategies — IULM**

**Group members:** _Eleonora Anna Castaldo_, _Sara Bellini_, _Yasmine El Hibari_ <!-- TODO: add the group members -->

---

## 1. Concept and target audience

SkinMatch is a Korean skincare discovery website. A short skin quiz turns the user's skin type,
concerns, routine habits, budget, allergies and available time into a personal skin profile,
a morning/evening routine and a selection of products from the SkinMatch shop.

**Target audience:** young adults (18–35) curious about Korean skincare who feel lost among
too many products and ingredients and want simple, personalised guidance.

Project 2 keeps the same concept, brand and design as Project 1 and rebuilds it in React.

## 2. Engagement goal and main CTA

- **Engagement goal:** make the user take the quiz, understand which ingredients suit their skin
  and discover products that fit their routine and budget, then add them to the bag.
- **Main CTA:** **"Build my routine" / "Reveal my SkinMatch"** (the skin quiz).
- **Secondary CTA (new):** **"Is your everyday cream right for you?"**. The user searches the face cream
  they already use (often a supermarket brand) and sees whether it contains the ingredients suggested
  for their skin; if something is missing, SkinMatch suggests the Korean skincare product that adds it.

## 3. React component structure

```
src/
  main.jsx                 entry point, renders <App />
  App.jsx                  shared state: products (API), cart, quiz answers
  styles.css               Project 1 CSS + new states (loading, errors, checker)
  api/
    productsApi.js         fetch() of the SkinMatch products (mock API)
    beautyFactsApi.js      fetch() of the Open Beauty Facts search (public API)
  components/
    Header.jsx  Logo.jsx  CartDrawer.jsx
    Hero.jsx  Intro.jsx  HowItWorks.jsx  StepCard.jsx
    Quiz.jsx  QuizQuestion.jsx
    Result.jsx  ResultList.jsx  RecommendedProducts.jsx
    ProductChecker.jsx  CheckerAnalysis.jsx
    IngredientCarousel.jsx  IngredientCard.jsx
    Shop.jsx  FilterBar.jsx  ProductCard.jsx
    Reviews.jsx  ReviewCard.jsx
    FinalCta.jsx  Newsletter.jsx  Contacts.jsx  Footer.jsx
  data/
    quizQuestions.js       the 6 quiz questions (rendered with map)
    skinRules.js           profiles, concern → ingredient rules, recommendation rules
    siteContent.js         nav links, steps, ingredients, filters, reviews, contacts
    checkerIngredients.js  INCI keywords used to read ingredient lists
  utils/
    buildResult.js         quiz answers → profile, routine, notes, recommended products
    recommendations.js     chooses the shop products (budget, routine level, allergies)
    analyseIngredients.js  compares an ingredient list with the quiz result
    formatPrice.js
public/
  api/products.json        the 13 products (mock API)
  images/  videos/
```

**Main components**

| Component | Role |
|---|---|
| `App` | Keeps the state used by several sections and passes it down with props. Loads the products when the page opens. |
| `Quiz` | Controlled form: stores the answers, validates them and sends them to `App` with `onComplete`. |
| `QuizQuestion` | Reusable: one component for radio, checkbox and text questions. Receives `value` and `onChange` from `Quiz`. |
| `Result` | Shows profile, routine, notes and `RecommendedProducts`. |
| `ProductChecker` | Search form + call to the Open Beauty Facts API, with loading / error / empty / result states. |
| `CheckerAnalysis` | Compares the chosen product's ingredients with the quiz result and suggests missing products. |
| `Shop`, `FilterBar`, `ProductCard` | Product grid filtered with state. `ProductCard` is reused for every product. |
| `CartDrawer` | The bag: items, total, remove, demo checkout. |

**Reusable components with props:** `ProductCard`, `StepCard`, `IngredientCard`, `ReviewCard`,
`QuizQuestion`, `ResultList`, `Logo`. All lists are rendered with `map()` and stable `key`
values (product `id`, question `id`, barcode `code`...).

## 4. State-driven interaction

| State (useState) | Where | Why |
|---|---|---|
| `products`, `productsStatus`, `productsError` | `App` | Products loaded from the API + loading/error state |
| `cart`, `isCartOpen` | `App` | The bag is shared by the shop, the quiz result and the product checker |
| `quizAnswers`, `quizKey` | `App` | Answers of the completed quiz; changing `quizKey` resets the quiz ("Retake") |
| `answers`, `errors` | `Quiz` | Controlled inputs and validation messages |
| `activeFilter` | `Shop` | Selected category; the visible products are calculated from it |
| `query`, `inputError`, `status`, `results`, `apiError`, `selected` | `ProductChecker` | Search field, validation, request state, API results, chosen product |
| `email`, `message`, `isError` | `Newsletter` | Controlled email field with validation |
| `checkoutMessage` | `CartDrawer` | Feedback of the demo checkout |

The quiz result is **not** stored in state: it is calculated from `quizAnswers` and `products`
(`buildResult`) on every render, so it is always up to date.

**Form flow (quiz):** controlled inputs (`value`/`checked` + `onChange`) → `onSubmit` →
validation (the 4 required questions) → missing questions are highlighted with an error message →
when valid, `onComplete(answers)` → `App` stores the answers → `Result` is rendered conditionally.
A progress line ("3 of 6 questions answered") updates while the user answers.

## 5. API used

### A. SkinMatch products — mock API (GET)

- **Endpoint:** `GET api/products.json` (served by Vite from `public/api/products.json`)
- **Data:** array of 13 products: `id, brand, name, keyIngredient, description, price, image, category, mustHave`
- **Used for:** the shop grid, the cart, the quiz recommendations and the checker suggestions
- **States:** loading message, error message with "Try again" button, empty filter message
- **Why a mock:** in the final exam this URL becomes our own Node.js + Express endpoint
  (`GET /api/products`); the React code stays the same.

### B. Open Beauty Facts — public API (GET)

- **What it is:** free, open database of cosmetic products built by volunteers. No API key.
- **Endpoint:**
  `GET https://world.openbeautyfacts.org/cgi/search.pl?search_terms=<text>&search_simple=1&action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=face-creams&json=1&page_size=24&fields=code,product_name,brands,image_front_small_url,ingredients_text,ingredients_text_en`
- **Category filter:** `tag_0=face-creams` limits the search to face creams (about 500 products);
  without it the database also returns shampoos, toothpastes and shower gels.
- **Data received (JSON):** `{ products: [ { code, product_name, brands, image_front_small_url, ingredients_text } ] }`
- **Used for:** the "Is your everyday cream right for you?" section (quick-search buttons for popular
  brands such as Nivea, Neutrogena, Garnier): list of matching face creams → the user picks
  one → its ingredient list (INCI) is read to find key ingredients (e.g. "sodium hyaluronate" =
  hyaluronic acid), fragrance/alcohol, and the allergies typed in the quiz.

**Data flow:** user clicks *Search* → `handleSubmit` validates the text → `searchBeautyProducts()`
calls `fetch()` → we check `response.ok` (and status 429 = too many requests) →
`response.json()` → the products are cleaned (only products with a name and an ingredient list,
no duplicates, max 12) → `setResults()` →
React re-renders the list.

**Error handling:** validation before the request (min. 3 characters), 15-second timeout
(`AbortController`), network error, HTTP error, 429 rate limit, no results, product without
ingredient list. Every case shows a clear message.

> Note: Open Beauty Facts is filled in by volunteers, so some products are missing or have no
> ingredient list. This is handled as a normal "empty" state.

## 6. Run the project

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the address shown in the terminal (usually http://localhost:5173).

Production build: `npm run build` (output in `dist/`).

**Online version (GitHub Pages):** the workflow in `.github/workflows/deploy.yml` builds and publishes
the site at every push to `main`. One-time setup: *Settings → Pages → Source: GitHub Actions*.
The site is then available at `https://eleec9.github.io/skinmatchreact/`.

## 7. Use of AI tools

We used Claude (Anthropic) as a coding assistant to:
- plan the split of the Project 1 code into React components;
- convert the DOM code of `script.js` (querySelector, innerHTML) into state and props;
- find a public skincare API coherent with our topic and write the fetch / error handling.

Every part was reviewed by the group. The comments at the top of each component explain its role,
its state and its props, so that each member can explain the implementation.
