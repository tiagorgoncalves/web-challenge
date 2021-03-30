import React from "react";
import { Link } from "react-router-dom";
import classes from "./Product.module.css";
const Product = (props) => {
  return (
    <Link
      to={{
        pathname: "/productlist",
        hash: props.name,
      }}
    >
      <div className={classes.Product}>
        <div>{props.name}</div>
      </div>
    </Link>
  );
};
export default Product;
