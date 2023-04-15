import Cookies from "js-cookie";

export const saveShopToCookies = async (shop) => {
  Cookies.set("shop", JSON.stringify(shop), { expires: 14 });
};

export const readShopFromCookies = async () => {
  let shop;
  const fromCookies = Cookies.get("shop");
  fromCookies && (shop = await JSON.parse(fromCookies));

  //TO DO - check if products in cart are available
  return shop;
};
