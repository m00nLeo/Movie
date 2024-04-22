import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const NotFound = () => {
  const [message, setMessage] = useState("");
  const notFoundMessage = async () => {
    const response = await fetch(`http://localhost:5000/notfound404`);

    const data = await response.json();
    setMessage(data?.message);
  };

  useEffect(() => {
    notFoundMessage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        {message} !! Please back to{" "}
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
