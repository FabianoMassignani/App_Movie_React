import axios from "axios";

import {
  GET_TORRENTS_REQUEST,
  GET_TORRENTS,
  DOWNLOAD_TORRENT,
  DOWNLOAD_TORRENT_REQUEST,
  STOP_TORRENT,
  RESET_STATES_TORRENTS,
  PLAY_TORRENT_REQUEST,
  PLAY_TORRENT,
} from "../constants/torrent";

import { HOST_API } from "../../globalVariables";

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

export const getTorrentMovie = (movie, date) => async (dispatch) => {
  dispatch({ type: GET_TORRENTS_REQUEST });

  const res = await axios.get(
    `${HOST_API}/torrents/getMovie?movie=${movie}&date=${date}`
  );

  dispatch({
    type: GET_TORRENTS,
    payload: {
      torrents: res.data.torrents,
    },
  });
};

export const playTorrent =
  (torrent, movie, setShowPlayer) => async (dispatch) => {
    dispatch({ type: PLAY_TORRENT_REQUEST });

    await axios
      .post(`${HOST_API}/start`, {
        torrent: torrent,
        movie: movie,
      })
      .then(function (response) {
        dispatch({
          type: PLAY_TORRENT,
        });

        setShowPlayer(true);
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
