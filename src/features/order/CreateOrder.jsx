import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clear, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();

  const { userName, address, status, error, position } = useSelector(
    (store) => store.user,
  );

  const overallPrice = useSelector(getTotalPrice);

  const cart = useSelector((store) => store.cart);

  const dispatch = useDispatch();

  function handleGetPosition(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  if (!cart.length) return <EmptyCart />;

  // const overallPrice = cart.reduce(
  //   (overallPrice, item) => overallPrice + item.totalPrice,
  //   0,
  // );

  // const cart = fakeCart;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-base font-semibold tracking-wider sm:text-lg md:text-xl">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST" action="/order/new">
        <div className="mb-5 sm:flex sm:items-center sm:gap-2">
          <label className="mb-2 inline-block text-base sm:w-1/4">
            First Name
          </label>
          <div className="sm:grow">
            <input
              type="text"
              name="customer"
              required
              className="input w-full"
              defaultValue={userName}
            />
          </div>
        </div>

        <div className="mb-5 flex-wrap sm:flex sm:items-center sm:gap-2">
          <label className="mb-2 inline-block text-base sm:w-1/4">
            Phone number
          </label>
          <div className="sm:grow">
            <input type="tel" name="phone" required className="input w-full" />
          </div>
          {formErrors?.phone && (
            <p className="ml-auto mt-2 rounded-md bg-red-100 px-2 py-2 text-xs text-red-700 sm:mt-0">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="mb-5 sm:flex sm:items-center sm:gap-2">
          <label className="mb-2 inline-block text-base sm:w-1/4">
            Address
          </label>
          <div className="relative sm:grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              defaultValue={address}
              disabled={status === "loading"}
            />
            {!position.latitude && !position.longitude && (
              <Button
                type="small"
                position="absolute sm:right-1 sm:top-8 right-0 top-0 -translate-y-3/4 z-50"
                onClick={handleGetPosition}
                disabled={status === "loading"}
              >
                Get position
              </Button>
            )}

            {status === "error" && (
              <p className="ml-auto mt-2 rounded-md bg-red-100 px-2 py-2 text-xs text-red-700 sm:mt-2">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-2 sm:gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label
            htmlFor="priority"
            className="text-center text-sm font-medium sm:text-base md:text-lg"
          >
            Want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button
            type="primary"
            disabled={isSubmitting || status === "loading"}
          >
            {isSubmitting
              ? "Placing Order..."
              : `Order now from €${
                  withPriority
                    ? overallPrice + 0.2 * overallPrice
                    : overallPrice
                }`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  //check for errors
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. we might need it to contact you";

  if (Object.keys(errors).length > 0) return errors;

  // send new order
  const orderData = await createOrder(order);

  //clear cart after submitting the order
  store.dispatch(clear());

  // console.log(orderData);
  return redirect(`/order/${orderData.id}`);
}

export default CreateOrder;
