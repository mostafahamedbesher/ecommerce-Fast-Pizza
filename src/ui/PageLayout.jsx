import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
import { useSelector } from "react-redux";

function PageLayout() {
  const navigate = useNavigation();
  const isLoading = navigate.state === "loading";

  const cart = useSelector((store) => store.cart);

  return (
    <div className="grid h-screen grid-rows-custom">
      {isLoading && <Loader />}

      <Header />

      <div className="overflow-scroll">
        <main className=" mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      {cart.length > 0 && <CartOverview />}
    </div>
  );
}

export default PageLayout;
