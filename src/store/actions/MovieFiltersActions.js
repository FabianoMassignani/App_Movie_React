import axios from "axios";
import {
  SET_TIPOS,
  SET_ORDEM,
  SET_SORT,
  GET_GENRES,
  SET_GENRE,
  SET_VOTE,
  SET_SCORE,
  SET_RELEASE_DATE,
  RESET_FILTERS,
} from "../constants/MovieFilters";

import { RESET_MOVIES } from "../constants/movie";

// Set Tipos
export const setTipos = (tipo) => async (dispatch) => {
  dispatch({ type: RESET_MOVIES });
  dispatch({ type: RESET_FILTERS });
  dispatch({
    type: SET_TIPOS,
    payload: { tipo: tipo },
  });
};

// Set Ordem
export const setOrdem = (ordem) => async (dispatch) => {
  dispatch({ type: RESET_MOVIES });
  dispatch({ type: RESET_FILTERS });
  dispatch({
    type: SET_ORDEM,
    payload: { ordem: ordem },
  });
};

// Set Sort
export const setSort = (sort) => async (dispatch) => {
  dispatch({ type: RESET_MOVIES });
  dispatch({
    type: SET_SORT,
    payload: { sort: sort },
  });
};

// get Genres
export const getGenre = () => async (dispatch) => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=e033694029aca8ecc22a82a3b615a643&language=en-US"
  );
  if (res.data.genres) {
    const genres = res.data.genres.map((item, index) => ({
      label: item.name,
      value: item.id,
    }));

    dispatch({
      type: GET_GENRES,
      payload: { genres: genres },
    });
  }
};

// Set Genre
export const setGenre = (genre) => async (dispatch) => {
  dispatch({ type: RESET_MOVIES });
  dispatch({
    type: SET_GENRE,
    payload: { genre: genre },
  });
};

// Set Vote
export const setVote = (vote) => async (dispatch) => {
  dispatch({ type: RESET_MOVIES });
  dispatch({
    type: SET_VOTE,
    payload: { vote: vote },
  });
};

// Set score
export const setScore = (score) => async (dispatch) => {
  dispatch({ type: RESET_MOVIES });
  dispatch({
    type: SET_SCORE,
    payload: { score: score },
  });
};

// Set Date
export const setDate = (date) => async (dispatch) => {
  dispatch({ type: RESET_MOVIES });
  dispatch({
    type: SET_RELEASE_DATE,
    payload: { releaseDate: date },
  });
};
