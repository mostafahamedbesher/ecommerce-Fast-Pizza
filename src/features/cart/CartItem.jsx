import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { decreaseQuantity, deleteItem, increaseQuantity } from "./cartSlice";
import DeleteItem from "./DeleteItem";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const dispatch = useDispatch();

  function handleIncreaseQuantity() {
    dispatch(increaseQuantity(pizzaId));
  }

  function handleDecreaseQuantity() {
    dispatch(decreaseQuantity(pizzaId));
  }

  return (
    <li className="py-4 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 text-sm capitalize sm:mb-0 sm:text-base">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between gap-4 sm:gap-8">
        <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>

        <div className="flex items-center space-x-2 sm:space-x-8">
          <div className="flex items-center space-x-2">
            <Button type="round" onClick={handleDecreaseQuantity}>
              -
            </Button>
            <span className="text-sm font-medium">{item?.quantity}</span>
            <Button type="round" onClick={handleIncreaseQuantity}>
              +
            </Button>

            {/* <Button type="small" onClick={handleDeleteItem}>
            Delete
          </Button> */}
          </div>
          <DeleteItem pizzaId={pizzaId} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
