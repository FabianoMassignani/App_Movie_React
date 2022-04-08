import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { Searchbox } from "../components/Searchbox";
import { Spinner } from "../components/Spinner";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";
import { InfiniteScrolling } from "../components/InfiniteScrolling";
import { IMG_API_LOW } from "../globalVariables";
import { SelectsFilters } from "../components/SelectsFilters";
import { getMovies, addMovies } from "../store/actions/movie";

export const MovieList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(2);
  const [dataLength, setDataLength] = useState(20);
  const [hasMore, setHasMore] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const Filters = useSelector((state) => state.filters);
  const movieList = useSelector((state) => state.movieList);
  const { filters, ordem } = Filters;
  const { loading, movies, query, results, pages } = movieList;

  useEffect(() => {
    if (!movies.length > 0) dispatch(getMovies(filters, ordem));
  }, [dispatch, filters]);

  const fetchNextPage = () => {
    if (!query) {
      dispatch(addMovies(page, filters, ordem));
      setPage(page + 1);
      setDataLength(dataLength + 20);
      if (page === pages) {
        setHasMore(false);
      }
    }
  };

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <>
      <div className="container">
        <Navbar />
        <div className="menu">
          <div className="searchbox">
            <Searchbox movies />
          </div>
          <div className="filter">
            <Button handleFilter={handleFilter} showFilter={showFilter} />
          </div>
        </div>

        <SelectsFilters showFilter={showFilter} />

        {loading && !movies.length > 0 ? (
          <Spinner />
        ) : results !== 0 ? (
          <InfiniteScrolling
            dataLength={dataLength}
            next={fetchNextPage}
            hasMore={!loading && hasMore}
          >
            <div className="list-container">
              {movies.map(
                (movie, index) =>
                  movie.poster_path && (
                    <div className="card" key={index}>
                      <Link to={`/movie/${movie.id}`}>
                        <img
                          src={IMG_API_LOW + movie.poster_path}
                          alt={movie.title}
                        />
                        <h3>{movie.title}</h3>
                        <p>
                          <span>{movie.vote_average * 10}% | </span>
                          <span>
                            <Moment format="MMM D, YYYY">
                              {movie.release_date}
                            </Moment>
                          </span>
                        </p>
                      </Link>
                    </div>
                  )
              )}
            </div>
          </InfiniteScrolling>
        ) : (
          <h2 className="py-2 text-center">No Movies Found</h2>
        )}
      </div>
    </>
  );
};
