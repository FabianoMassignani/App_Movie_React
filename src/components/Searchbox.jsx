import React, { useState } from "react";
import "./Searchbox.scss";
import { useDispatch } from "react-redux";

import { searchMovies } from "../store/actions/movieActions";
import { searchSerials } from "../store/actions/serialActions";

export const Searchbox = (props) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query !== "") {
      if (props.movies) {
        dispatch(searchMovies(query));
      } else if (props.serials) {
        dispatch(searchSerials(query));
      }
      setQuery("");
    }
  };

  return (
    <div className="search-box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={
            props.movies
              ? "Search movies..."
              : props.serials
              ? "Search serials..."
              : "Search actors..."
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
};
