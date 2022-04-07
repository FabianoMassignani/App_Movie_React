import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
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

export const rootReducer = combineReducers({
  subtitleList: subtitleListReducer,
  torrentList: torrentListReducer,
  movieList: movieListReducer,
  serialList: serialListReducer,
  movieItem: movieItemReducer,
  serialItem: serialItemReducer,
  filters: filtersReducer,
  TraktAuth: traktReducer,
});

const token = localStorage.getItem("TokenTrakt")
  ? JSON.parse(localStorage.getItem("TokenTrakt"))
  : undefined;

let initialState;

if (token)
  initialState = {
    TraktAuth: {
      logged: true,
      token: token,
    },
  };
else {
  initialState = {
    TraktAuth: {
      logged: false,
    },
  };
}

const middleware = [thunk];

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
