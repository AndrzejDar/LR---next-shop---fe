import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { setToken, unsetToken } from "../utils/auth";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Link from "next/link";

import style from "./user.module.scss";

const User = ({ user = null, loading = false, className }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [userData, setUserData] = useState({
    identifier: "",
    password: "",
  });

  useEffect(()=>{
    // console.log('effect',open);
  },[open])


  const login = async (e) => {
    e.preventDefault();
    if (open) {
      const responseData = await axios.post(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/api/auth/local`,
        {
          identifier: userData.identifier,
          password: userData.password,
        }
      );

      console.log(responseData);
      setToken(responseData, () => {
        router.reload("/");
      });
    } else {
      setOpen(true);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    console.log("logging out");
    unsetToken(() => {
      console.log("router reloading");
      router.reload("/");
    });
  };

  const register = (e) => {
    e.preventDefault();
    router.push("/register");
    // console.log("register wip");
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {!loading && !user ? (
        <div className={style.container}>
          <form onSubmit={login} className={style.form}>
            <div className={style.slider_wrapper}>
              <div
                className={
                  open ? `${style.slider} ${style.open}` : style.slider
                }
              >
                <div className={style.input_wrapper}>
                  <input
                    type="email"
                    name="identifier"
                    onChange={handleChange}
                    placeholder="username"
                    className=""
                    required
                  />
                </div>
                <div className={style.input_wrapper}>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    className=""
                    required
                  />
                </div>
                <button className={style.closeButton} onClick={(e)=>{e.preventDefault();setOpen(prev=>{console.log(prev); return false})}} >X</button>
              </div>
            </div>
            <button type="submit" className={open?style.open:''}>Login </button>
          </form>
          <form onSubmit={register}>
            <button type="submit">Register </button>
          </form>
        </div>
      ) : (
        <div className={className}>
          <Link href="/profile">
            <PersonOutlineOutlinedIcon />
          </Link>
        </div>
        // <form onSubmit={logout}>
        //   <button type="submit">Logout </button>
        // </form>
      )}
    </>
  );
};

export default User;
