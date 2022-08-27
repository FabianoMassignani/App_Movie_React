import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";

import { Spinner } from "../components/Spinner";

import { InfiniteScrolling } from "../components/InfiniteScrolling";
import { IMG_API_LOW } from "../globalVariables";

import { getMoviesHistory, addMoviesHistory } from "../store/actions/movie";

export const MovieHistoryList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [dataLength, setDataLength] = useState(20);
  const [hasMore, setHasMore] = useState(true);
  const movieList = useSelector((state) => state.movieList);
  const { loading, moviesTrakt, resultsTrakt, pagesTrakt } = movieList;

  useEffect(() => {
    dispatch(getMoviesHistory());
    setPage(page + 1);
  }, [dispatch]);

  const fetchNextPage = () => {
    dispatch(addMoviesHistory(page));
    setPage(page + 1);
    setDataLength(dataLength + 20);
    if (page === pagesTrakt) {
      setHasMore(false);
    }
  };

  return (
    <>
      <div className="container">
        {loading && !moviesTrakt.length > 0 ? (
          <Spinner />
        ) : resultsTrakt !== 0 ? (
          <InfiniteScrolling
            dataLength={dataLength}
            next={fetchNextPage}
            hasMore={!loading && hasMore}
          >
            <div className="list-container">
              {moviesTrakt.map(
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
