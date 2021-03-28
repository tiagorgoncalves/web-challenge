import React from "react";
import { Link } from "react-router-dom";
import classes from "./Brand.module.css";
const Brand = (props) => {
  return (
    <Link
      to={{
        pathname: "/brand",
        hash: props.name,
      }}
    >
      <div className={classes.Brand}>
        <div>{props.name}</div>
      </div>
    </Link>
  );
};
export default Brand;
