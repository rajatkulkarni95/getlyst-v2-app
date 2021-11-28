import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { getWithToken } from "@utils/fetcher";
import { styled } from "../../../stitches.config";
import Header from "@components/Common/Header";

type PlaylistType = {
  id: string;
  name: string;
};

const PlaylistLink = styled(Link, {
  color: "$primaryText",
  margin: "8px 0",
  variants: {
    size: {
      1: {
        fontSize: "$1",
      },
      2: {
        fontSize: "$2",
      },
      3: {
        fontSize: "$3",
      },
    },
  },
});

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
});

type DataType = {
  items: [];
};

const Playlists: NextPage = () => {
  const { data, error } = useSWR<DataType, Error>(
    "https://api.spotify.com/v1/me/playlists/",
    getWithToken
  );

  return (
    <Container>
      <Header />
      <Head>
        <title>GetLyst - Playlists</title>
      </Head>
      {data?.items?.map((playlist: PlaylistType) => (
        <PlaylistLink href={`/playlists/${playlist.id}`}>
          {playlist.name}
        </PlaylistLink>
      ))}
    </Container>
  );
};

export default Playlists;
