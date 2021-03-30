import React from "react";

const ProductDisplay = (props) => {
  const activeProduct = props.product;
  return <div>{activeProduct.name}</div>;
};

export default ProductDisplay;
