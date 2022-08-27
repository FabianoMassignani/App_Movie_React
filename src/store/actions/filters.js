import axios from "axios";
import {
  SET_PAGE,
  SET_ORDEM,
  SET_FILTERS,
  GET_GENRES,
  SET_NAVIGATE,
  RESET_FILTERS,
} from "../constants/filters";

import { RESET_MOVIES } from "../constants/movie";
import { RESET_TV } from "../constants/serial";
import { API_KEY, LANGUAGE } from "../../globalVariables";

// Set Ordem
export const setPage = (page) => async (dispatch) => {
  dispatch({ type: RESET_MOVIES });
  dispatch({ type: RESET_TV });

  dispatch({
    type: SET_PAGE,
    payload: { page: page },
  });
};

// Set Ordem
export const setOrdem = (ordem) => async (dispatch) => {
  dispatch({ type: RESET_MOVIES });
  dispatch({ type: RESET_TV });
  dispatch({ type: RESET_FILTERS });
  dispatch({
    type: SET_ORDEM,
    payload: { ordem: ordem },
  });
};

// Set Filters
export const setFilters = (filters) => async (dispatch) => {
  dispatch({ type: RESET_MOVIES });
  dispatch({ type: RESET_TV });
  dispatch({
    type: SET_FILTERS,
    payload: { filters: filters },
  });
};

// Set option Navigate
export const setNavigate = (to) => async (dispatch) => {
  dispatch({
    type: SET_NAVIGATE,
    payload: { optionNavigate: to },
  });
};

// get Genres
export const getGenre = () => async (dispatch) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}`
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
