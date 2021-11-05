// A simple fetch that'll be used in swr for data fetching

import { spotifyAccessToken } from "../constants";
import { getItem } from "./localStorage";

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const token = await getItem(spotifyAccessToken);
  const res = await fetch(input, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export async function noAuthFetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, {
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}
