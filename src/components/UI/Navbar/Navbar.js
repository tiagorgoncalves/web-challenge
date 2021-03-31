import React from "react";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = (props) => {
  const links = [
    {
      name: "Home",
      pathName: "/",
    },
    {
      name: "Brands",
      pathName: "/brands",
    },
    {
      name: "Products",
      pathName: "/products",
    },
  ];
  let navbarLinks = null;
  function onChangePage() {
    localStorage.removeItem("filters");
  }
  navbarLinks = links.map((link) => {
    return (navbarLinks = (
      <Link key={link.name} className={classes.NavbarLink} to={link.pathName}>
        {link.name}
      </Link>
    ));
  });
  return (
    <div className={classes.Navbar}>
      <div onClick={() => onChangePage()}>{navbarLinks}</div>
    </div>
  );
};
export default Navbar;
