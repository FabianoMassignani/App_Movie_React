import axios from "axios";

import {
  GET_TORRENTS_REQUEST,
  GET_TORRENTS,
  STOP_TORRENT,
  RESET_STATES_TORRENTS,
  PLAY_TORRENT_REQUEST,
  PLAY_TORRENT,
  GET_TORRENT_INFO,
} from "../constants/torrent";

import { HOST_API } from "../../globalVariables";

export const getTorrentInfo = () => async (dispatch) => {
  await axios
    .get(`${HOST_API}/infoTorrent`)
    .then(function (response) {
      dispatch({
        type: GET_TORRENT_INFO,
        payload: {
          torrents: response.data,
        },
      });
    })
    .catch((err) => console.log(err));
};

export const getTorrentTV = (serial, Seasom, Episode) => async (dispatch) => {
  dispatch({ type: GET_TORRENTS_REQUEST });

  const res = await axios.get(
    `${HOST_API}/torrents/getTV?Seasom=${Seasom}&Episode=${Episode}&serial=${serial.name}`
  );

  dispatch({
    type: GET_TORRENTS,
    payload: {
      torrents: res.data.torrents,
    },
  });
};

export const getTorrentMovie =
  (resPT, resUS, numberTorrent, similarity) => async (dispatch) => {
    dispatch({ type: GET_TORRENTS_REQUEST });

    await axios
      .post(`${HOST_API}/torrents/getMovie`, {
        resPT: resPT,
        resUS: resUS,
        numberTorrent: numberTorrent,
        similarity: similarity,
      })
      .then(function (response) {
        dispatch({
          type: GET_TORRENTS,
          payload: {
            torrents: response.data.torrents || [],
          },
        });
      })
      .catch((err) => console.log(err));
  };

export const setTorrent = (torrent, movie, callback) => async (dispatch) => {
  dispatch({ type: PLAY_TORRENT_REQUEST });

  await axios
    .post(`${HOST_API}/setTorrent`, {
      torrent: torrent,
      movie: movie,
    })
    .then(function (response) {
      dispatch({
        type: PLAY_TORRENT,
      });

      callback();
    });
};

export const shutdown = () => async (dispatch) => {
  await axios.get(`${HOST_API}/shutdown`);
};

export const refresh = () => async (dispatch) => {
  await axios.get(`${HOST_API}/download`);
};

export const resetStateTorrents = () => async (dispatch) => {
  dispatch({
    type: RESET_STATES_TORRENTS,
  });
};
