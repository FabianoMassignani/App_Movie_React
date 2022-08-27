import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Layout, Menu } from "antd";
import Moment from "react-moment";
import { Searchbox } from "../components/Searchbox";
import { Spinner } from "../components/Spinner";
import { Navbar } from "../components/Navbar";
import { InfiniteScrolling } from "../components/InfiniteScrolling";
import { IMG_API_LOW } from "../globalVariables";
import { MenuFilters } from "../components/MenuFilters";
import { getMovies, addMovies } from "../store/actions/movie";
import { shutdown } from "../store/actions/torrent";

export const Home = () => {
  const dispatch = useDispatch();

  return <Navbar noPagination={true} />;
};
