import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <header className="flex items-center justify-between bg-yellow-400 px-4 py-3 text-sm sm:px-6  md:text-base">
      <Link to="/" className=" uppercase tracking-widest">
        fast pizza co.
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
