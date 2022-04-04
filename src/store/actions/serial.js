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
  GET_SERIAL_FAIL,
} from "../constants/serial";

import { getTorrentTV } from "./torrent";

import { API_KEY } from "../../globalVariables";

// Get Popular Serials
export const getSerials = () => async (dispatch) => {
  dispatch({ type: GET_SERIALS_REQUEST });

  const res = await axios.get(
    // `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
  );

  dispatch({
    type: GET_SERIALS,
    payload: {
      serials: res.data.results,
      pages: res.data.total_pages,
      results: res.data.total_results,
    },
  });
};

// Add Popular Serials
export const addSerials = (page) => async (dispatch) => {
  dispatch({ type: ADD_SERIALS_REQUEST });

  const res = await axios.get(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  dispatch({
    type: ADD_SERIALS,
    payload: res.data.results,
  });
};

// Get Single Serial
export const getSerial = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SERIAL_REQUEST });

    const resUS = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
    );

    const resBR = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=pt-BR`
    );

    dispatch({
      type: GET_SERIAL,
      payload: { ...resUS.data, overview: resBR.data.overview },
    });
  } catch (error) {
    dispatch({
      type: GET_SERIAL_FAIL,
      payload: { message: error.response.data.status_message },
    });
  }
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
  } catch (error) {
    dispatch({
      type: GET_SERIALS_FAIL,
      payload: { message: error.response.data.status_message },
    });
  }
};
