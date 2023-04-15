import React, { useContext, useState, useEffect } from "react";
import ShopContext from "../utils/shopContext";

const CartContents = ({ className }) => {
  const { shop: {cart} } = useContext(ShopContext);
  return (
    <div className={className}>
      {cart?.length}
    </div>
  );
};

export default CartContents;
