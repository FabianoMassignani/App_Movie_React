import axios from "axios";

import {
  GET_TORRENTS_REQUEST,
  GET_TORRENTS,
  PLAY_TORRENT,
  PLAY_TORRENT_REQUEST,
  STOP_TORRENT,
  RESET_STATES_TORRENTS,
} from "../constants/torrent";

import { HOST_API } from "../../globalVariables";

export const getTorrentTV = (nameBR, nameUS, date) => async (dispatch) => {
  dispatch({ type: GET_TORRENTS_REQUEST });

  const res = await axios.get(
    `${HOST_API}/getMovie?nameBR=${nameBR}&nameUS=${nameUS}&date=${date}`
  );

  dispatch({
    type: GET_TORRENTS,
    payload: {
      torrents: res.data.torrents,
    },
  });
};

export const getTorrentMovie = (nameBR, nameUS, date) => async (dispatch) => {
  dispatch({ type: GET_TORRENTS_REQUEST });

  const res = await axios.get(
    `${HOST_API}/getMovie?nameBR=${nameBR}&nameUS=${nameUS}&date=${date}`
  );

  dispatch({
    type: GET_TORRENTS,
    payload: {
      torrents: res.data.torrents,
    },
  });
};

export const startTorrent = (torrent, id) => async (dispatch) => {
  dispatch({ type: PLAY_TORRENT_REQUEST });

  await axios
    .get(`${HOST_API}/start?magnet=${torrent.magnet}&id=${id}`)
    .then((res) => {
      dispatch({
        type: PLAY_TORRENT,
      });
    });
};

export const stopTorrent = () => async (dispatch) => {
  await axios.get(`${HOST_API}/stop`).then((res) => {
    dispatch({
      type: STOP_TORRENT,
    });
  });
};

export const resetStateTorrents = () => async (dispatch) => {
  dispatch({
    type: RESET_STATES_TORRENTS,
  });
};
