import React from "react";

import classes from "./Modal.module.css";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  let product = props.children.props.product;
  return (
    <Auxiliary>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div className={classes.Modal}>
        <div className={classes.Content}>
          <img src={product.image_link} alt="" />
          <div>
            <h2>{product.name}</h2>
            <h3>{product.brand}</h3>
            <p>{product.description}</p>
            <h2>
              {(+product.price).toFixed(2)}
              {props.price_sign ? props.price_sign : "€"}
            </h2>
          </div>
        </div>
      </div>
    </Auxiliary>
  );
};

export default Modal;
