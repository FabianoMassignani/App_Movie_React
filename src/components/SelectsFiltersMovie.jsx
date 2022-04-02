import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import {
  setOrdem,
  setSort,
  getGenre,
  setGenre,
  setVote,
  setScore,
  setDate,
} from "../store/actions/MovieFilters";
import "./SelectsFilters.scss";

export const SelectsFiltersMovie = (props) => {
  const dispatch = useDispatch();
  const MovieFilters = useSelector((state) => state.movieFilters);
  const { filters, genres } = MovieFilters;
  const { ordem } = filters;

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
    props.setPage(1);
  };

  const onChangeSort = (e) => {
    dispatch(setSort(e));
    props.setPage(1);
  };

  const onChangeGenre = (e) => {
    dispatch(setGenre(e));
    props.setPage(1);
  };

  const onChangeScore = (e) => {
    dispatch(setScore(e));
    props.setPage(1);
  };

  const onChangeVote = (e) => {
    dispatch(setVote(e));
    props.setPage(1);
  };

  const onChangeDate = (e) => {
    dispatch(setDate(e));
    props.setPage(1);
  };

  useEffect(() => {
    dispatch(getGenre());
  }, [dispatch]);

  return (
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
          onChange={(e) => onChangeSort(e)}
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
          onChange={(e) => onChangeGenre(e)}
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
          onChange={(e) => onChangeDate(e)}
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
          onChange={(e) => onChangeScore(e)}
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
          onChange={(e) => onChangeVote(e)}
        />
      </div>
    </div>
  );
};
