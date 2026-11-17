// A titled list inside the quiz result (ingredients, morning routine, notes...).
// numbered = true shows 1, 2, 3...
export default function ResultList({ title, items, numbered = false }) {
  const ListTag = numbered ? "ol" : "ul";

  return (
    <div className="routine-group">
      <h3>{title}</h3>
      <ListTag>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ListTag>
    </div>
  );
}
