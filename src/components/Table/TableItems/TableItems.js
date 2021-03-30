import React, { useState, useEffect } from "react";
import Loader from "../../UI/Loader/Loader";
import axios from "axios";
import classes from "./TableItems.module.css";
import TableItem from "./TableItem/TableItem";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Toolbar from "../../UI/Toolbar/Toolbar";

let sorted = false;
const TableItems = (props) => {
  const [stateProdutos, setStateProdutos] = useState();
  const [statePage, setStatePage] = useState();
  const [stateFilterArray, setStateFilterArray] = useState();
  const [stateActiveFilter, setStateActiveFilter] = useState([]);
  const [stateLayout, setStateLayout] = useState(false);

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

  //Toolbar
  let toolbar = null;

  function checkedFilterHandler(event) {
    let tempActiveFilter = [];
    if (stateActiveFilter.length > 0) {
      let activeFilter = stateActiveFilter;
      tempActiveFilter = [...activeFilter];
    }
    if (event.target.checked) {
      tempActiveFilter.push(event.target.defaultValue);
    } else if (!event.target.checked) {
      let temp = [];
      temp = tempActiveFilter.filter((f) => f !== event.target.defaultValue);
      tempActiveFilter = temp;
    }
    console.log(tempActiveFilter);
    setStateActiveFilter(tempActiveFilter);
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
  //
  let table = <Loader />;

  function nextPageHandler() {
    let x = statePage + 1;
    setStatePage(x);
  }
  function beforePageHandler() {
    let x = statePage - 1;
    setStatePage(x);
  }
  function changeLayoutHandler() {
    let x = !stateLayout;
    setStateLayout(x);
  }
  //table Management
  useEffect(() => {
    console.log("value changed");
  }, [stateActiveFilter]);

  if (stateProdutos && stateActiveFilter.length === 0) {
    table = stateProdutos.map((r) => (
      <TableItem layout={stateLayout} key={r.id} {...r} />
    ));
  } else if (stateProdutos && stateActiveFilter.length > 0) {
    console.log("aaas");
    let filteredArray = [];
    stateProdutos.map((p) => {
      // eslint-disable-next-line
      return stateActiveFilter.map((f) => {
        if (p.tag_list.includes(f)) {
          return filteredArray.push(p);
        }
      });
    });
    const uniqueObjects = [
      ...new Map(filteredArray.map((item) => [item.id, item])).values(),
    ];
    console.log(uniqueObjects);
    table = uniqueObjects.map((r) => (
      <TableItem key={r.id} {...r} layout={stateLayout} />
    ));
  }
  //
  function sortRatingHandler() {
    if (!sorted) {
      const t = [...stateProdutos];
      let tempTable = t.sort((a, b) => (a.rating < b.rating ? 1 : -1));
      setStateProdutos(tempTable);
      sorted = true;
    } else {
      const t = [...stateProdutos];
      setStateProdutos(t.reverse());
      console.log(t);
    }
  }
  if (table.length > 0 && statePage === 1) {
    table = table.slice(0, 8);
  } else if (table.length > 0 && statePage > 1) {
    table = table.slice(statePage, statePage + 8);
  }
  return (
    <Auxiliary>
      <div className={classes.Main}>
        {toolbar}
        <div>
          <button onClick={changeLayoutHandler}>Change Layout</button>
          <button onClick={sortRatingHandler}>Sort by Rating</button>
          <div className={stateLayout ? classes.TableList : classes.TableItems}>
            {table}
          </div>
          <div className={classes.Controls}>
            <button disabled={statePage === 1} onClick={beforePageHandler}>
              Diminuir
            </button>
            <div>{statePage}</div>
            <button disabled={table.length < 8} onClick={nextPageHandler}>
              Aumentar
            </button>
          </div>
        </div>
      </div>
    </Auxiliary>
  );
};

export default TableItems;
