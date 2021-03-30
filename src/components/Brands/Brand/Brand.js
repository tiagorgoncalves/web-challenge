import React from "react";
import { Link } from "react-router-dom";
import classes from "./Brand.module.css";
const Brand = (props) => {
  let array = [];
  if (props.brands) {
    // eslint-disable-next-line
    props.brands.map((brand) => {
      array.push(
        <li>
          {" "}
          <Link
            key={brand}
            to={{
              pathname: "/brand",
              hash: brand,
            }}
          >
            <div className={classes.Brand}>
              <div>{brand}</div>
            </div>
          </Link>
        </li>
      );
    });
  }
  return (
    <div>
      <h2>{props.letter}</h2>
      <ul>
        <li>{array}</li>
      </ul>
    </div>
  );
};
export default Brand;
