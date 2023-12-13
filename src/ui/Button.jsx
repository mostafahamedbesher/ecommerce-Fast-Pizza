import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, position, onClick }) {
  const base =
    "inline-block rounded-full text-sm bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300  focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ";

  const styles = {
    primary: base + `px-3 py-2  md:px-6 md:py-4 ${position}`,
    small: base + `px-3 py-2 text-xs md:px-5 md:py-2.5 ${position}`,
    secondary: `px-4 py-2 md:px-6 md:py-3.5 sm:text-sm inline-block rounded-full text-xs border-stone-300 text-stone-400 border-2 font-semibold uppercase tracking-wide hover:text-stone-800 transition-colors duration-300 hover:bg-stone-300 focus:bg-stone-200 focus:text-stone-800  focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed ${position}`,
    round: `w-7 h-7 sm:h-9 sm:w-9 inline-block rounded-full text-sm bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300  focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed`,
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={styles[type]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
