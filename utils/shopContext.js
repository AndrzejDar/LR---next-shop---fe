import React, { useContext, createContext, useEffect, useState } from "react";
import {
  AddToCart,
  ClearCart,
  readShopFromCookies,
  saveShopToCookies,
} from "./shop";
let shopState;

const ShopContext = createContext();

export default ShopContext;

export const ShopProvider = ({ children }) => {
  const [shop, setShop] = useState({ cart: [] });

  useEffect(() => {
    readShopFromCookies().then((shop) => shop && setShop(shop));
  }, []);

  const addItemToCart = (item) => {

    setShop((prev) => {
      if (prev.cart.filter((el) => el.id === item.id).length === 0) {
        saveShopToCookies({ ...prev, cart: [...prev.cart, item] });
        return { ...prev, cart: [...prev.cart, item] };
      } else {
        let prevItem = {...prev.cart.filter((el) => el.id === item.id)[0]};
        prevItem.quantity = prevItem.quantity+item.quantity;
        saveShopToCookies({
          ...prev,
          cart: [...prev.cart.filter((el) => el.id != item.id), prevItem],
        });
        return {
          ...prev,
          cart: [...prev.cart.filter((el) => el.id != item.id), prevItem],
        };
      }
    });
  };

  const removeItemFromCart = (id) => {
    setShop((prev) => {
      saveShopToCookies({
        ...prev,
        cart: [...prev.cart.filter((item) => item.id != id)],
      });
      return { ...prev, cart: [...prev.cart.filter((item) => item.id != id)] };
    });
  };

  const clearCart = () => {
    setShop((prev) => {
      saveShopToCookies({ ...prev, cart: [] });
      return { ...prev, cart: [] };
    });
  };

  return (
    <ShopContext.Provider
      value={{ shop, addItemToCart, removeItemFromCart, clearCart }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
