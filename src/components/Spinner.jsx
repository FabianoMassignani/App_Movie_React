import React from "react";
import spinner from "../assets/spinner.gif";

export const Spinner = () => (
  <img
    src={spinner}
    alt="Loading..."
    style={{
      width: "180px",
      margin: "auto",
      paddingTop: "6rem",
      display: "block",
    }}
  />
);
