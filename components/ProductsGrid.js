import React from "react";
import styles from "./productsGrid.module.scss";
import Link from "next/link";
import { fromImageToUrl } from "../utils/urls";
import { twoDecimals } from "../utils/format";
import Image from "next/image";

const ProductsGrid = ({ products }) => {
  return (
    <div className={styles.container}>
      {products.data.map((product) => (
        <div className={styles.product} key={product.attributes.name}>
          <Link href={`/products/${product.attributes.slug}`}>
            <div className={styles.imageWrapper}>
              <Image
                src={fromImageToUrl(
                  product.attributes.cover_image.data?.attributes
                )}
                alt=""
                fill
                sizes="(max-width: 576px) 100vw,(max-width: 992px) 50vw,(max-width: 1400px) 33vw, 25vw"
                blurDataURL={fromImageToUrl(
                  product.attributes.cover_image.data?.attributes.formats
                    .thumbnail
                )}
              />
            </div>
            <div className={styles.desc}>
              <div className={styles.name}>
                <div className={styles.title}>
                  <span>{product.attributes.name}</span>
                </div>
                <div className={styles.subtitle}>
                  <span>{product.attributes.variation}</span>
                </div>
              </div>
              <div className={styles.price}>
                <span>{twoDecimals(product.attributes.price)}</span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;
