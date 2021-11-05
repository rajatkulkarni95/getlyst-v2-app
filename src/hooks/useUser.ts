import useSWR from "swr";
import { fetcherWithToken } from "../utils/fetcher";

export const useUser = () => {
  const { data, mutate, error } = useSWR(
    "https://api.spotify.com/v1/me",
    fetcherWithToken
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
