import React from "react";
import Product from "./Product/Product";

const Products = (props) => {
  let products = [];
  const productArray = [
    "blush",
    "bronzer",
    "eyebrow",
    "eleliner",
    "eyeshadow",
    "foundation",
    "lip_liner",
    "lipstick",
    "mascara",
    "nail_polish",
  ];
  productArray.map((b, index) => {
    return products.push(<Product key={index} name={b} />);
  });
  return <div>{products}</div>;
};
export default Products;
