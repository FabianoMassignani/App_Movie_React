import {
  GET_CODE,
  GET_CODE_REQUEST,
  GET_TOKEN,
  GET_TOKEN_REQUEST,
  ADD_TOKEN,
  REMOVE_TOKEN,
} from "../constants/trakt";

export const traktReducer = (state = { auth: {} }, action) => {
  switch (action.type) {
    case GET_CODE_REQUEST:
      return { ...state, loading: true };
    case GET_CODE:
      return {
        ...state,
        loading: false,
        auth: action.payload.auth,
      };
    case GET_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TOKEN:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
