import React from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Card>
      <div
        className=""
        style={{
          color: "white",
          marginTop: "20vh",
          textAlign: "center",
          fontSize: "2rem",
        }}
      >
        Page not found !! Please back to{" "}
        <Link to="/">
          <span style={{ color: "firebrick", textDecoration: "none" }}>
            Main page
          </span>
        </Link>
      </div>
    </Card>
  );
};

export default NotFound;
