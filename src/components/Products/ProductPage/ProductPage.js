import axios from "axios";
import React, { useState, useEffect } from "react";
import TableItem from "../../Table/TableItems/TableItem/TableItem";
import Loader from "../../UI/Loader/Loader";
import classes from "./ProductPage.module.css";
const ProductPage = (props) => {
  const [stateProdutos, setStateProdutos] = useState();
  let product = { ...props.location.query };
  if (!product.id) {
    let tempProduct = localStorage.getItem("product");
    product = JSON.parse(tempProduct);
  } else {
    localStorage.setItem("product", JSON.stringify(product));
  }
  let colors = [];
  if (product.product_colors.length > 0) {
    product.product_colors.map((color) => {
      let c = (
        <div
          key={color.hex_value}
          className={classes.Color}
          style={{ backgroundColor: color.hex_value }}
        ></div>
      );
      return colors.push(c);
    });
  }
  useEffect(() => {
    axios
      .get(
        "http://makeup-api.herokuapp.com/api/v1/products.json?brand=" +
          product.brand
      )
      .then((response) => {
        const tempArray = [];
        response.data.map((product) => {
          return tempArray.push(product);
        });
        setStateProdutos(tempArray);
      });
  }, [product.brand]);
  let similar = [];

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  if (stateProdutos && stateProdutos.length > 0) {
    for (let i = 0; i < 3; i++) {
      let x = randomInteger(0, stateProdutos.length - 1);
      if (stateProdutos[x].id !== product.id) {
        similar.push(stateProdutos[x]);
      }
    }
  }

  let related = <Loader />;
  const uniqueObjects = [
    ...new Map(similar.map((item) => [item.id, item])).values(),
  ];
  let tempArray = [];
  if (stateProdutos) {
    related = tempArray;
    // eslint-disable-next-line
    uniqueObjects.map((s) => {
      tempArray.push(<TableItem key={s.id} {...s}></TableItem>);
    });
    related = (
      <div>
        <div className={classes.ProductPage}>
          <img src={product.image_link} alt=" not available" />
          <div className={classes.Content}>
            <h1 className={classes.ProductName}>{product.name}</h1>
            <h2 className={classes.ProductBrand}> {product.brand}</h2>
            <p className={classes.ProductDesccription}>{product.description}</p>
            <h2 className={classes.ProductPrice}>
              {(+product.price).toFixed(2)}
              {product.price_sign ? product.price_sign : "€"}
            </h2>
            <div className={classes.ProductColors}>{colors}</div>
          </div>
        </div>
        <h3 style={{ textAlign: "center" }}>Related Products</h3>
        <div className={classes.Related}>
          <div className={classes.RelatedProducts}>{tempArray}</div>
        </div>
      </div>
    );
  }
  return related;
};
export default ProductPage;
