import {
  ADD_SERIALS,
  ADD_SERIALS_REQUEST,
  GET_SERIALS,
  GET_SERIALS_REQUEST,
  SEARCH_SERIALS,
  GET_SERIAL_REQUEST,
  GET_SERIAL,
  GET_EPISODE,
  GET_EPISODE_REQUEST,
  RESET_TV,
} from "../constants/serial";

export const serialListReducer = (
  state = { serials: [], currentPage: 1 },
  action
) => {
  switch (action.type) {
    case GET_SERIALS_REQUEST:
      return { ...state, loading: true, serials: [] };
    case GET_SERIALS:
      return {
        ...state,
        loading: false,
        serials: action.payload.serials,
        pages: action.payload.pages,
        results: action.payload.results,
      };
    case ADD_SERIALS_REQUEST:
      return { ...state, nextLoading: true };
    case ADD_SERIALS:
      return {
        ...state,
        nextLoading: false,
        serials: [...state.serials, ...action.payload],
      };
    case SEARCH_SERIALS: {
      return {
        ...state,
        loading: false,
        serials: action.payload.serials,
        pages: action.payload.pages,
        results: action.payload.results,
        query: action.payload.query,
      };
    }
    case RESET_TV:
      return { ...state, serials: [] };
    default:
      return state;
  }
};

export const serialItemReducer = (
  state = { serial: {}, episode: null },
  action
) => {
  switch (action.type) {
    case GET_SERIAL_REQUEST:
      return { ...state, loading: true };
    case GET_SERIAL:
      return {
        ...state,
        serial: action.payload,
        episode: null,
        loading: false,
      };
    case GET_EPISODE_REQUEST:
      return { ...state, loading: true, episode: null };
    case GET_EPISODE:
      return {
        ...state,
        loading: false,
        episode: action.payload,
      };
    default:
      return state;
  }
};
