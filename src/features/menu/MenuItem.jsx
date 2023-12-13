import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { decreaseQuantity, increaseQuantity, update } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const item = useSelector((store) =>
    store.cart.find((item) => item.pizzaId === id),
  );

  const dispatch = useDispatch();

  function handleAddToCart() {
    const pizzaItem = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice,
    };

    dispatch(update(pizzaItem));
  }

  function handleIncreaseQuantity() {
    dispatch(increaseQuantity(id));
  }

  function handleDecreaseQuantity() {
    dispatch(decreaseQuantity(id));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-20 sm:h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex w-full flex-col pt-0.5">
        <p className="text-sm font-medium sm:text-base">{name}</p>
        <p className="text-xs capitalize italic text-stone-500 sm:text-sm">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {!soldOut &&
            (item?.quantity ? (
              <div className="flex items-center space-x-2 sm:space-x-8">
                <div className=" flex items-center space-x-1 sm:space-x-2">
                  <Button type="round" onClick={handleDecreaseQuantity}>
                    -
                  </Button>
                  <span className=" text-sm font-medium">{item?.quantity}</span>
                  <Button type="round" onClick={handleIncreaseQuantity}>
                    +
                  </Button>

                  {/* <Button type="small" onClick={handleDeleteItem}>
                  Delete
                </Button> */}
                </div>
                <DeleteItem pizzaId={id} />
              </div>
            ) : (
              <Button type="small" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            ))}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
