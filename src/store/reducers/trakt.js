import {
  GET_CODE,
  GET_CODE_REQUEST,
  GET_TOKEN,
  GET_TOKEN_REQUEST,
  REMOVE_TOKEN,
} from "../constants/trakt";

export const traktReducer = (state = { trakt: {} }, action) => {
  switch (action.type) {
    case GET_CODE_REQUEST:
      return { ...state, loading: true };
    case GET_CODE:
      return {
        ...state,
        loading: false,
        trakt: { ...state, ...action.payload.data },
      };
    case GET_TOKEN_REQUEST:
      return { ...state, tokenLoading: true };
    case GET_TOKEN:
      return {
        ...state,
        tokenLoading: false,
        token: action.payload.data,
        logged: true,
      };
    case REMOVE_TOKEN:
      return {
        ...state,
        trakt: null,
        token: null,
        logged: false,
      };
    default:
      return state;
  }
};
