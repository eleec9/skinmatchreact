// 25 -> "€25.00"
export function formatPrice(value) {
  return `€${value.toFixed(2)}`;
}
