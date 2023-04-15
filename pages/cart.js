import React, { useReducer, useContext } from "react";
import CartItem from "../components/CartItem";
// import cartReducer from "../utils/cartReducer";
import ShopContext from "../utils/shopContext";
import style from "../styles/Cart.module.scss";
import PayPalButton from "../components/checkout/PayPalButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckoutModal from "../components/checkout/CheckoutModal";

const Cart = () => {
  const {
    shop: { cart },
    clearCart,
  } = useContext(ShopContext);

  // const [cartState, dispatchCartAction] = useReducer(cartReducer);
  // console.log(cart);

  const summarizeCart = (shipping = 0) => {
    let sum = 0;

    //TODO: check if data in cart are up to date with those in db
    //TODO: change to get prices from db - do this on payment button, when clicked send request to backend with id and pass it to payment processor
    for (let i = 0; i < cart.length; i++) {
      sum += cart[i].quantity * cart[i].price;
    }
    return parseFloat(sum + shipping).toFixed(2);
  };

  return (
    <div className={style.container}>
      <div className={style.cart_contents}>
        <h2>Bag</h2>
        {cart.length===0&&<span>Your bag is empty. Try adding something ;)</span>}
        <div className={style.cart_contents_list}>
          {cart&&cart.map((item, id) => (
            <CartItem key={id} item={item} style={style} />
          ))}
        </div>
        {cart.length>0&&<button onClick={clearCart}>Clear Bag</button>}        
      </div>
      <div className={style.cart_payment}>
        <h2>Summary</h2>
        <div className={style.record}>
          <h3>Do you have Promo Code?</h3> <KeyboardArrowDownIcon />
        </div>
        <div className={style.record}>
          <h3>Subtotal</h3>
          <span>${summarizeCart()}</span>
        </div>
        <div className={style.record}>
          <h3>Estimated Shipping & Handling</h3>
          <span>$20.00</span>
        </div>
        <div className={style.record}>
          <h3>Estimated Tax</h3>
          <span>--</span>
        </div>
        <div className={style.divider} />
        <div className={style.record}>
          <h3>Total</h3>
          <span>${summarizeCart(20)}</span>
        </div>
        <div className={style.divider} />
        <PayPalButton amount={summarizeCart(20)} cartData={cart} className={style.payment_container} />
      </div>
      <CheckoutModal amount={summarizeCart(20)} cartData={cart} />
    </div>
  );
};

export default Cart;
