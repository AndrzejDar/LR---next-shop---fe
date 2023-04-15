import "../styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import { UserProvider, useFetchUser } from "../utils/authContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import Layout from "../components/Layout";
import ShopContext, { ShopProvider } from "../utils/shopContext";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }, //old props
  // user, loading=false,children //user provider props
}) => {
  const { user, loading } = useFetchUser();

  return (
    <SessionProvider session={session}>
      <PayPalScriptProvider
        options={{
          "client-id":
            'AXXm87kwzLGVZPt4miOe3MFoGd3J5WJZIf06l_Uwvblnu87S1HEppSXlukAve6TQFSCXUwtK56MMeiAz'
        }}
      >
        <UserProvider value={{ user, loading }}>
          {/* <ShopContext.Provider> */}
          {/* <ShopProvider value={{cart: ['test']}}> */}
          <ShopProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ShopProvider>
          {/* </ShopContext.Provider> */}
        </UserProvider>
      </PayPalScriptProvider>
    </SessionProvider>
  );
};

export default MyApp;
