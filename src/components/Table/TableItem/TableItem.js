import React from "react";
import classes from "./TableItem.module.css";

const tableItem = (props) => {
  return (
    <div className={classes.TableItem}>
      <img src={props.api_featured_image} alt="" />
      <div className={classes.Content}>
        <div>{props.name}</div>
        <div>{props.brand}</div>
        <div>
          {(+props.price).toFixed(2)}
          {props.price_sign}
        </div>
        <div>{props.rating}</div>
      </div>
    </div>
  );
};

export default tableItem;
