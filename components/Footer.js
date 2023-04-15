import React from "react";
import style from "./footer.module.scss";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.cta_container}>
        <div className={style.cta_content}>
          <h2>
            Natural materials
            <br /> Handmade products
          </h2>

          <div className={style.underline}></div>
        </div>
        <div className={style.cta_img}>
          <Image src={"/img/accent01.png"} alt="" fill />
        </div>
      </div>
      <div className={style.link_container}>
      <div className={style.right}>
          <div className={style.item}>
            <Link href="/">Policies</Link>
          </div>
          <div className={style.item}>
            <Link href="/">FAQ</Link>
          </div>
          <div className={style.item}>
            <Link href="/">Leather Care</Link>
          </div>
          <div className={style.item}>
            <Link href="/">About us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
