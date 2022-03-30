import {
  SET_ORDEM,
  SET_SORT,
  GET_GENRES,
  SET_GENRE,
  SET_VOTE,
  SET_SCORE,
  SET_RELEASE_DATE,
  RESET_FILTERS,
} from "../constants/MovieFilters";

export const movieFiltersReducer = (
  state = {
    filters: {
      ordem: {
        value: "popular",
        label: "popular",
      },
    },
    genres: [],
  },
  action
) => {
  switch (action.type) {
    case RESET_FILTERS:
      return { ...state, filters: {} };
    case SET_ORDEM:
      return {
        ...state,
        filters: { ...state.filters, ordem: action.payload.ordem },
      };
    case SET_SORT:
      return {
        ...state,
        filters: { ...state.filters, sort: action.payload.sort },
      };
    case SET_GENRE:
      return {
        ...state,
        filters: { ...state.filters, genre: action.payload.genre },
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload.genres,
      };
    case SET_VOTE:
      return {
        ...state,
        filters: { ...state.filters, vote: action.payload.vote },
      };
    case SET_SCORE:
      return {
        ...state,
        filters: { ...state.filters, score: action.payload.score },
      };
    case SET_RELEASE_DATE:
      return {
        ...state,
        filters: { ...state.filters, releaseDate: action.payload.releaseDate },
      };
    default:
      return state;
  }
};
