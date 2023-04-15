import axios from "axios";

const saveOrder = async (paymentDetails, cartData) => {
  console.log({ paymentDetails });
  console.log({ cartData });


  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
const dateFormatted = new Date(paymentDetails.create_time).toLocaleDateString('en-US', options);
const timeFormatted = new Date(paymentDetails.create_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

const formattedDateTime = `${dateFormatted} ${timeFormatted}`;
const productsIDs = [];
cartData.map(item=>productsIDs.push(item.id));

  const data = {
    data: {
      created: new Date(paymentDetails.create_time),
      payment_ID: paymentDetails.id,
      payment_status: paymentDetails.status,
      email: paymentDetails.purchase_units[0].payee.email_address,
      full_name: paymentDetails.purchase_units[0].shipping.name.full_name,
      address: paymentDetails.purchase_units[0].shipping.address.address_line_1,
      city: paymentDetails.purchase_units[0].shipping.address.admin_area_2,
      country: paymentDetails.purchase_units[0].shipping.address.country_code,
      postal_code:
        paymentDetails.purchase_units[0].shipping.address.postal_code,
      order_value: paymentDetails.purchase_units[0].amount.value,
      order_content: cartData,
      products: productsIDs
    },
  };
  console.log({ data });
  const responseData = await axios.post(
    `${process.env.NEXT_PUBLIC_DATABASE_URL}/api/orders`,
    data
  );
  console.log(responseData);
};

export { saveOrder };
