import React from "react";
import classes from "./Loader.module.css";

const Loader = (props) => {
  return (
    <div className={classes.middleLoader}>
      <div className={classes.Loader}>Loading...</div>
    </div>
  );
};
export default Loader;
