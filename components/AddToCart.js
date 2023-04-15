import React, { useContext, useReducer } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import style from "./addToCart.module.scss";
import cartReducer from "../utils/cartReducer";
import ShopContext from "../utils/shopContext";

const AddToCart = ({ quantity, product, id }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer);
  const { shop, addItemToCart } = useContext(ShopContext);

  const handleAddToCart = () => {
    console.log("adding to cart");
    const item = {
      id: id,
      name: product.name,
      quantity: quantity,
      price: product.price,
      cover_image: product.cover_image.data.attributes,
      // thumbnail: product.images.data[0].attributes,
      variation: product.variation,
      meta_descryption: product.meta_descryption
    };

    addItemToCart(item);

    // dispatchCartAction({
    //   type: "ADD_ITEM",
    //   payload: {
    //     id: id,
    //     name: product.name,
    //     quntity: count,
    //     price: product.price,
    //   },
    // });
  };

  return (
    <div className={style.container}>
      <button onClick={handleAddToCart}>
        <AddShoppingCartIcon />
        <span>ADD TO CART</span>
      </button>
    </div>
  );
};

export default AddToCart;
