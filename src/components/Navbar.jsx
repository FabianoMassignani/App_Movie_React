import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.scss";

export const Navbar = ({ title = "MovieApp", icon = "fas fa-video" }) => {
  const Trakt = useSelector((state) => state.TraktAuth);
  const { logged } = Trakt;

  return (
    <nav>
      <div className="nav-container">
        <h1>
          <Link to="/">
            <i className={icon} /> {title}
          </Link>
        </h1>
        <ul>
          <li>
            <Link to="/">Movies</Link>
          </li>
          <li>
            <Link to="/serials">TV Shows</Link>
          </li>
          {logged ? (
            <ul>
              <li>
                <Link to="/history">My Movies</Link>
              </li>
              <li>
                <Link to="/login">Logout</Link>
              </li>
            </ul>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
