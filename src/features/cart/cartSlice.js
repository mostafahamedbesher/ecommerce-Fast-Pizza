import { createSlice } from "@reduxjs/toolkit";

// const pizzaItem = {
//   pizzaId: 0,
//   name: "",
//   quantity: 0,
//   unitPrice: 0,
//   totalPrice: 0,
// };

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    update(state, action) {
      state.push(action.payload);
    },
    increaseQuantity(state, action) {
      const item = state.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseQuantity(state, action) {
      const item = state.find((item) => item.pizzaId === action.payload);
      item.quantity--;

      if (item.quantity === 0) {
        // const itemIndex = state.findIndex(
        //   (item) => item.pizzaId === action.payload,
        // );
        // state.splice(itemIndex, 1);

        //another way which to use one of action creators instead of repeating the same code of it
        cartSlice.caseReducers.deleteItem(state, action);
      } else {
        item.totalPrice = item.unitPrice * item.quantity;
      }
    },
    deleteItem(state, action) {
      const itemIndex = state.findIndex(
        (item) => item.pizzaId === action.payload,
      );
      state.splice(itemIndex, 1);
    },
    clear(state) {
      state.splice(0);
    },
  },
});

export default cartSlice.reducer;

export const { update, increaseQuantity, decreaseQuantity, deleteItem, clear } =
  cartSlice.actions;

export const getTotalPrice = (store) =>
  store.cart.reduce((overallPrice, item) => overallPrice + item.totalPrice, 0);

export const getTotalQuantity = (store) =>
  store.cart.reduce((overallPrice, item) => overallPrice + item.quantity, 0);
