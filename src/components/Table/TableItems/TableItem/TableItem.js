import React from "react";
import { Link } from "react-router-dom";
import classes from "./TableItem.module.css";

const tableItem = (props) => {
  let item = null;
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
        <div className={classes.RatingValue}>{percentage}</div>
      </div>
    );
  } else {
    pill = <span>No available rating</span>;
  }
  if (!props.layout) {
    item = (
      <div className={classes.TableItem} onClick={props.clicked}>
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
            <div style={{ height: "5.25rem" }}>
              <div>{props.name}</div>

              <div>{props.brand}</div>
              <div>
                {(+props.price).toFixed(2)}
                {props.price_sign ? props.price_sign : "€"}
              </div>
            </div>
            {pill}
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
              <div>{props.name}</div>
              <div>{props.brand}</div>
              <div style={{ height: "4rem", overflow: "auto" }}>
                {props.description}
              </div>
              <div>
                {(+props.price).toFixed(2)}
                {props.price_sign ? props.price_sign : "€"}
              </div>
            </div>
            {pill}
          </div>
        </Link>
      </div>
    );
  }
  return item;
};

export default tableItem;
