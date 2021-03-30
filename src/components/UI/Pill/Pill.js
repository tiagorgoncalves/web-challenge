import React from "react";
import classes from "./Pill.module.css";

const Pill = (props) => {
  let pill = null;
  let innerPill = null;
  if (props.rating) {
    const percentage = props.rating * 20;
    if (percentage < 100 && percentage >= 85) {
      innerPill = (
        <div
          className={classes.RatingHighPill}
          style={{ width: percentage + "%" }}
        ></div>
      );
    } else if (percentage < 85 && percentage >= 65) {
      innerPill = (
        <div
          className={classes.RatingMediumHighPill}
          style={{ width: percentage + "%" }}
        ></div>
      );
    } else if (percentage < 65 && percentage >= 45) {
      innerPill = (
        <div
          className={classes.RatingMediumPill}
          style={{ width: percentage + "%" }}
        ></div>
      );
    } else if (percentage < 45) {
      innerPill = (
        <div
          className={classes.RatingLowPill}
          style={{ width: percentage + "%" }}
        ></div>
      );
    } else if (percentage === 100) {
      innerPill = (
        <div
          className={classes.RatingFullPill}
          style={{ width: percentage + "%" }}
        ></div>
      );
    }
    pill = (
      <div className={classes.Rating}>
        <div className={classes.RatingBackPill}></div>
        {innerPill}
        <div className={classes.RatingValue}>{percentage}%</div>
      </div>
    );
  } else {
    pill = <span>No available rating</span>;
  }
  return pill;
};
export default Pill;
