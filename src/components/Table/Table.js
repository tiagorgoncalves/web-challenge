import React, { useState, useEffect } from "react";
import Loader from "../UI/Loader/Loader";
import axios from "axios";

const Table = (props) => {
  const [stateProdutos, setStateProdutos] = useState();
  useEffect(() => {
    axios
      .get(
        "http://makeup-api.herokuapp.com/api/v1/products.json?product_type=blush"
      )
      .then((response) => {
        const tempArray = [];
        response.data.map((product) => {
          return tempArray.push(product);
        });
        setStateProdutos(tempArray);
      });
  }, []);

  let table = <Loader />;
  if (stateProdutos) {
    table = stateProdutos.map((r) => (
      <div key={r.id} style={{ display: "flex" }}>
        <img src={r.api_featured_image} alt="" style={{ height: "6rem" }} />
        <h5>{r.name}</h5>
        <h6 style={{ marginLeft: "1rem" }}>
          {r.price}
          {r.price_sign}
        </h6>
      </div>
    ));
  }
  return <div>{table}</div>;
};

export default Table;
