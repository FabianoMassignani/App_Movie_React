import {
  GET_SUBTITLES,
  GET_SUBTITLES_REQUEST,
  SET_SUBTITLE,
  RESET_STATES_SUBTITLES,
} from "../constants/subtitles";

export const subtitleListReducer = (state = { subtitles: [] }, action) => {
  switch (action.type) {
    case GET_SUBTITLES_REQUEST:
      return { loadingSubtitles: true, subtitles: [] };
    case GET_SUBTITLES:
      return {
        ...state,
        loadingSubtitles: false,
        subtitles: action.payload.subtitles,
      };
    case SET_SUBTITLE:
      return {
        ...state,
        subtitle: action.payload.subtitle,
      };
    case RESET_STATES_SUBTITLES:
      return {
        ...state,
        subtitles: [],
      };
    default:
      return state;
  }
};
