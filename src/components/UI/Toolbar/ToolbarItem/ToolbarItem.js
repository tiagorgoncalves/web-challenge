import React from "react";

const ToolbarItem = (props) => {
  return (
    <span>
      <input
        type="checkbox"
        id={props.index}
        onChange={props.changed}
        value={props.filter}
      />
      <label htmlFor={props.index}>{props.filter}</label>
    </span>
  );
};
export default ToolbarItem;
