import React from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import TableItems from "./TableItems/TableItems";

const Table = (props) => {
  return (
    <Auxiliary>
      <div>header</div>
      <TableItems />
    </Auxiliary>
  );
};

export default Table;
