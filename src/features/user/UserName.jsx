import { useSelector } from "react-redux";

function UserName() {
  const { userName } = useSelector((store) => store.user);

  if (!userName) return null;

  return (
    <div className="hidden text-sm font-semibold sm:block">{userName}</div>
  );
}

export default UserName;
