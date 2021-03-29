import React from "react";
import classes from "./ProductPage.module.css";
const ProductPage = (props) => {
  const product = { ...props.location.query };
  console.log(product);
  return (
    <div className={classes.ProductPage}>
      <img src={product.image_link} alt="" />
      <div>
        <h1>{product.name}</h1>
        <h2> {product.brand}</h2>
        <p>{product.description}</p>
        <h3>
          {(+product.price).toFixed(2)}
          {product.price_sign ? product.price_sign : "€"}
        </h3>
      </div>
    </div>
  );
};
export default ProductPage;
