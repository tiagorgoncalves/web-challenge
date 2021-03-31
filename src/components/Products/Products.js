import React from "react";
import Product from "./Product/Product";
import classes from "./Products.module.css";

const Products = (props) => {
  let products = [];
  const productArray = [
    { name: "blush", title: "Blush" },
    { name: "bronzer", title: "Bronzer" },
    { name: "eyebrow", title: "Eyebrow" },
    { name: "eyeliner", title: "Eyeliner" },
    { name: "eyeshadow", title: "Eyeshadow" },
    { name: "foundation", title: "Foundation" },
    { name: "lip_liner", title: "Lip Liner" },
    { name: "lipstick", title: "Lipstick" },
    { name: "mascara", title: "Mascara" },
    { name: "nail_polish", title: "Nail Polish" },
  ];
  productArray.map((p, index) => {
    return products.push(<Product key={index} name={p.name} title={p.title} />);
  });
  return <div className={classes.Products}>{products}</div>;
};
export default Products;
