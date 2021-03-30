import React, { useState, useEffect } from "react";
import Loader from "../../UI/Loader/Loader";
import axios from "axios";
import classes from "./TableItems.module.css";
import TableItem from "./TableItem/TableItem";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Toolbar from "../../UI/Toolbar/Toolbar";
import Modal from "../../UI/Modal/Modal";
import ProductDisplay from "../../Products/ProductPage/ProductDisplay/ProductDisplay";
let sorted = false;
const TableItems = (props) => {
  const [stateProdutos, setStateProdutos] = useState();
  const [statePage, setStatePage] = useState();
  const [stateFilterArray, setStateFilterArray] = useState();
  const [stateActiveFilter, setStateActiveFilter] = useState([]);
  const [stateLayout, setStateLayout] = useState(false);
  const [stateModal, setStateModal] = useState(false);
  const [stateActiveProduct, setStateActiveProduct] = useState();

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
      const product = props.product.substring(1);
      axios
        .get(
          "http://makeup-api.herokuapp.com/api/v1/products.json?product_type=" +
            product
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
    } else {
      axios
        .get(
          "http://makeup-api.herokuapp.com/api/v1/products.json?rating_greater_than=4.9"
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

  //table Management

  if (stateProdutos && stateActiveFilter.length === 0) {
    table = stateProdutos.map((r) => (
      <TableItem
        layout={stateLayout}
        key={r.id}
        {...r}
        clicked={() => modalOpenHandler(r.id)}
      />
    ));
  } else if (stateProdutos && stateActiveFilter.length > 0) {
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
    table = uniqueObjects.map((r) => (
      <TableItem
        key={r.id}
        {...r}
        layout={stateLayout}
        clicked={modalOpenHandler}
      />
    ));
  }

  let title = <h1 className={classes.PageTitle}>Destaques</h1>;
  if (props.brand) {
    let tempTitle = props.brand.slice(1);
    tempTitle = tempTitle.split(" ");
    tempTitle = tempTitle.map((t) => {
      return t.charAt(0).toUpperCase() + t.slice(1);
    });
    tempTitle = tempTitle.join(" ");
    title = <h1 className={classes.PageTitle}>{tempTitle}</h1>;
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
    }
  }
  if (table.length && statePage === 1) {
    table = table.slice(0, 12);
  } else if (table.length && statePage > 1) {
    table = table.slice(12 * statePage - 12, 12 * statePage);
  }
  function nextPageHandler() {
    let x = statePage + 1;
    document.documentElement.scrollTop = 0;
    setStatePage(x);
  }
  function beforePageHandler() {
    let x = statePage - 1;
    document.documentElement.scrollTop = 0;
    setStatePage(x);
  }
  function changeLayoutHandler() {
    let x = !stateLayout;
    setStateLayout(x);
  }
  function modalOpenHandler(id) {
    const tempProduct = stateProdutos.find((p) => p.id === id);
    let activeProduct = tempProduct;
    setStateActiveProduct(activeProduct);
    setStateModal(true);
  }
  function modalCloseHandler() {
    setStateModal(false);
  }
  return (
    <Auxiliary>
      {stateModal ? (
        <Modal show={stateModal} modalClosed={modalCloseHandler}>
          <ProductDisplay product={stateActiveProduct} />
        </Modal>
      ) : null}

      {title}
      <div className={classes.Main}>
        {toolbar}
        <div>
          {stateProdutos ? (
            <div className={classes.LayoutControls}>
              <button onClick={changeLayoutHandler}>Change Layout</button>
              <button onClick={sortRatingHandler}>Sort by Rating</button>
            </div>
          ) : null}
          <div className={stateLayout ? classes.TableList : classes.TableItems}>
            {table}
          </div>
        </div>
      </div>
      {stateProdutos ? (
        <div className={classes.Controls}>
          <button disabled={statePage === 1} onClick={beforePageHandler}>
            Diminuir
          </button>
          <div>{statePage}</div>
          <button disabled={table.length < 12} onClick={nextPageHandler}>
            Aumentar
          </button>
        </div>
      ) : null}
    </Auxiliary>
  );
};

export default TableItems;
