import Head from "next/head";
import productsData from "../products.json";
import FeaturedProduct from "../components/FeaturedProduct";
import ProductsGrid from "../components/ProductsGrid";
import styles from "../styles/Home.module.scss";

export default function Home({ products, featured }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Leather Realm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {featured?.data && <FeaturedProduct product={featured.data[0]} />}
      {products?.data && <ProductsGrid products={products} />}
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      products: productsData,
      featured: { data: [productsData.data[0]] },
    },
  };
}
