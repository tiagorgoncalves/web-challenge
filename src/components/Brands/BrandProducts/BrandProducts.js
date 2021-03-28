import React from "react";
import TableItems from "../../Table/TableItems/TableItems";

const BrandProducts = (props) => {
  return (
    <div>
      <TableItems brand={props.history.location.hash} />
    </div>
  );
};

export default BrandProducts;
