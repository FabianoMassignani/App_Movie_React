import axios from "axios";

import {
  GET_CODE,
  GET_CODE_REQUEST,
  GET_TOKEN,
  GET_TOKEN_REQUEST,
  REMOVE_TOKEN,
} from "../constants/trakt";

import { CLIENT_ID, CLIENT_SECRET } from "../../globalVariables";

export const login = (goTo) => async (dispatch) => {
  dispatch({ type: GET_CODE_REQUEST });

  let res = await axios.post(
    "https://private-anon-239d9a0267-trakt.apiary-proxy.com/oauth/device/code",
    {
      client_id: CLIENT_ID,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  dispatch({
    type: GET_CODE,
    payload: {
      data: res.data,
    },
  });

  dispatch({
    type: GET_TOKEN_REQUEST,
  });

  let time;

  var intervalIdentifier = setInterval(async function () {
    time += res.data.interval;

    if (time == res.data.expires_in) {
      clearInterval(intervalIdentifier);
    }

    await axios
      .post(
        `https://private-anon-239d9a0267-trakt.apiary-proxy.com/oauth/device/token`,
        {
          code: res.data.device_code,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        },
        {}
      )
      .then((response) => {
        clearInterval(intervalIdentifier);
        localStorage.setItem("TokenTrakt", JSON.stringify(response.data));

        dispatch({
          type: GET_TOKEN,
          payload: {
            data: response.data,
          },
        });
        goTo();
      })
      .catch((error) => {});
  }, res.data.interval * 1000);
};

export const logout = (goTo) => async (dispatch, getState) => {
  dispatch({ type: GET_CODE_REQUEST });

  let res = await axios
    .post(
      "https://private-anon-21aaaa1f73-trakt.apiary-proxy.com/oauth/revoke",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        token: getState().TraktAuth.token,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      localStorage.setItem("TokenTrakt", JSON.stringify(null));
      dispatch({
        type: REMOVE_TOKEN,
      });

      goTo();
    })
    .catch((error) => {});
};
