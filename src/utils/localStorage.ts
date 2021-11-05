import {
  spotifyAccessToken,
  spotifyRefreshToken,
  spotifyTokenTimestamp,
} from "../constants";

export const clearAccessTokens = () => {
  window.localStorage.removeItem(spotifyTokenTimestamp);
  window.localStorage.removeItem(spotifyAccessToken);
  window.localStorage.removeItem(spotifyRefreshToken);
};

export const setItem = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

export const getItem = (key: string): string | null => {
  return window.localStorage.getItem(key);
};
