import axios from "axios";

import {
  GET_SUBTITLES_REQUEST,
  GET_SUBTITLES,
  RESET_STATES_SUBTITLES,
} from "../constants/subtitles";

import { HOST_API } from "../../globalVariables";

export const getSubtitle = (nameBR, nameUS, date) => async (dispatch) => {
  dispatch({ type: GET_SUBTITLES_REQUEST });

  const res = await axios.get(
    `${HOST_API}/subtitle/subtitle?nameBR=${nameBR}&nameUS=${nameUS}&date=${date}`
  );

  dispatch({
    type: GET_SUBTITLES,
    payload: {
      subtitles: res.data.subtitles,
    },
  });
};

export const resetStateSubtitles = () => async (dispatch) => {
  dispatch({
    type: RESET_STATES_SUBTITLES,
  });
};
