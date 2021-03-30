import React from "react";
import classes from "./Toolbar.module.css";
import ToolbarItem from "./ToolbarItem/ToolbarItem";

const Toolbar = (props) => {
  let toolbarItems = [];
  let tempArray = props.items[0];
  if (tempArray.length === 0) {
    toolbarItems = <p>no tags available</p>;
  } else {
    tempArray.map((i, index) => {
      return toolbarItems.push(
        <ToolbarItem
          key={index}
          index={index + i}
          filter={i}
          changed={props.changed}
        />
      );
    });
  }

  return (
    <div key={props.index} className={classes.Toolbar}>
      <h3>Tag Filters</h3>
      {toolbarItems}
    </div>
  );
};
export default Toolbar;
