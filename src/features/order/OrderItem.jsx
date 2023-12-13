import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  // const itemIngredients = ingredients?.at(item.pizzaId - 1);

  return (
    <li className="space-y-1 py-3">
      <div className="mb-1 flex items-center justify-between">
        <p className="text-sm">
          <span className="mr-2 text-sm font-bold">{quantity}&times;</span>
          {name}
        </p>
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-xs capitalize italic text-stone-500 sm:text-sm">
        {isLoadingIngredients
          ? "Loading ingredients..."
          : ingredients?.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
