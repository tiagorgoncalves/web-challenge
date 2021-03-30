import React, { Component } from "react";

import classes from "./Modal.module.css";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  render() {
    return (
      <Auxiliary>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className={classes.Modal}>{this.props.children}</div>
      </Auxiliary>
    );
  }
}

export default Modal;
