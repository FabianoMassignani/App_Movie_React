import {
  GET_TORRENTS,
  GET_TORRENTS_REQUEST,
  DOWNLOAD_TORRENT,
  DOWNLOAD_TORRENT_REQUEST,
  STOP_TORRENT,
  STOP_TORRENT_REQUEST,
  RESET_STATES_TORRENTS,
} from "../constants/torrent";

export const torrentListReducer = (state = { torrents: [] }, action) => {
  switch (action.type) {
    case GET_TORRENTS_REQUEST:
      return { loadingTorrents: true, torrents: [] };
    case GET_TORRENTS:
      return {
        ...state,
        loadingTorrents: false,
        torrents: action.payload.torrents,
      };
    case DOWNLOAD_TORRENT_REQUEST:
      return {
        ...state,
        loadingPlay: true,
      };
    case DOWNLOAD_TORRENT:
      return {
        ...state,
        loadingPlay: false,
      };
    case STOP_TORRENT_REQUEST:
      return {
        loadingStop: true,
        ...state,
      };
    case STOP_TORRENT:
      return {
        ...state,
        loadingStop: false,
      };
    case RESET_STATES_TORRENTS:
      return {
        ...state,
        torrents: [],
      };
    default:
      return state;
  }
};
