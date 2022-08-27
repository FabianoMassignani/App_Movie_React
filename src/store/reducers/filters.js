import {
  SET_PAGE,
  SET_ORDEM,
  GET_GENRES,
  SET_FILTERS,
  RESET_FILTERS,
  SET_NAVIGATE,
} from "../constants/filters";

export const filtersReducer = (
  state = {
    page: 1,
    filters: {},
    genres: [],
    ordem: "popular",
    optionNavigate: "/",
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
    case SET_NAVIGATE:
      return {
        ...state,
        optionNavigate: action.payload.optionNavigate,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload.page,
      };

    default:
      return state;
  }
};
