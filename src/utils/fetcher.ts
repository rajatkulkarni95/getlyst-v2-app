// A simple fetch that'll be used in swr for data fetching

import { getAccessToken } from "./spotify/tokenFetch";

export async function fetcherWithToken<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const token = await getAccessToken();

  if (!token) {
    throw new Error();
  }

  const res = await fetch(input, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export async function fetcherWithoutToken<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, {
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}
