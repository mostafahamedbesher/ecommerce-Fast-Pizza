import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const error = useRouteError();

  return (
    <div className="wt-8 py-8">
      <h1 className="mb-1 text-lg font-semibold">Something went wrong 😢</h1>
      <p className="mb-4">{error.data || error.message}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
