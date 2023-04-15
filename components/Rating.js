import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";

import style from "./rating.module.scss";

const Rating = ({ rating, reviews }) => {
  const starArry = ["b", "b", "b", "b", "b"];

  for (let i = 0; i < 5; i++) {
    if (rating - i > 0.75) starArry[i] = "i";
    else if (rating - i > 0.25) {
      starArry[i] = "h";
    }
  }

  return (
    <div className={style.container}>
      {starArry.map((el, id) => {
        if (el === "b") return <StarBorderIcon key={id} />;
        if (el === "i") return <StarIcon key={id} />;
        if (el === "h") return <StarHalfIcon key={id} />;
      })}
      <span>{reviews > 12 ? reviews : "12"} rewievs</span>
    </div>
  );
};

export default Rating;
