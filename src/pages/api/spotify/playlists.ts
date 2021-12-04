import { config } from "config";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken, JWT } from "next-auth/jwt";
import { TToken } from "types/token";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token: TToken | JWT | null = await getToken({
    req,
    secret: config.spotifyClientSecret,
  });

  const accessToken = token.spotify.accessToken;

  try {
    const result = await fetch("https://api.spotify.com/v1/me/playlists/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const response = await result.json();
    res.status(200).send({
      data: response,
    });
  } catch (e) {
    res.status(400).json({
      e,
    });
  }
};
