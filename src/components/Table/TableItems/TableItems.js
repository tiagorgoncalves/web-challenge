import React, { useState, useEffect } from "react";
import Loader from "../../UI/Loader/Loader";
import axios from "axios";
import classes from "./TableItems.module.css";
import TableItem from "../TableItem/TableItem";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";

const TableItems = (props) => {
  const [stateProdutos, setStateProdutos] = useState();
  const [statePage, setStatePage] = useState();

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
        setStatePage(1);
      });
  }, []);
  let table = <Loader />;
  if (stateProdutos) {
    table = stateProdutos.map((r) => <TableItem key={r.id} {...r} />);
  }
  if (table && statePage === 1) {
    table = table.slice(0, 10);
  } else if (table && statePage > 1) {
    table = table.slice(statePage, statePage + 10);
  }
  function nextPageHandler() {
    let x = statePage + 1;
    setStatePage(x);
  }
  function beforePageHandler() {
    let x = statePage - 1;
    setStatePage(x);
  }
  return (
    <Auxiliary>
      <div className={classes.TableItems}>{table}</div>
      {statePage}
      <button disabled={statePage === 1} onClick={beforePageHandler}>
        Diminuir
      </button>
      <button disabled={table.length < 10} onClick={nextPageHandler}>
        Aumentar
      </button>
    </Auxiliary>
  );
};

export default TableItems;
