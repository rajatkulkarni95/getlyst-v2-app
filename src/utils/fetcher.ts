// A simple fetch that'll be used in swr for data fetching

import { getAccessToken } from "./spotify/tokenFetch";

export async function getWithToken<T>(
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

export async function post<T>(
  input: RequestInfo,
  body: object,
  init?: RequestInit
): Promise<T> {
  const token = await getAccessToken();

  if (!token) {
    throw new Error();
  }

  const res = await fetch(input, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function getWithoutToken<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input);
  return res.json();
}
