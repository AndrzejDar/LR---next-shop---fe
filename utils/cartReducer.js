import React from "react";

const initState = {
  cart: [],
};

const exampleItemInCart = {
  id: 1,
  name: "name",
  quntity: 2,
  price: 12.0,
};

const cartReducer = (state = initState, action) => {
    console.log(action);
  switch (action.type) {
    case "ADD_ITEM":
      const item = state.cart.find((elem) => elem.id === action.payload.id);
      if (!item) {
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      } else {
        item.quntity += action.payload.quantity;
        return {
          ...state,
          cart: [
            ...state.cart.filter((item) => item.id != action.payload.id),
            item,
          ],
        };
      }
    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case "CHANGE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: action.payload.quantity };
          }
          return item;
        }),
      };
  }
  return state;
};

export default cartReducer;
