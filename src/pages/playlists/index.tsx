import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { styled } from "../../../stitches.config";

const PlaylistLink = styled(Link, {
  fontFamily: "$system",
  color: "$hiContrast",

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

const Playlists: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>GetLyst - Playlists</title>
      </Head>
      <PlaylistLink href="/playlists/rock">Rock</PlaylistLink>
      <PlaylistLink href="/playlists/jazz">Jazz</PlaylistLink>
      <PlaylistLink href="/playlists/pop">Pop</PlaylistLink>
    </Container>
  );
};

export default Playlists;
