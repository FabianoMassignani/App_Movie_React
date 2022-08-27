import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import {
  setOrdem,
  setFilters,
  getGenre,
  setNavigate,
} from "../store/actions/filters";
import "./MenuFilters.scss";

export const MenuFilters = (props) => {
  const dispatch = useDispatch();
  const Filters = useSelector((state) => state.filters);
  const { filters, genres, optionNavigate } = Filters;

  let navigate = useNavigate();

  let ReleaseDates = [];
  let Scores = [];
  let currentTime = new Date();

  const navigates = [
    {
      value: "/",
      label: "Home",
    },
    {
      value: "/movies",
      label: "Movies",
    },
    {
      value: "/serials",
      label: "Tv shows",
    },    {
      value: "/login",
      label: "login track",
    },    {
      value: "/history",
      label: "history",
    },
  ];

  const ordems = [
    {
      value: "popular",
      label: "Popular",
    },
    {
      value: "top_rated",
      label: "Top rated",
    },
    {
      value: "upcoming",
      label: "Up coming",
    },
    {
      value: "now_playing",
      label: "Now playing",
    },
  ];

  const Sort = [
    {
      value: "popularity.asc",
      label: "Popularity Ascending",
    },
    {
      value: "popularity.desc",
      label: "Popularity Descending",
    },
    {
      value: "vote_average.asc",
      label: "Rating  Ascending",
    },
    {
      value: "vote_average.desc",
      label: "Rating  Descending",
    },
    {
      value: "vote_count.asc",
      label: "Vote  Ascending",
    },
    {
      value: "vote_count.desc",
      label: "Vote  Descending",
    },
    {
      value: "release_date.asc",
      label: "Release Date Ascending",
    },
    {
      value: "release_date.desc",
      label: "Release Date Descending",
    },
  ];

  const votes = [
    {
      label: "Maior 100",
      value: "100",
    },
    {
      label: "Maior 200",
      value: "200",
    },
    {
      label: "Maior 300",
      value: "300",
    },
    {
      label: "Maior 400",
      value: "400",
    },
    {
      label: "Maior 500",
      value: "500",
    },
  ];

  for (var i = 0; i < 10; i++) {
    Scores[i] = {
      label: "Maior " + i,
      value: i,
    };
  }

  for (var i = 0; i <= currentTime.getFullYear() - 1900; i++) {
    ReleaseDates[i] = {
      label: i + 1900,
      value: new Date(i + 1900, 1, 1).toISOString().slice(0, 10),
    };

    ReleaseDates.reverse();
  }

  const onChangeOrdem = (e) => {
    dispatch(setOrdem(e));
  };

  const onChangeNavigate = (to) => {
    dispatch(setNavigate(to));
    navigate(to, { replace: true });
  };

  const onChangeFilters = (e) => {
    dispatch(setFilters(e));
  };

  useEffect(() => {
    dispatch(getGenre());
  }, [dispatch]);

  return (
    <>
      <div className="Filters">
        {/* <div className="Select">
          <Select
            style={{
              width: 150,
            }}
            value={optionNavigate}
            options={navigates}
            onChange={(e) => onChangeNavigate(e)}
          />
        </div> */}

        <div className="Select">
          <Select
            style={{
              width: 150,
            }}
            allowClear
            placeholder={"Tipo By"}
            defaultValue={"popular"}
            value={filters.ordem}
            options={ordems}
            onChange={(e) => onChangeOrdem(e)}
          />
        </div>
        <div className="Select">
          <Select
            style={{
              width: 150,
            }}
            allowClear
            placeholder={"Genres"}
            value={filters.genre}
            options={genres}
            onChange={(e) => onChangeFilters({ ...filters, genre: e })}
          />
        </div>
        <div className="Select">
          <Select
            style={{
              width: 150,
            }}
            allowClear
            placeholder={"Sort By"}
            value={filters.sort}
            options={Sort}
            onChange={(e) => onChangeFilters({ ...filters, sort: e })}
          />
        </div>

        <div className="Select">
          <Select
            style={{
              width: 150,
            }}
            allowClear
            placeholder={"Release Descending"}
            value={filters.releaseDateGte}
            options={ReleaseDates}
            onChange={(e) => onChangeFilters({ ...filters, releaseDateGte: e })}
          />
        </div>

        <div className="Select">
          <Select
            style={{
              width: 150,
            }}
            allowClear
            placeholder={"Release Ascending "}
            value={filters.releaseDateLte}
            options={ReleaseDates}
            onChange={(e) => onChangeFilters({ ...filters, releaseDateLte: e })}
          />
        </div>

        <div className="Select">
          <Select
            style={{
              width: 150,
            }}
            allowClear
            placeholder={"User Score"}
            value={filters.score}
            options={Scores}
            onChange={(e) => onChangeFilters({ ...filters, score: e })}
          />
        </div>
        <div className="Select">
          <Select
            style={{
              width: 150,
            }}
            allowClear
            placeholder={" Minimum User Votes"}
            value={filters.vote}
            options={votes}
            onChange={(e) => onChangeFilters({ ...filters, vote: e })}
          />
        </div>
      </div>
    </>
  );
};
