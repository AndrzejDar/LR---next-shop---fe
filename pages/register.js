import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { setToken } from "../utils/auth";
import { useFetchUser } from "../utils/authContext";

const Register = () => {
  const { user, loading } = useFetchUser();
  const [data, setData] = useState({});
  const router = useRouter();

  useEffect(() => {
    console.log(user);
    if (user) {
      console.log("redirecting");
      router.push("/");
    }
  }, [user]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseData = await axios.post(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/api/auth/local/register`,
      data
    );
    console.log(responseData);
    setToken(responseData, () => {
      // router.reload("/");
      // router.push("/", null, { shallow: false })
      // router.redirect("/");
      // router.push("/profile")
    });
    // router.push("/")
    router.reload("/");
  };

  return (
    <div>
      <Head>
        <title>Register</title>
        <meta name="descryption" content={"descryption"} />
      </Head>
      {!user && (
        <>
          <h3>Register</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              placeholder="username"
              className=""
              required
            />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="email"
              className=""
              required
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className=""
              required
            />
            <input
              type="password"
              name="password2"
              onChange={handleChange}
              placeholder="Repeat Password"
              className=""
              required
            />
            <button type="submit">Register </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Register;
