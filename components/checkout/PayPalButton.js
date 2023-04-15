import { PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalExpressCheckout } from "@paypal/react-paypal-js";

// import { PayPalButton } from "@paypal/react-paypal-js";
import React, { useState, useEffect } from "react";
import { saveOrder } from "../../utils/order";

const PayPalButton = ({ amount, cartData, className, ...props }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [paymentID, setPaymentID] = useState(null);
  // console.log(amount);


  useEffect(() => {
    setIsEnabled(true);
  }, []);



  const createOrder = (data,actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
            currency: "USD",
          },
        },
      ],
    });
  };

  const onAprove = (data,actions) => {
    return actions.order.capture().then((paymentDetails)=>{
        const name = paymentDetails.payer.name.given_name;
        console.log(paymentDetails);
        // alert(`transaction completed by ${name}`);
        // saveOrderToDb();
        saveOrder(paymentDetails,cartData);
    })
  };

  //old
  const onAuthorize = (data, actions) => {
    return actions.payment.execute().then(() => {
      setPaymentID(data.paymentID);
    });
  };

  const createPayment = () => {
    return paypal.rest.payment.create(paypal.mode, client, {
      transactions: [
        {
          amount: {
            total: amount,
            currency: "USD",
          },
        },
      ],
    });
  };



  return (
    <div className={className}>
      {isEnabled ? (
        <div id="paypal-express-btn">
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onAprove}
            {...props}
            // createPayment={createPayment}
            // onAuthorize={onAuthorize}
            // style={{ layout: "horizontal" }}
          />
        </div>
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default PayPalButton;
