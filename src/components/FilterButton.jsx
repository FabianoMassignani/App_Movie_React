import React from "react";
import filter from "../assets/filter.png";

export const FilterButton = (props) => (
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
        src={filter}
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
