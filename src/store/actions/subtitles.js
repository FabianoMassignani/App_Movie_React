import axios from "axios";

import {
  GET_SUBTITLES_REQUEST,
  GET_SUBTITLES,
  RESET_STATES_SUBTITLES,
} from "../constants/subtitles";

import { HOST_API } from "../../globalVariables";

export const getSubtitle = (resPT, resUS, similarity) => async (dispatch) => {
  dispatch({ type: GET_SUBTITLES_REQUEST });

  await axios
    .post(`${HOST_API}/subtitle/subtitle`, {
      resPT: resPT,
      resUS: resUS,
      similarity: similarity,
    })
    .then(function (response) {
      dispatch({
        type: GET_SUBTITLES,
        payload: {
          subtitles: response.data.subtitles,
        },
      });
    })
    .catch((err) => console.log(err));
};

export const resetStateSubtitles = () => async (dispatch) => {
  dispatch({
    type: RESET_STATES_SUBTITLES,
  });
};
