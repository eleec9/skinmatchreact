export default function IngredientCard({ ingredient }) {
  return (
    <article className="ingredient-card">
      <img src={ingredient.image} alt={ingredient.alt} className="ingredient-image" />
      <div className="ingredient-info">
        <h3>{ingredient.name}</h3>
        <p>{ingredient.text}</p>
      </div>
    </article>
  );
}
