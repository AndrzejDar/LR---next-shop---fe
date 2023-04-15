import React, { useState } from "react";
import style from "./checkoutModal.module.scss";
import PayPalButton from "./PayPalButton";

const CheckoutModal = ({ ...props }) => {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <div className={style.bottom_nav_container}>
        <button className={style.button} onClick={() => setOpen(true)}>
          Go to Checkout
        </button>
      </div>
    );
  } else {
    return (
      <div className={style.overlay} onClick={()=>setOpen(false)}>
        <div className={style.container}>
          <div className={style.contents}>
            <PayPalButton style={{ shape: "pill", color: "blue", height: 55 }} {...props} />
          </div>
        </div>
      </div>
    );
  }
};

export default CheckoutModal;
