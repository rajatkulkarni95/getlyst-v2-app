import { styled } from "../../../stitches.config";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getWithToken } from "@utils/fetcher";

const Text = styled("p", {
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

type Playlist = {};

export default function Playlist() {
  const router = useRouter();
  const { playlistId } = router.query;

  const { data, error } = useSWR(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    getWithToken
  );

  return (
    <Text as="h1" size="3">
      Playlist ${data?.name}
    </Text>
  );
}
