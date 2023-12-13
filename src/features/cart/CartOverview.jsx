import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPrice, getTotalQuantity } from "./cartSlice";

function CartOverview() {
  const overallPrice = useSelector(getTotalPrice);

  const overallQuantity = useSelector(getTotalQuantity);

  // const overallPrice = useSelector((store) =>
  //   store.cart.reduce(
  //     (overallPrice, item) => overallPrice + item.totalPrice,
  //     0,
  //   ),
  // );

  // const overallQuantity = useSelector((store) =>
  //   store.cart.reduce((overallPrice, item) => overallPrice + item.quantity, 0),
  // );

  return (
    <div className="flex items-center justify-between  bg-stone-800 px-4 py-4 text-xs uppercase text-stone-200 sm:px-6 sm:py-4 sm:text-base ">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{overallQuantity} pizzas</span>
        <span>€{overallPrice.toFixed(2)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
