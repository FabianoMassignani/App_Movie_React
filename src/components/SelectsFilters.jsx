import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import { setOrdem, setFilters, getGenre } from "../store/actions/filters";
import "./SelectsFilters.scss";

export const SelectsFilters = (props) => {
  const dispatch = useDispatch();
  const Filters = useSelector((state) => state.filters);
  const { filters, genres } = Filters;

  let ReleaseDates = [];
  let Scores = [];
  let currentTime = new Date();

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

  for (var i = 0; i < currentTime.getFullYear() - 1900; i++) {
    ReleaseDates[i] = {
      label: i + 1900,
      value: new Date(i + 1900, 1, 1).toISOString().slice(0, 10),
    };
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "blue" : "black",
      backgroundColor: "white",
      fontSize: 14,
    }),
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    singleValue: (styles, { data }) => ({ ...styles, fontSize: 14 }),
  };

  const onChangeOrdem = (e) => {
    dispatch(setOrdem(e));
  };

  const onChangeFilters = (e) => {
    dispatch(setFilters(e));
  };

  useEffect(() => {
    dispatch(getGenre());
  }, [dispatch]);

  return (
    <>
      {props.showFilter ? (
        <div className="Filters">
          <div className="Select">
            Tipo By
            <Select
              styles={customStyles}
              width="300px"
              isSearchable={false}
              value={filters.ordem}
              options={ordems}
              onChange={(e) => onChangeOrdem(e)}
            />
          </div>

          <div className="Select">
            Sort By
            <Select
              styles={customStyles}
              width="300px"
              isSearchable={false}
              value={filters.sort}
              options={Sort}
              onChange={(e) => onChangeFilters({ ...filters, sort: e })}
            />
          </div>

          <div className="Select">
            Genres
            <Select
              styles={customStyles}
              width="300px"
              isSearchable={false}
              value={filters.genre}
              options={genres}
              onChange={(e) => onChangeFilters({ ...filters, genre: e })}
            />
          </div>
          <div className="Select">
            Release Dates
            <Select
              styles={customStyles}
              width="300px"
              isSearchable={false}
              value={filters.releaseDate}
              options={ReleaseDates}
              onChange={(e) => onChangeFilters({ ...filters, releaseDate: e })}
            />
          </div>
          <div className="Select">
            User Score
            <Select
              styles={customStyles}
              width="300px"
              isSearchable={false}
              value={filters.score}
              options={Scores}
              onChange={(e) => onChangeFilters({ ...filters, score: e })}
            />
          </div>
          <div className="Select">
            Minimum User Votes
            <Select
              styles={customStyles}
              width="300px"
              isSearchable={false}
              value={filters.vote}
              options={votes}
              onChange={(e) => onChangeFilters({ ...filters, vote: e })}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
