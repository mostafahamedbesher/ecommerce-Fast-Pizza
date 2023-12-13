// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";

import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  const order = useLoaderData();
  // console.log(order);
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  const isLoadingIngredients = fetcher.state === "loading";

  return (
    <div className="px-4 py-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-2">
        <h2 className=" mb-2 text-xl font-semibold sm:mb-0">
          Order #{id} Status
        </h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-xs  font-semibold uppercase tracking-wide text-red-50 sm:text-sm">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-50 sm:text-sm">
            {status} order
          </span>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-2 bg-stone-200 p-5">
        <p className="mb-2 text-base font-semibold sm:mb-0">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="mb-6 divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            key={item.pizzaId}
            item={item}
            ingredients={
              fetcher.data?.find((el) => el.id === item.pizzaId).ingredients
            }
            isLoadingIngredients={isLoadingIngredients}
          />
        ))}
      </ul>

      <div className="mb-8 space-y-2 bg-stone-200 p-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-semibold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const orderData = await getOrder(params.orderId);
  return orderData;
}

export default Order;
