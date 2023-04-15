import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";

import style from "./navbar.module.scss";
import { setToken, unsetToken } from "../../utils/auth";
import { useUser } from "../../utils/authContext";
import User from "../User";
import CartContents from "../CartContents";
import MenuModal from "./MenuModal";

const Navbar = () => {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const [open,setOpen] = useState(false);

  const goBack = (e) => {
    e.preventDefault();
    router.back();
  };

  const { user, loading } = useUser();
  // console.log({ user });
  // console.log({ loading });

  return (<>

    <div className={style.navbar}>
      <div className={style.wrapper}>
        {/* <div className={style.center}></div> */}
        <div className={style.left}>
          <Link href="/" className={style.name}>
            <h1></h1>
          </Link>

          <div className={style.item}>
            <Link href="/">Home</Link>
          </div>
          <div className={style.item}>
            <Link href="/">Products</Link>
          </div>
          <div className={style.item}>
            <Link href="/">About</Link>
          </div>
        </div>

        <div className={style.right}>
          <User user={user} loading={loading} className={style.item} />
          <div className={style.item}>
            <SearchIcon />
          </div>

          <div className={style.item}>
            <Link href="/cart">
              <ShoppingCartOutlinedIcon />
              <CartContents className={style.cartContents} />
            </Link>
          </div>
          {/* {!isHome && (
            <a href="#" onClick={(e) => goBack(e)}>
              {" "}
              {"<"}Back
            </a>
          )} */}
        </div>
      </div>

      {/* mobile navbar ----------------------------- */}

      <div className={style.mobile_wrapper}>
        {/* <div className={style.center}></div> */}
        <div className={style.left}>
          <Link href="/" className={style.name}>
            <h1></h1>
          </Link>
        </div>

        <div className={style.right}>
          <div className={style.item}>
            <SearchIcon />
          </div>
          <div className={style.item}>
            <Link href="/cart">
              <ShoppingCartOutlinedIcon />
              <CartContents className={style.cartContents} />
            </Link>
          </div>
          <div className={style.item} onClick={()=>setOpen(prev=>!prev)}>
            <MenuIcon />
          </div>
        </div>
      </div>
    </div>
      <MenuModal open={open} setOpen={setOpen}>
        <div className={style.item}>
          <Link href="/">Home</Link>
        </div>
        <div className={style.item}>
          <Link href="/">Products</Link>
        </div>
        <div className={style.item}>
          <Link href="/">About</Link>
        </div>
      </MenuModal>
      {/* <MenuModal>
        <User user={user} loading={loading} className={style.item} />
      </MenuModal> */}
    </>
  );
};

export default Navbar;
