import axios from "axios";

import {
  GET_TORRENTS_REQUEST,
  GET_TORRENTS,
  DOWNLOAD_TORRENT,
  DOWNLOAD_TORRENT_REQUEST,
  STOP_TORRENT,
  RESET_STATES_TORRENTS,
} from "../constants/torrent";

import { HOST_API } from "../../globalVariables";

export const getTorrentTV = (nameBR, nameUS, date) => async (dispatch) => {
  dispatch({ type: GET_TORRENTS_REQUEST });

  const res = await axios.get(
    `${HOST_API}/torrents/getMovie?nameBR=${nameBR}&nameUS=${nameUS}&date=${date}`
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
    `${HOST_API}/torrents/getMovie?nameBR=${nameBR}&nameUS=${nameUS}&date=${date}`
  );

  dispatch({
    type: GET_TORRENTS,
    payload: {
      torrents: res.data.torrents,
    },
  });
};

export const downloadTorrent =
  (torrent, subtitles, movie) => async (dispatch) => {
    dispatch({ type: DOWNLOAD_TORRENT_REQUEST });

    await axios
      .post(`${HOST_API}/download/add`, {
        torrent: torrent,
        subtitles: subtitles,
        movie: movie,
      })
      .then(function (response) {
        dispatch({
          type: DOWNLOAD_TORRENT,
        });
      });
  };

export const refresh = () => async (dispatch) => {
  await axios.get(`${HOST_API}/download`);
};

// export const stopTorrent = () => async (dispatch) => {
//   await axios.get(`${HOST_API}/stop`).then((res) => {
//     dispatch({
//       type: STOP_TORRENT,
//     });
//   });
// };

export const resetStateTorrents = () => async (dispatch) => {
  dispatch({
    type: RESET_STATES_TORRENTS,
  });
};
