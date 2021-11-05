import {
  spotifyAccessToken,
  spotifyRefreshToken,
  spotifyTokenTimestamp,
} from "../../constants";
import { getItem, setItem } from "../localStorage";

// Set to Local Storage2
export const setTokenTimestamp = () => {
  setItem(spotifyTokenTimestamp, String(Date.now()));
};
export const setLocalAccessToken = (token: string) => {
  setTokenTimestamp();
  setItem(spotifyAccessToken, token);
};
export const setLocalRefreshToken = (token: string) =>
  setItem(spotifyRefreshToken, token);

// Retrieve from Local Storage
export const getTokenTimestamp = () => getItem(spotifyTokenTimestamp);
export const getLocalAccessToken = () => getItem(spotifyAccessToken);
export const getLocalRefreshToken = () => getItem(spotifyRefreshToken);
