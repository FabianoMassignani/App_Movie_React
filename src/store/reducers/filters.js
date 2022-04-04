import {
  SET_ORDEM,
  GET_GENRES,
  SET_FILTERS,
  RESET_FILTERS,
} from "../constants/filters";

export const filtersReducer = (
  state = {
    filters: {},
    genres: [],
    ordem: {
      value: "popular",
      label: "popular",
    },
  },
  action
) => {
  switch (action.type) {
    case RESET_FILTERS:
      return { ...state, filters: {} };
    case SET_ORDEM:
      return {
        ...state,
        ordem: action.payload.ordem,
      };
    case SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload.filters },
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload.genres,
      };
    default:
      return state;
  }
};
