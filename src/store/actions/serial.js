import axios from "axios";

import {
  ADD_SERIALS,
  ADD_SERIALS_REQUEST,
  GET_SERIALS,
  GET_SERIALS_REQUEST,
  GET_SERIALS_FAIL,
  SEARCH_SERIALS,
  GET_SERIAL_REQUEST,
  GET_SERIAL,
  GET_EPISODE_REQUEST,
  GET_EPISODE,
} from "../constants/serial";

import { getTorrentTV } from "./torrent";

import { API_KEY, LANGUAGE } from "../../globalVariables";

// Get Serials
export const getSerials = (page, filters, ordem) => async (dispatch) => {
  dispatch({ type: GET_SERIALS_REQUEST });

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
      `https://api.themoviedb.org/3/tv/${ordem}?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`
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
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}${requestString}&language=${LANGUAGE}&page=${page}`
    );
  }

  dispatch({
    type: GET_SERIALS,
    payload: {
      serials: res.data.results,
      pages: res.data.total_pages,
      results: res.data.total_results,
    },
  });
};

// Get Single Serial
export const getSerial = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SERIAL_REQUEST });

    const resUS = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=${LANGUAGE}`
    );

    const resBR = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=pt-BR`
    );

    dispatch({
      type: GET_SERIAL,
      payload: { ...resUS.data, overview: resBR.data.overview },
    });
  } catch (error) {}
};

// Get Episode
export const getEpisode = (id, season, episode) => async (dispatch) => {
  try {
    dispatch({ type: GET_EPISODE_REQUEST });

    let res = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}?api_key=${API_KEY}&language=pt-BR`
    );

    dispatch({
      type: GET_EPISODE,
      payload: res.data,
    });
  } catch (error) {}
};

// Search Serials
export const searchSerials = (query) => async (dispatch) => {
  try {
    dispatch({ type: GET_SERIALS_REQUEST });

    const res = await axios.get(
      `https://api.themoviedb.org/3/search/tv?&api_key=${API_KEY}&query=${query}`
    );
    dispatch({
      type: SEARCH_SERIALS,
      payload: {
        serials: res.data.results,
        pages: res.data.total_pages,
        results: res.data.total_results,
        query: query,
      },
    });
  } catch (error) {}
};
