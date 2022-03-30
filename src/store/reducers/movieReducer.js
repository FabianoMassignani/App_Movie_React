import {
  GET_MOVIES,
  GET_MOVIES_REQUEST,
  SEARCH_MOVIES,
  GET_MOVIE_REQUEST,
  GET_MOVIE,
  RESET_MOVIES,
  ADD_FAV,
  REMOVE_FAV,
} from "../constants/movie";

export const movieListReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case RESET_MOVIES:
      return { ...state, movies: [] };
    case GET_MOVIES_REQUEST:
      return { ...state, loading: true };
    case GET_MOVIES:
      if (action.payload.page === 1) {
        return {
          ...state,
          loading: false,
          movies: [...action.payload.movies],
          pages: action.payload.pages,
          results: action.payload.results,
        };
      } else {
        return {
          ...state,
          loading: false,
          movies: [...state.movies, ...action.payload.movies],
        };
      }
    case SEARCH_MOVIES: {
      return {
        ...state,
        loading: false,
        movies: action.payload.movies,
        pages: action.payload.pages,
        results: action.payload.results,
        query: action.payload.query,
      };
    }
    default:
      return state;
  }
};

export const movieItemReducer = (state = { movie: {} }, action) => {
  switch (action.type) {
    case GET_MOVIE_REQUEST:
      return { ...state, loading: true };
    case GET_MOVIE:
      return {
        ...state,
        movie: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const favoriteListReducer = (state = { favorites: [] }, action) => {
  switch (action.type) {
    case ADD_FAV:
      const item = action.payload;
      const existItem = state.favorites.find((x) => x.id === item.id);

      if (existItem) {
        return {
          ...state,
          favorites: state.favorites.map((x) =>
            x.id === existItem.id ? item : x
          ),
        };
      } else {
        return {
          ...state,
          favorites: [...state.favorites, item],
        };
      }
    case REMOVE_FAV:
      return {
        ...state,
        favorites: state.favorites.filter((x) => x.id !== action.payload),
      };
    default:
      return state;
  }
};
