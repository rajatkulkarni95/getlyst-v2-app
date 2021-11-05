import { getHashParams, removeHashParamsFromUrl } from "../utils/hashParams";
import {
  spotifyAccessToken,
  spotifyRefreshToken,
  spotifyTokenTimestamp,
} from "../constants";
import { useEffect, useState } from "react";
import { getItem, setItem } from "../utils/localStorage";
import { useStore } from "../store";

// TOKENS
const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds

export const useAuth = () => {
  useEffect(() => {
    const localAccessToken = getAccessToken();
    useStore.setState({ token: localAccessToken });
  }, []);
  // Set to Local Storage

  const setTokenTimestamp = () => {
    setItem(spotifyTokenTimestamp, String(Date.now()));
  };
  const setLocalAccessToken = (token: string) => {
    setTokenTimestamp();
    setItem(spotifyAccessToken, token);
  };
  const setLocalRefreshToken = (token: string) =>
    setItem(spotifyRefreshToken, token);

  // Retrieve from Local Storage
  const getTokenTimestamp = () => getItem(spotifyTokenTimestamp);
  const getLocalAccessToken = () => getItem(spotifyAccessToken);
  const getLocalRefreshToken = () => getItem(spotifyRefreshToken);

  // Refresh the token
  const refreshAccessToken = async () => {
    try {
      const refresh_token = getLocalRefreshToken();
      const { data } = await fetch(
        `http://localhost:8080/api/v1/spotify/refresh-token/${refresh_token}`
      );
      const { access_token } = data;
      setLocalAccessToken(access_token);
      window.location.reload();
      return;
    } catch (e) {
      console.error(e);
    }
  };

  // Get access token off of query params (called on application init)
  const getAccessToken = () => {
    const { error, access_token, refresh_token } = getHashParams();

    if (error) {
      console.error(error);
      refreshAccessToken();
    }

    // If token has expired
    if (Date.now() - Number(getTokenTimestamp()) > EXPIRATION_TIME) {
      console.warn("Access token has expired, refreshing...");

      refreshAccessToken();
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

    removeHashParamsFromUrl();

    return localAccessToken;
  };
};
