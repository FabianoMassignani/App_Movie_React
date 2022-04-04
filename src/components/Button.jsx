import React from "react";
import downIcon from "../assets/down.png";
import upIcon from "../assets/up.png";

export const Button = (props) => (
  <div style={{ padding: "1.5rem 1rem 0.75rem" }}>
    <button
      style={{
        padding: "0",
        border: "none",
        background: "none",
      }}
    >
      <img
        onClick={props.handleFilter}
        src={props.showFilter ? upIcon : downIcon}
        alt="Loading..."
        style={{
          width: "35px",
          margin: "auto",
          display: "block",
        }}
      />
    </button>
  </div>
);
