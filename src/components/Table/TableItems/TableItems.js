import React, { useState, useEffect } from "react";
import Loader from "../../UI/Loader/Loader";
import axios from "axios";
import classes from "./TableItems.module.css";
import TableItem from "./TableItem/TableItem";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Toolbar from "../../UI/Toolbar/Toolbar";

const TableItems = (props) => {
  const [stateProdutos, setStateProdutos] = useState();
  const [statePage, setStatePage] = useState();
  const [stateFilterArray, setStateFilterArray] = useState();
  const [stateActiveFilter, setStateActiveFilter] = useState();

  useEffect(() => {
    if (props.brand) {
      const brand = props.brand.substring(1);
      axios
        .get(
          "http://makeup-api.herokuapp.com/api/v1/products.json?brand=" + brand
        )
        .then((response) => {
          const tempArray = [];
          const tempFilterArray = [];
          response.data.map((product) => {
            if (product.tag_list.length > 0) {
              product.tag_list.map((tag) => {
                return tempFilterArray.push(tag);
              });
            }
            return tempArray.push(product);
          });
          const uniqueSet = new Set(tempFilterArray);
          const filterArray = [...uniqueSet];
          setStateFilterArray(filterArray);
          setStatePage(1);
          setStateProdutos(tempArray);
        });
    } else if (props.product) {
    } else {
      axios
        .get(
          "http://makeup-api.herokuapp.com/api/v1/products.json?rating_greater_than=4.5"
        )
        .then((response) => {
          const tempArray = [];
          const tempFilterArray = [];
          response.data.map((product) => {
            if (product.tag_list.length > 0) {
              product.tag_list.map((tag) => {
                return tempFilterArray.push(tag);
              });
            }
            return tempArray.push(product);
          });
          const uniqueSet = new Set(tempFilterArray);
          const filterArray = [...uniqueSet];
          setStateFilterArray(filterArray);
          setStatePage(1);
          setStateProdutos(tempArray);
        });
    }
  }, [props.product, props.brand]);

  let toolbar = null;
  function checkedFilterHandler(event) {
    let tempFilter = null;
    if (stateActiveFilter) {
      tempFilter = stateActiveFilter;
    }
    if (event.target.checked) {
      tempFilter = event.target.defaultValue;
    } else if (!event.target.checked) {
      tempFilter = null;
    }
    setStateActiveFilter(tempFilter);
    setStatePage(1);
  }

  if (stateFilterArray) {
    toolbar = (
      <Toolbar
        items={[stateFilterArray]}
        changed={(event) => checkedFilterHandler(event)}
      />
    );
  }

  let table = <Loader />;
  if (stateProdutos && !stateActiveFilter) {
    table = stateProdutos.map((r) => <TableItem key={r.id} {...r} />);
  } else if (stateProdutos && stateActiveFilter) {
    let filteredArray = stateProdutos.filter((r) =>
      r.tag_list.includes(stateActiveFilter)
    );

    table = filteredArray.map((r) => <TableItem key={r.id} {...r} />);
  }

  if (table.length > 0 && statePage === 1) {
    table = table.slice(0, 8);
  } else if (table.length > 0 && statePage > 1) {
    table = table.slice(statePage, statePage + 8);
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
      <div className={classes.Main}>
        {toolbar}
        <div>
          <div className={classes.TableItems}>{table}</div>
          {statePage}
          <button disabled={statePage === 1} onClick={beforePageHandler}>
            Diminuir
          </button>
          <button disabled={table.length < 8} onClick={nextPageHandler}>
            Aumentar
          </button>
        </div>
      </div>
    </Auxiliary>
  );
};

export default TableItems;
