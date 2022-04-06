import axios from "axios";

import {
  GET_CODE,
  GET_CODE_REQUEST,
  GET_TOKEN,
  GET_TOKEN_REQUEST,
  ADD_TOKEN,
  REMOVE_TOKEN,
} from "../constants/trakt";

import {
  TRAKT_USERNAME,
  CLIENT_ID,
  CLIENT_SECRET,
} from "../../globalVariables";

export const DeviceCode = () => async (dispatch) => {
  dispatch({ type: GET_CODE_REQUEST });

  let headers = {
    "Content-Type": "application/json",
  };

  let res = await axios.post(
    "https://private-anon-239d9a0267-trakt.apiary-proxy.com/oauth/device/code",
    {
      client_id: CLIENT_ID,
    },
    {
      headers: headers,
    }
  );

  dispatch({
    type: GET_CODE,
    payload: {
      auth: res.data,
    },
  });

  var startTime = new Date().getTime();
  var endTime = new Date().getTime() + res.data.expires_in * 1000;

  var interval = setInterval(function () {
    if (new Date().getTime() - startTime > endTime) {
      clearInterval(interval);
      return;
    }
    console.log("esperando");
    let ress = GetToken(res.data.user_code);
    console.log(ress);
  }, res.data.interval * 1000);

  // dispatch({
  //   type: GET_CODE,
  //   payload: {
  //     auth: res.data.interval,
  //   },
  // });
};

const GetToken = async (user_code) => {
  let headers = {
    "Content-Type": "application/json",
  };

  let data = {
    code: user_code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  let res = await axios.post(
    `https://private-anon-239d9a0267-trakt.apiary-mock.com/oauth/device/token`,
    { data },
    {
      headers,
    }
  );

  return res;
};

// export const history = () => async () => {
//   let moviesGnreData = await axios.get(
//     `https://api.trakt.tv/users/${TRAKT_USERNAME}/history/movies?extended=full&page=2&limit=20`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         "trakt-api-key": CLIENT_ID,
//         "trakt-api-version": "2",
//       },
//     }
//   );
//   console.log(moviesGnreData.data); // 10
// };

// export const Checkin = (data) => async () => {
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization:
//       "Bearer 822e7f6f9938e9f0210d794645e6c05ef0f9240554caa6936304429a8133a2bd",
//     "trakt-api-version": "2",
//     "trakt-api-key": CLIENT_ID,
//   };

//   axios
//     .post(
//       "https://api.trakt.tv/checkin",
//       {
//         movie: data,
//       },
//       {
//         headers: headers,
//       }
//     )
//     .then((response) => {
//       console.log(response); // 10
//     })
//     .catch((error) => {
//       console.log(error); // 10
//     });
// };
