import React from "react";
import { setToken, unsetToken } from "../utils/auth";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();

  const logout = (e) => {
    e.preventDefault();
    console.log("logging out");
    unsetToken(() => {
      console.log("router reloading");
      router.reload("/");
    });
  };

  return (
    <div>
      profile
      <form onSubmit={logout}>
        <button type="submit">Logout </button>
      </form>
    </div>
  );
};

export default Profile;
