import {
  GET_MOVIES,
  GET_MOVIES_REQUEST,
  ADD_MOVIES,
  ADD_MOVIES_REQUEST,
  SEARCH_MOVIES,
  GET_MOVIE_REQUEST,
  GET_MOVIE,
  GET_MOVIES_TRAKT,
  GET_MOVIES_TRAKT_REQUEST,
  ADD_MOVIES_TRAKT,
  ADD_MOVIES_TRAKT_REQUEST,
  RESET_MOVIES,
} from "../constants/movie";

export const movieListReducer = (
  state = { movies: [], moviesTrakt: [] },
  action
) => {
  switch (action.type) {
    case RESET_MOVIES:
      return { ...state, movies: [] };

    //---------------------------------------------------------
    case GET_MOVIES_REQUEST:
      return { ...state, loading: true, movies: [] };
    case GET_MOVIES:
      return {
        ...state,
        loading: false,
        movies: action.payload.movies,
        pages: action.payload.pages,
        results: action.payload.results,
      };
    case ADD_MOVIES_REQUEST:
      return { ...state, nextLoading: true };
    case ADD_MOVIES:
      return {
        ...state,
        nextLoading: false,
        movies: [...state.movies, ...action.payload],
      };
    //---------------------------------------------------------
    case GET_MOVIES_TRAKT_REQUEST:
      return { ...state, loading: true, moviesTrakt: [] };
    case GET_MOVIES_TRAKT:
      return {
        ...state,
        loading: false,
        resultsTrakt: action.payload.resultsTrakt,
        pagesTrakt: action.payload.pagesTrakt,
        moviesTrakt: [...state.moviesTrakt, ...action.payload.moviesTrakt],
      };
    case ADD_MOVIES_TRAKT_REQUEST:
      return { ...state, loading: true };
    case ADD_MOVIES_TRAKT:
      let a = action.payload;
      let b = state.moviesTrakt;
      return {
        ...state,
        loading: false,
        moviesTrakt: [...state.moviesTrakt, ...action.payload],
      };

    //---------------------------------------------------------
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

// export const favoriteListReducer = (state = { favorites: [] }, action) => {
//   switch (action.type) {
//     case ADD_FAV:
//       const item = action.payload;
//       const existItem = state.favorites.find((x) => x.id === item.id);

//       if (existItem) {
//         return {
//           ...state,
//           favorites: state.favorites.map((x) =>
//             x.id === existItem.id ? item : x
//           ),
//         };
//       } else {
//         return {
//           ...state,
//           favorites: [...state.favorites, item],
//         };
//       }
//     case REMOVE_FAV:
//       return {
//         ...state,
//         favorites: state.favorites.filter((x) => x.id !== action.payload),
//       };
//     default:
//       return state;
//   }
// };
