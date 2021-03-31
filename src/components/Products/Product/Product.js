import React from "react";
import { Link } from "react-router-dom";
import classes from "./Product.module.css";
const Product = (props) => {
  return (
    <div>
      <Link
        to={{
          pathname: "/productlist",
          hash: props.name,
        }}
      >
        <div className={classes.Product}>
          <h2>{props.title}</h2>
        </div>
      </Link>
    </div>
  );
};
export default Product;
