import React from "react";
import Footer from "./Footer";
import Navbar from "./navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="global-container">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
