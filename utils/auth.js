import axios from "axios";
import Cookies from "js-cookie";

export const setToken = ({ data }, onAfter) => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.set("id", data.user.id);
  Cookies.set("username", data.user.username);
  Cookies.set("jwt", data.jwt);

  if (Cookies.get("username")) {
    onAfter();
  }
};

export const unsetToken = (onAfter) => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.remove("id");
  Cookies.remove("username");
  Cookies.remove("jwt");

  if (!Cookies.get("username")) {
    onAfter();
  }
};

export const getUserFromCookies = async () => {
  const jwt = Cookies.get("jwt");
  if (jwt) {
    return await axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((data) => {
        console.log(data)
        return data.data.username;
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    return;
  }
  // return Cookies.get('username');
};

export const getIdFromCookies = () => {
  return Cookies.get("id");
};
