// App: the main component.
// It keeps the state shared by several sections and passes it down with props:
//   - products (loaded from the API) + loading/error state
//   - cart (shop, quiz results and product checker all add to it)
//   - quiz answers (the result is calculated from them, shown by Result and used by ProductChecker)

import { useEffect, useState } from "react";
import { fetchProducts } from "./api/productsApi.js";
import { buildResult } from "./utils/buildResult.js";

import Header from "./components/Header.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Hero from "./components/Hero.jsx";
import Intro from "./components/Intro.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Quiz from "./components/Quiz.jsx";
import Result from "./components/Result.jsx";
import ProductChecker from "./components/ProductChecker.jsx";
import IngredientCarousel from "./components/IngredientCarousel.jsx";
import Shop from "./components/Shop.jsx";
import Reviews from "./components/Reviews.jsx";
import FinalCta from "./components/FinalCta.jsx";
import Contacts from "./components/Contacts.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  // Products from the API
  const [products, setProducts] = useState([]);
  const [productsStatus, setProductsStatus] = useState("loading"); // "loading" | "success" | "error"
  const [productsError, setProductsError] = useState("");

  // Shopping bag
  const [cart, setCart] = useState([]); // [{ id, quantity }]
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Answers of the completed quiz (null until the quiz is submitted)
  const [quizAnswers, setQuizAnswers] = useState(null);
  // Used as "key" of the Quiz: changing it makes React create a new, empty Quiz ("Retake the quiz")
  const [quizKey, setQuizKey] = useState(0);

  // The result is calculated from the answers and the products, so it is always up to date
  // (for example if the quiz is completed before the products have finished loading)
  const result = quizAnswers ? buildResult(quizAnswers, products) : null;

  // Load the products from the API
  async function loadProducts() {
    setProductsStatus("loading");
    setProductsError("");
    try {
      const data = await fetchProducts();
      setProducts(data);
      setProductsStatus("success");
    } catch (error) {
      setProductsError(error.message);
      setProductsStatus("error");
    }
  }

  // Runs once, when the page opens
  useEffect(() => {
    loadProducts();
  }, []);

  function addToCart(productId, openCart = true) {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === productId);
      if (existing) {
        return currentCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { id: productId, quantity: 1 }];
    });
    if (openCart) setIsCartOpen(true);
  }

  function addManyToCart(productIds) {
    productIds.forEach((id) => addToCart(id, false));
    setIsCartOpen(true);
  }

  function removeFromCart(productId) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  }

  function handleQuizComplete(answers) {
    setQuizAnswers(answers);
  }

  function handleRetake() {
    setQuizAnswers(null);
    setQuizKey(quizKey + 1);
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        products={products}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeFromCart}
      />

      <main>
        <Hero />
        <Intro />
        <HowItWorks />

        <section className="quiz-section" id="quiz">
          <Quiz key={quizKey} onComplete={handleQuizComplete} />
          {result && (
            <Result
              result={result}
              products={products}
              productsStatus={productsStatus}
              onAddToCart={addToCart}
              onAddAll={addManyToCart}
              onRetake={handleRetake}
            />
          )}
        </section>

        <ProductChecker result={result} products={products} onAddToCart={addToCart} />

        <IngredientCarousel />

        <Shop
          products={products}
          status={productsStatus}
          error={productsError}
          onRetry={loadProducts}
          onAddToCart={addToCart}
        />

        <Reviews />
        <FinalCta />
        <Contacts />
      </main>

      <Footer />
    </>
  );
}
