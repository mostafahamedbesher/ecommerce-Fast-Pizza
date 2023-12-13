import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  function handleDeleteItem(pizzaId) {
    dispatch(deleteItem(pizzaId));
  }

  return (
    <Button type="small" onClick={() => handleDeleteItem(pizzaId)}>
      Delete
    </Button>
  );
}

export default DeleteItem;
