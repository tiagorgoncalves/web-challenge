import React from "react";
import { Link } from "react-router-dom";
import classes from "./TableItem.module.css";
import Pill from "../../../UI/Pill/Pill";

const tableItem = (props) => {
  let item = null;
  if (!props.layout) {
    item = (
      <div className={classes.TableItem} onClick={props.clicked}>
        <img
          src={props.api_featured_image}
          alt=""
          onClick={() => props.clicked}
        />
        <Link
          to={{
            pathname: "/product",
            query: { ...props },
          }}
        >
          <div className={classes.Content}>
            <div>
              <div className={classes.ProductName}>{props.name}</div>
              <div className={classes.ProductBrand}>{props.brand}</div>{" "}
              <div className={classes.ProductRating}>
                <Pill rating={props.rating} />
              </div>
              <div className={classes.ProductPrice}>
                {(+props.price).toFixed(2)}
                {props.price_sign ? props.price_sign : "€"}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  } else {
    item = (
      <div className={classes.TableList} onClick={props.clicked}>
        <img
          src={props.api_featured_image}
          alt=""
          onClick={() => console.log(props.name)}
        />
        <Link
          to={{
            pathname: "/product",
            query: { ...props },
          }}
        >
          <div className={classes.Content}>
            <div style={{ height: "8rem" }}>
              <div className={classes.ProductName}>{props.name}</div>
              <div className={classes.ProductBrand}>{props.brand}</div>
              <div className={classes.ProductDescription}>
                {props.description}
              </div>
              <div className={classes.ProductRating}>
                <Pill rating={props.rating} />
              </div>
              <div className={classes.ProductPrice}>
                {(+props.price).toFixed(2)}
                {props.price_sign ? props.price_sign : "€"}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
  return item;
};

export default tableItem;
