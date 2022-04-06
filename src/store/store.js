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
import { filtersReducer } from "./reducers/filters";
import { traktReducer } from "./reducers/trakt";

import { composeWithDevTools } from "redux-devtools-extension";

export const rootReducer = combineReducers({
  subtitleList: subtitleListReducer,
  torrentList: torrentListReducer,
  movieList: movieListReducer,
  serialList: serialListReducer,
  movieItem: movieItemReducer,
  serialItem: serialItemReducer,
  filters: filtersReducer,
  favoriteList: favoriteListReducer,
  traktUser: traktReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
