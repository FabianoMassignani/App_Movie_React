import axios from "axios";
import { TRAKT_USERNAME, TRAKT_ID } from "../../globalVariables";

export const DeviceCode = () => async () => {
  const headers = {
    "Content-Type": "application/json",
  };

  axios
    .post(
      "https://private-anon-239d9a0267-trakt.apiary-mock.com/oauth/device/code",
      {
        client_id: TRAKT_ID,
      },
      {
        headers: headers,
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const GetToken = () => async () => {
  let moviesGnreData = await axios.get(
    `https://api.trakt.tv/users/${TRAKT_USERNAME}/history/movies?extended=full&page=2&limit=20`,
    {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-key": TRAKT_ID,
        "trakt-api-version": "2",
      },
    }
  );
  console.log(moviesGnreData.data); // 10
};

export const history = () => async () => {
  let moviesGnreData = await axios.get(
    `https://api.trakt.tv/users/${TRAKT_USERNAME}/history/movies?extended=full&page=2&limit=20`,
    {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-key": TRAKT_ID,
        "trakt-api-version": "2",
      },
    }
  );
  console.log(moviesGnreData.data); // 10
};

export const Checkin = (data) => async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer 822e7f6f9938e9f0210d794645e6c05ef0f9240554caa6936304429a8133a2bd",
    "trakt-api-version": "2",
    "trakt-api-key": TRAKT_ID,
  };

  axios
    .post(
      "https://api.trakt.tv/checkin",
      {
        movie: data,
      },
      {
        headers: headers,
      }
    )
    .then((response) => {
      console.log(response); // 10
    })
    .catch((error) => {
      console.log(error); // 10
    });
};
