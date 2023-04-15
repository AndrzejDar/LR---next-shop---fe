import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import style from "./cartQuantity.module.scss";

const CartQuantity = ({ count, setCount }) => {
  return (
    <div className={style.cartQuantity}>
      <div
        className={style.box}
        onClick={() =>
          setCount((prev) => {
            if (prev - 1 === 0) return 1;
            else return prev - 1;
          })
        }
      >
        <RemoveIcon />
      </div>
      <div className={style.box_center}>
        <span>{count}</span>
      </div>
      <div className={style.box} onClick={() => setCount((prev) => prev + 1)}>
        <AddIcon />
      </div>
    </div>
  );
};

export default CartQuantity;
