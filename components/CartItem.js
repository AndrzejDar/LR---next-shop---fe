import React, { useContext } from "react";
import ShopContext from "../utils/shopContext";
import { fromImageToUrl } from "../utils/urls";
import Image from "next/image";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import FavouriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import CartQuantity from './CartQuantity';

const CartItem = ({ item, style }) => {
  const { removeItemFromCart } = useContext(ShopContext);
  return (
    <>
    <div className={style.cartItem}>
      <div className={style.img}>
        <Image
          src={fromImageToUrl(item.cover_image)}
          alt=""
          fill
          sizes="(max-width: 150) 20vw, 20vw"
          blurDataURL={fromImageToUrl(item.cover_image.formats.thumbnail)}
        />
      </div>
      <div className={style.desc}>
        <div className={style.record}>
          <div className={style.name}>{item.name}</div>
          <div className={style.price}>${item.price}</div>
        </div>
        <div className={style.record}>{item.variation}</div>
        <div className={style.record}>{item.meta_descryption}</div>
        <div className={style.record}>
          <div className={style.quantity}>
            {/* <CartQuantity count={item.quantity} setCount={''} /> */}
            <span>Quantity</span>
            <select id="quantity" selected={item.quantity}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            {/* //TODO add dropdown to change quantity */}
          </div>
        </div>
        {/* <div className={style.price}>{parseFloat(item.price*item.quantity).toFixed(2)}</div> */}
        <div className={style.record}>
          <div className={style.icons}>
            <FavouriteBorderIcon />

            <div
              className={style.remove}
              onClick={() => removeItemFromCart(item.id)}
            >
              <DeleteOutlineIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className={style.divider}></div>
      </>
  );
};

export default CartItem;
