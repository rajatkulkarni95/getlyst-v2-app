import { EXPIRATION_TIME } from "../../constants";
import { apiUrl } from "../env";
import { fetcherWithoutToken } from "../fetcher";
import { getHashParams, removeHashParamsFromUrl } from "../hashParams";
import {
  getLocalAccessToken,
  getLocalRefreshToken,
  getTokenTimestamp,
  setLocalAccessToken,
  setLocalRefreshToken,
} from "./tokenStore";

type RefreshResponse = {
  access_token: string;
};

// Refresh the token
export const refreshAccessToken = async () => {
  try {
    const refresh_token = getLocalRefreshToken();
    const { access_token } = await fetcherWithoutToken<RefreshResponse>(
      `${apiUrl}/spotify/refresh-token/${refresh_token}`
    );
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
};

// Get access token off of query params (called on application init)
export const getAccessToken = () => {
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
};
