import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.scss";

export const Navbar = ({ title = "MovieApp", icon = "fas fa-video" }) => {
  const trakt = useSelector((state) => state.traktUser);
  const { loading } = trakt;

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
            <Link to="/favorites">Favorites</Link>
          </li>
          <li>
            <Link to="/serials">TV Shows</Link>
          </li>
          {trakt ? (
            <li>
              <Link to="/trakt">Login</Link>
            </li>
          ) : (
            <li>
              <Link to="/trakt">Logout</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
