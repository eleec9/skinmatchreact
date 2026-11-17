export default function ReviewCard({ review }) {
  return (
    <article className="review-card">
      <img src={review.image} alt={`Photo of ${review.name}`} className="review-avatar" />
      <h3>{review.name}</h3>
      <p className="review-stars" aria-label="5 out of 5 stars">★★★★★</p>
      <p className="review-text">{review.text}</p>
    </article>
  );
}
