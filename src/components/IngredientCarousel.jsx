import { useRef } from "react";
import IngredientCard from "./IngredientCard.jsx";
import { ingredients } from "../data/siteContent.js";

// Horizontal list of ingredient cards with previous/next arrows.
// useRef gives access to the scrolling element, so the arrows can scroll it.
export default function IngredientCarousel() {
  const carouselRef = useRef(null);

  function scrollByOneCard(direction) {
    const carousel = carouselRef.current;
    const firstCard = carousel.querySelector(".ingredient-card");
    const gap = parseFloat(getComputedStyle(carousel).columnGap) || 0;
    const step = firstCard ? firstCard.offsetWidth + gap : carousel.clientWidth;
    carousel.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <section className="ingredients-section" id="ingredients">
      <div className="section-heading">
        <p className="eyebrow">GET TO KNOW YOUR SKINCARE</p>
        <h2>INGREDIENTS THAT MAKE A DIFFERENCE</h2>
        <p>Discover the ingredients behind your skincare routine.</p>
      </div>

      <div className="carousel-container">
        <button className="carousel-button" type="button" aria-label="Previous ingredients" onClick={() => scrollByOneCard(-1)}>‹</button>

        <div className="ingredients-carousel" ref={carouselRef}>
          {ingredients.map((ingredient) => (
            <IngredientCard key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>

        <button className="carousel-button" type="button" aria-label="Next ingredients" onClick={() => scrollByOneCard(1)}>›</button>
      </div>
    </section>
  );
}
