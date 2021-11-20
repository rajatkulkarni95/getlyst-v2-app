import { EXPIRATION_TIME } from "../../constants";
import { apiUrl } from "../env";
import { getWithoutToken, refreshToken } from "../fetcher";
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
    const refresh_token = await getLocalRefreshToken();
    const payload = {
      refresh_token: refresh_token,
    };
    const { access_token } = await refreshToken<RefreshResponse>(
      `${apiUrl}/spotify/refresh_token`,
      payload
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

  // If the tokens are present in the hash params, set them to local storage, and return out of the function
  if (access_token && refresh_token) {
    setLocalRefreshToken(refresh_token);
    setLocalAccessToken(access_token);

    return access_token;
  }

  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  // If token has expired
  const tokenTimestamp = getTokenTimestamp();

  if (tokenTimestamp) {
    if (Date.now() - Number(tokenTimestamp) > EXPIRATION_TIME) {
      console.warn("Access token has expired, refreshing...");

      refreshAccessToken();
    }
  }

  const localAccessToken = getLocalAccessToken();

  removeHashParamsFromUrl();

  return localAccessToken;
};
