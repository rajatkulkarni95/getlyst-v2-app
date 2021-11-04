import { getHashParams } from "./hashParams";
import {
  spotifyAccessToken,
  spotifyRefreshToken,
  spotifyTokenTimestamp,
} from "../constants";

const BACKEND_URI = process.env.REACT_APP_SERVER || "http://localhost:8080";

// TOKENS
const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds

// Set to Local Storage
const setTokenTimestamp = () => {
  window.localStorage.setItem(spotifyTokenTimestamp, String(Date.now()));
};
const setLocalAccessToken = (token: string) => {
  setTokenTimestamp();
  window.localStorage.setItem(spotifyAccessToken, token);
};
const setLocalRefreshToken = (token: string) =>
  window.localStorage.setItem(spotifyRefreshToken, token);

// Retrieve from Local Storage
const getTokenTimestamp = () =>
  window.localStorage.getItem(spotifyTokenTimestamp);
const getLocalAccessToken = () =>
  window.localStorage.getItem(spotifyAccessToken);
const getLocalRefreshToken = () =>
  window.localStorage.getItem(spotifyRefreshToken);

// // Refresh the token
// const refreshAccessToken = async () => {
//   try {
//     const { data } = await axios.get(`${BACKEND_URI}/refresh-token`, {
//       params: { refresh_token: getLocalRefreshToken() },
//     });
//     const { access_token } = data;
//     setLocalAccessToken(access_token);
//     window.location.reload();
//     return;
//   } catch (e) {
//     console.error(e);
//   }
// };

// Get access token off of query params (called on application init)
export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error(error);
    // refreshAccessToken();
  }

  // If token has expired
  if (Date.now() - Number(getTokenTimestamp()) > EXPIRATION_TIME) {
    console.warn("Access token has expired, refreshing...");

    // refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();
  const localRefreshToken = getLocalRefreshToken();

  // If there is no REFRESH token in local storage, set it as `refresh_token` from params
  if (!localRefreshToken || localRefreshToken === "undefined") {
    setLocalRefreshToken(refresh_token);
  }

  // If there is no ACCESS token in local storage, set it and return `access_token` from params
  if (!localAccessToken || localAccessToken === "undefined") {
    setLocalAccessToken(access_token);
    return access_token;
  }

  return localAccessToken;
};

export const clearAccessTokens = () => {
  window.localStorage.removeItem(spotifyTokenTimestamp);
  window.localStorage.removeItem(spotifyAccessToken);
  window.localStorage.removeItem(spotifyRefreshToken);
};
