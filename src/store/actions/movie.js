import axios from "axios";
import {
  GET_MOVIES,
  GET_MOVIES_REQUEST,
  SEARCH_MOVIES,
  GET_MOVIE_REQUEST,
  GET_MOVIE,
  GET_SIMILAR_MOVIES_REQUEST,
  GET_SIMILAR_MOVIES,
  GET_MOVIES_TRAKT,
  GET_MOVIES_TRAKT_REQUEST,
  ADD_MOVIES_TRAKT,
  ADD_MOVIES_TRAKT_REQUEST,
} from "../constants/movie";

import { SET_ORDEM } from "../constants/filters";

import { CLIENT_ID, TRAKT_USERNAME } from "../../globalVariables";
import { getTorrentMovie } from "./torrent";
import { getSubtitle } from "./subtitles";
import { API_KEY, LANGUAGE, API_URL } from "../../globalVariables";

// Get Movies
export const getMovies = (page, filters, ordem) => async (dispatch) => {
  dispatch({ type: GET_MOVIES_REQUEST });

  let res;

  if (
    !filters.genre &&
    !filters.sort &&
    !filters.vote &&
    !filters.releaseDateGte &&
    !filters.releaseDateLte &&
    !filters.score
  ) {
    res = await axios.get(
      `${API_URL}/movie/${ordem}?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`
    );
  } else {
    let requestString = "";

    requestString += filters.genre ? "&with_genres=" + filters.genre : "";
    requestString += filters.sort ? "&sort_by=" + filters.sort : "";
    requestString += filters.vote ? "&vote_count.gte=" + filters.vote : "";
    requestString += filters.releaseDateLte
      ? "&release_date.lte=" + filters.releaseDateLte
      : "";
    requestString += filters.releaseDateGte
      ? "&release_date.gte=" + filters.releaseDateGte
      : "";
    requestString += filters.score ? "&vote_average.gte=" + filters.score : "";

    res = await axios.get(
      `${API_URL}/discover/movie?api_key=${API_KEY}${requestString}&language=${LANGUAGE}&page=${page}`
    );
  }

  dispatch({
    type: GET_MOVIES,
    payload: {
      movies: res.data.results,
      pages: res.data.total_pages,
      results: res.data.total_results,
    },
  });
};

// Get Single Movie
export const getMovie =
  (id, setMovieDataPT, setMovieDataUS) => async (dispatch) => {
    dispatch({ type: GET_MOVIE_REQUEST });

    const res = await axios.get(
      `${API_URL}/movie/${id}?api_key=${API_KEY}&language=${LANGUAGE}`
    );

    dispatch({
      type: GET_MOVIE,
      payload: res.data,
    });

    const resPT = await axios.get(
      `${API_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`
    );

    setMovieDataUS(res.data);
    setMovieDataPT(resPT.data);
  };

// Get Similar Movies
export const getSimilarMovies = (id) => async (dispatch) => {
  dispatch({ type: GET_SIMILAR_MOVIES_REQUEST });

  const res = await axios.get(
    `${API_URL}/movie/${id}/similar?api_key=${API_KEY}&language=${LANGUAGE}&page=1`
  );

  dispatch({
    type: GET_SIMILAR_MOVIES,
    payload: res.data,
  });
};

// Search Movies
export const searchMovies = (query) => async (dispatch) => {
  dispatch({ type: GET_MOVIES_REQUEST });

  const res = await axios.get(
    `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=1`
  );

  dispatch({
    type: SEARCH_MOVIES,
    payload: {
      movies: res.data.results,
      pages: res.data.total_pages,
      results: res.data.total_results,
      query: query,
    },
  });
};

// Get History Trakt
export const getMoviesHistory = () => async (dispatch) => {
  let moviesTrakt = [];
  dispatch({ type: GET_MOVIES_TRAKT_REQUEST });

  let res = await axios.get(
    `https://api.trakt.tv/users/${TRAKT_USERNAME}/history/movies?extended=metadata&page=1&limit=20`,
    {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-key": CLIENT_ID,
        "trakt-api-version": "2",
      },
    }
  );

  for (let i in res.data) {
    let resTmdb = await axios.get(
      `${API_URL}/movie/${res.data[i].movie.ids.tmdb}?api_key=${API_KEY}&language=${LANGUAGE}`
    );

    moviesTrakt.push(resTmdb.data);
  }

  dispatch({
    type: GET_MOVIES_TRAKT,
    payload: {
      pagesTrakt: parseInt(res.headers["x-pagination-page-count"]),
      resultsTrakt: parseInt(res.headers["x-pagination-item-count"]),
      moviesTrakt: moviesTrakt,
    },
  });
};

// Get History Trakt
export const addMoviesHistory = (page) => async (dispatch) => {
  dispatch({ type: ADD_MOVIES_TRAKT_REQUEST });
  let resTrakt = await axios.get(
    `https://api.trakt.tv/users/${TRAKT_USERNAME}/history/movies?extended=metadata&page=${page}&limit=20`,
    {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-key": CLIENT_ID,
        "trakt-api-version": "2",
      },
    }
  );

  for (let i in resTrakt.data) {
    let resTmdb = await axios.get(
      `${API_URL}/movie/${resTrakt.data[i].movie.ids.tmdb}?api_key=${API_KEY}&language=${LANGUAGE}`
    );

    dispatch({
      type: ADD_MOVIES_TRAKT,
      payload: [resTmdb.data],
    });
  }
};

// Checkin Trakt
export const checkinTrakt = (data) => async (dispatch) => {
  axios
    .post(
      "https://api.trakt.tv/checkin",
      {
        movie: data,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 822e7f6f9938e9f0210d794645e6c05ef0f9240554caa6936304429a8133a2bd",
          "trakt-api-version": "2",
          "trakt-api-key": CLIENT_ID,
        },
      }
    )
    .then((response) => {
      console.log(response); // 10
    })
    .catch((error) => {
      console.log(error); // 10
    });
};
