import productsData from "../../products.json";
import { fromImageToUrl } from "../../utils/urls";
import Head from "next/head";
import Image from "next/image";
import style from "../../styles/Product.module.scss";
import { useState, useReducer } from "react";
import Link from "next/link";
import CartQuantity from "../../components/CartQuantity";
import AddToCart from "../../components/AddToCart";
import FavouriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareIcon from "@mui/icons-material/Compare";
import Tags from "../../components/Tags";
import ReactMarkdown from "react-markdown";
import cartReducer from "../../utils/cartReducer";
import Rating from "../../components/Rating";
import DynamicDesc from "../../components/DynamicDesc";

const Product = ({ product, id }) => {
  const [mainImg, setMainImg] = useState(0);
  const [count, setCount] = useState(1);
  const [cartState, dispatchCartAction] = useReducer(cartReducer);

  return (
    <div>
      <Head>
        {product.meta_title && <title>{product.meta_title}</title>}
        {product.meta_description && (
          <meta name="description" content={product.meta_description} />
        )}
      </Head>
      <div className={style.container}>
        <div className={style.banner}>
          <div className={style.banner_content}>
            <h2>
              Natural materials,
              <br /> HandMade products
            </h2>
            <div className={style.underline}></div>
          </div>
          <Image src={"/img/banner.png"} alt="" fill object-fit={"contain"} />
        </div>
        <div className={style.product}>
          <div className={style.left}>
            <div className={style.images}>
              {product.images?.data &&
                product.images.data.map((img, i) => (
                  <div className={style.imageWrapper} key={i}>
                    <Image
                      src={fromImageToUrl(img.attributes)}
                      alt=""
                      fill
                      sizes="(max-width: 768) 20vw, 20vw"
                      blurDataURL={fromImageToUrl(img.attributes.formats.thumbnail)}
                      onClick={() => setMainImg(i)}
                    />
                  </div>
                ))}
            </div>
            <div className={style.mainImage}>
              {product.images?.data && (
                <Link href={fromImageToUrl(product.images.data[mainImg]?.attributes)}>
                  <Image
                    src={fromImageToUrl(product.images.data[mainImg].attributes)}
                    alt=""
                    fill
                    sizes="(max-width: 576px) 100vw, (max-width: 992px) 80vw, 40vw"
                    blurDataURL={fromImageToUrl(
                      product.images.data[mainImg].attributes.formats.thumbnail
                    )}
                    priority
                  />
                </Link>
              )}
            </div>
          </div>
          <div className={style.right}>
            <div className={style.title}>
              <h1>{product.name}</h1>
              <span>size: {product.variation}</span>
              <Rating rating={product.rating} reviews={4} />
            </div>
            <div className={style.price}>
              {product.original_price && (
                <span className={style.original_price}>${product.original_price}</span>
              )}
              <span>${product.price}</span>
            </div>

            <div className={style.cart_actions}>
              <div className={style.cart_quantity}>
                <CartQuantity count={count} setCount={setCount} />
              </div>
              <div className={style.add_to_cart}>
                <AddToCart quantity={count} product={product} id={id} />
              </div>
            </div>
            <div className={style.general_actions}>
              <div className={style.action}>
                <FavouriteBorderIcon />
                <span>Add to Wishlist</span>
              </div>
              <div className={style.action}>
                <CompareIcon />
                <span>Add to Compare</span>
              </div>
            </div>
            <div className={style.description}>
              <ReactMarkdown escapeHTML={false}>{product.short_description}</ReactMarkdown>
            </div>
            <div className={style.tags}>
              {product.tags && <Tags tags={product.tags.data} />}
            </div>
            <div className={style.footer_actions}></div>
          </div>
        </div>
        <DynamicDesc title={"DESCRIPTION"} content={product.description} />
        <DynamicDesc title={"FAQ"} content={product.short_description} />
        <DynamicDesc title={"CUSTOMER REVIEWS"}>reviews component</DynamicDesc>

        <p>{product.content}</p>
      </div>
    </div>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const match = productsData.data.find((p) => p.attributes.slug === slug);
  if (!match) {
    return { notFound: true };
  }
  return {
    props: {
      product: match.attributes,
      id: match.id,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: productsData.data.map((p) => ({
      params: { slug: String(p.attributes.slug) },
    })),
    fallback: false,
  };
}

export default Product;
