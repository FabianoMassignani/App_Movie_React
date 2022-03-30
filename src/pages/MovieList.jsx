import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { Searchbox } from "../components/Searchbox";
import { Spinner } from "../components/Spinner";
import { Navbar } from "../components/Navbar";
import { InfiniteScrolling } from "../components/InfiniteScrolling";
import { IMG_API_LOW } from "../globalVariables";
import { SelectsFiltersMovie } from "../components/SelectsFiltersMovie";
import { getMovies } from "../store/actions/movieActions";
import { stopTorrent } from "../store/actions/torrentActions";
import { resetStateSubtitles } from "../store/actions/subtitlesActions";

export const MovieList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [dataLength, setDataLength] = useState(30);
  const [hasMore, setHasMore] = useState(true);
  const MovieFilters = useSelector((state) => state.movieFilters);
  const movieList = useSelector((state) => state.movieList);
  const { filters } = MovieFilters;
  const { loading, movies, query, results, pages } = movieList;

  useEffect(() => {
    if (!movies.length > 0) dispatch(getMovies(page, filters));
    dispatch(stopTorrent());
  }, [dispatch, filters]);

  const fetchNextPage = () => {
    if (!query) {
      dispatch(getMovies(page, filters));
      setPage(page + 1);
      setDataLength(dataLength + 30);
      if (page === pages) {
        setHasMore(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Searchbox movies />

      <SelectsFiltersMovie page={page} setPage={setPage} />
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
              (movie) =>
                movie.poster_path && (
                  <div className="card" key={movie.id}>
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
    </>
  );
};
