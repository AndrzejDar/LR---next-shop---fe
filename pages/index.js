import Head from "next/head";
import Link from "next/link";
// import { getSession, signIn, signOut } from "next-auth";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { fromImageToUrl, API_URL } from "../utils/urls";
import { twoDecimals } from "../utils/format";
import { useSession } from "next-auth/react";
import { useFetchUser, useUser } from "../utils/authContext";
import FeaturedProduct from "../components/FeaturedProduct";
import ProductsGrid from "../components/ProductsGrid";
import DynamicDesc from "../components/DynamicDesc";

export default function Home({ products, featured, faq, about_leather }) {
  // const { data: session } = useSession();
  // {console.log(products)}

  const { user, loading } = useUser();

  // const signInButtonNode = () => {
  //   if (session) {
  //     return false;
  //   }
  //   return (
  //     <div>
  //       <Link href="/api/auth/signin">
  //         <button
  //           onClick={(e) => {
  //             e.preventDefault();
  //             signIn();
  //           }}
  //         >
  //           Sign In
  //         </button>
  //       </Link>
  //     </div>
  //   );
  // };

  // const signOutButtonNode = () => {
  //   if (!session) {
  //     return false;
  //   }

  //   return (
  //     <div>
  //       <Link href="/api/auth/signout">
  //         <button
  //           onClick={(e) => {
  //             e.preventDefault();
  //             signOut();
  //           }}
  //         >
  //           Sign Out
  //         </button>
  //       </Link>
  //     </div>
  //   );
  // };

  return (
    <div className={styles.container}>
      <Head>
        <title>Leather Realm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* {!session ? (
        <div className="hero">
          <div className="navbar">
            {signOutButtonNode()}
            {signInButtonNode()}
          </div>
          <div className="text">You aren't authorized to view this page</div>
        </div>
      ) : (
        <div className="hero">
          <Head>
            <title>Index Page</title>
          </Head>
          <div className="navbar">
            {signOutButtonNode()}
            {signInButtonNode()}
          </div>
          <div className="text">Hello world</div>
        </div>
      )} */}

      <FeaturedProduct product={featured.data[0]} />

      {/* {user?<p>loogedIn</p>:<p>logged out</p>} */}
      <ProductsGrid products={products} />
      <DynamicDesc title={'About Leather'} content={about_leather} />
      {/* {console.log(faq)} */}
      <DynamicDesc title={'FAQ'} content={faq} />
    </div>
  );
}

export async function getStaticProps() {
  // console.log(`${API_URL}/api/products`);
  //fetching products list
  const product_res = await fetch(
    `${API_URL}/api/products?pagination[start]=0&pagination[limit]=8&populate[0]=cover_image`
  );
  const products = await product_res.json();

  // fetching featured product for hero section
  const featured_res = await fetch(
    `${API_URL}/api/products?filters[id][$eq]=1&populate[0]=images`
  );
  const featured = await featured_res.json();

    //fetching faq section contents
    const faq_res = await fetch(
      `${API_URL}/api/faq?populate[0]=faq_questions`
    );
    let faq = await faq_res.json();
    faq= faq.data?.attributes?.faq_questions.data;

    //fetching about leather section contents
    // const about_leather_res = await fetch(
    //   `${API_URL}/api/about-leather`
    // );
    // console.log(about_leather_res);
    // let about_leather = await about_leather_res.json();
    // about_leather = about_leather.data?.attributes.content;

    //fetching about leather section contents
    const about_leather_res = await fetch(
      `${API_URL}/api/about-leather`
    );
    // console.log(about_leather_res);
    let about_leather = await about_leather_res.json();
    about_leather = about_leather.data?.attributes.content;

  // const session = await getSession({ req });

  return {
    props: {
      products,
      featured,
      faq,
      about_leather,
      // session,
    },
  };
}

// export const getServerSideProps = async ({ req }) => {
//   const session = await getSession({ req });
//   return {
//     props: {
//       session,
//     },
//   };
// };
