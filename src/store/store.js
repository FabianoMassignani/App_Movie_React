import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {
  movieListReducer,
  movieItemReducer,
  favoriteListReducer,
} from "./reducers/movieReducer";
import { serialListReducer, serialItemReducer } from "./reducers/serialReducer";
import { torrentListReducer } from "./reducers/torrentReducer";
import { subtitleListReducer } from "./reducers/subtitlesReducer";
import { movieFiltersReducer } from "./reducers/MovieFiltersReducer";

import { composeWithDevTools } from "redux-devtools-extension";

export const rootReducer = combineReducers({
  movieFilters: movieFiltersReducer,
  subtitleList: subtitleListReducer,
  torrentList: torrentListReducer,
  movieList: movieListReducer,
  serialList: serialListReducer,
  movieItem: movieItemReducer,
  serialItem: serialItemReducer,
  favoriteList: favoriteListReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
