import React from "react";

const ToolbarItem = (props) => {
  return (
    <div>
      <input
        type="checkbox"
        id={props.index}
        onChange={props.changed}
        value={props.filter}
      />
      <label htmlFor={props.index}>{props.filter}</label>
    </div>
  );
};
export default ToolbarItem;
