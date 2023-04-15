import React from "react";
import style from "./featuredProduct.module.scss";
import { fromImageToUrl } from "../utils/urls";
import Image from "next/image";

const FeaturedProduct = ({
  product: {
    attributes: {
      images: { data },
    },
  },
}) => {
  // console.log(data);

  return (
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.image}>
          <div className={style.imageWrapper}>
            <Image
              src={fromImageToUrl(data[0].attributes)}
              alt=""
              fill
              sizes="(max-width: 992px) 0vw, 50vw"
              blurDataURL={fromImageToUrl(data[0].attributes.formats.thumbnail)}
              // priority
            />
          </div>
        </div>
      </div>
      <div className={style.right}>
        <h2>Natural materials</h2>
        <h2>Handmade products</h2>
        <p>
        Browse our handmade Italian leather goods for timeless style and exceptional durability. Crafted by skilled artisans with attention to detail, each piece is made from natural materials. Experience unmatched quality and authenticity!
        </p>
        <div className={style.ctaButtons}>
          <button className={style.accent}>shop</button>
          <button>about us</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
