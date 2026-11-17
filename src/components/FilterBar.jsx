import { shopFilters } from "../data/siteContent.js";

// The row of filter buttons. It does not keep state:
// Shop tells it which filter is active and receives the click with onChange.
export default function FilterBar({ activeFilter, onChange }) {
  return (
    <div className="shop-filters" role="group" aria-label="Filter products">
      {shopFilters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          className={`shop-filter ${activeFilter === filter.id ? "active" : ""}`}
          aria-pressed={activeFilter === filter.id}
          onClick={() => onChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
