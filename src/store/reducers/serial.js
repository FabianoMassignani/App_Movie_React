import {
  ADD_SERIALS,
  ADD_SERIALS_REQUEST,
  ADD_SERIALS_FAIL,
  GET_SERIALS,
  GET_SERIALS_REQUEST,
  GET_SERIALS_FAIL,
  SEARCH_SERIALS,
  GET_SERIAL_REQUEST,
  GET_SERIAL,
  GET_SERIAL_FAIL,
  SET_PAGE,
} from "../constants/serial";

export const serialListReducer = (
  state = { serials: [], currentPage: 1 },
  action
) => {
  switch (action.type) {
    case SET_PAGE:
      return { ...state, currentPage: action.payload.currentPage };
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
    case GET_SERIALS_FAIL:
      return { ...state, nextLoading: false, message: action.payload.message };
    case ADD_SERIALS_REQUEST:
      return { ...state, nextLoading: true };
    case ADD_SERIALS:
      return {
        ...state,
        nextLoading: false,
        serials: [...action.payload],
      };
    case ADD_SERIALS_FAIL:
      return { ...state, nextLoading: false, message: action.payload.message };
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
    default:
      return state;
  }
};

export const serialItemReducer = (state = { serial: {} }, action) => {
  switch (action.type) {
    case GET_SERIAL_REQUEST:
      return { ...state, loading: true };
    case GET_SERIAL:
      return {
        ...state,
        serial: action.payload,
        loading: false,
      };
    case GET_SERIAL_FAIL:
      return { ...state, nextLoading: false, message: action.payload.message };
    default:
      return state;
  }
};
