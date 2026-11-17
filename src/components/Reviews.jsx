import ReviewCard from "./ReviewCard.jsx";
import { reviews } from "../data/siteContent.js";

export default function Reviews() {
  return (
    <section className="reviews-section" id="reviews">
      <div className="section-heading">
        <p className="eyebrow">REAL SKIN, REAL STORIES</p>
        <h2>WHAT OUR COMMUNITY SAYS</h2>
        <p>Discover the experiences of our skincare community.</p>
      </div>

      <div className="reviews-container">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
