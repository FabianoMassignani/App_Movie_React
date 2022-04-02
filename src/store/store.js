import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {
  movieListReducer,
  movieItemReducer,
  favoriteListReducer,
} from "./reducers/movie";
import { serialListReducer, serialItemReducer } from "./reducers/serial";
import { torrentListReducer } from "./reducers/torrent";
import { subtitleListReducer } from "./reducers/subtitles";
import { movieFiltersReducer } from "./reducers/MovieFilters";

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
