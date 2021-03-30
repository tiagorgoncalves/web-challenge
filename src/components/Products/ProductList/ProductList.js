import React from "react";
import TableItems from "../../Table/TableItems/TableItems";

const ProductList = (props) => {
  return (
    <div>
      <TableItems product={props.history.location.hash} />
    </div>
  );
};

export default ProductList;
