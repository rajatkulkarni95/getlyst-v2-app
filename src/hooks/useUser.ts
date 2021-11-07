import useSWR from "swr";
import { getWithToken } from "../utils/fetcher";

export const useUser = () => {
  const { data, mutate, error } = useSWR(
    "https://api.spotify.com/v1/me",
    getWithToken
  );

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
};
