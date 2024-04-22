import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import classes from "../styles/UI/NavBar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 100) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  return (
    <div
      style={{ zIndex: 1000 }}
      className={`${classes.navbar} ${
        colorChange ? classes.navbarBlack : classes.navbarNormal
      }`}
    >
      {/* Logo */}
      <Link to="/" className={classes.link}>
        TheMovieRewind
      </Link>
      {/* Search Function */}
      <Link to="/search">
        <div className={classes.btn}>
          <FaSearch />
        </div>
      </Link>
    </div>
  );
};

export default NavBar;
