import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Image } from "antd";

import { Spinner } from "../../components/Spinner";

import { IMG_API_LOW } from "../../globalVariables";
import { getMovies } from "../../store/actions/movie";
import { Navbar } from "../../components/Navbar";

export const MovieList = () => {
  const dispatch = useDispatch();

  const Filters = useSelector((state) => state.filters);
  const movieList = useSelector((state) => state.movieList);
  const { filters, ordem, page } = Filters;
  const { loading, movies, query, results, pages } = movieList;

  useEffect(() => {
    dispatch(getMovies(page, filters, ordem));
  }, [dispatch, page, filters]);

  return (
    <Navbar
      total={pages}
      currentPage={page}
      children={
        <>
          {loading ? (
            <Spinner />
          ) : results !== 0 ? (
            <div className="list-container">
              {movies.map(
                (movie, index) =>
                  movie.poster_path && (
                    <div className="card" key={index}>
                      <Link to={`/movie/${movie.id}`}>
                        <Image
                          placeholder={
                            <Image
                              preview={false}
                              src={IMG_API_LOW + movie.poster_path}
                            />
                          }
                          preview={false}
                          src={IMG_API_LOW + movie.poster_path}
                        />
                        <h3>{movie.title}</h3>
                        <p>
                          <span>{movie.vote_average} | </span>
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
          ) : (
            <h2 className="py-2 text-center">No Movies Found</h2>
          )}
        </>
      }
    />
  );
};
