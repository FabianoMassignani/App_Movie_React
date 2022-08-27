import {
  GET_TORRENTS,
  GET_TORRENTS_REQUEST,
  STOP_TORRENT,
  STOP_TORRENT_REQUEST,
  RESET_STATES_TORRENTS,
  PLAY_TORRENT_REQUEST,
  PLAY_TORRENT,
  GET_TORRENT_INFO,
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
    case GET_TORRENT_INFO:
      return {
        ...state,
        info: action.payload.torrents,
      };
    case PLAY_TORRENT_REQUEST:
      return {
        ...state,
        loadingPlay: true,
      };
    case PLAY_TORRENT:
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
