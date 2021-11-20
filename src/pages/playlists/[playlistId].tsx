import { styled } from "../../../stitches.config";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getWithToken } from "@utils/fetcher";
import { PlaylistData } from "types/playlist";
import PlaylistImage from "@components/Playlist/PlaylistImage";

const Text = styled("p", {
  fontFamily: "$system",
  color: "$hiContrast",
  margin: "16px 0",
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

export default function Playlist() {
  const router = useRouter();
  const { playlistId } = router.query;

  const { data, error } = useSWR<PlaylistData>(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    getWithToken
  );

  const playlistImages = data?.images;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "24px",
        maxWidth: "400px",
      }}
    >
      <button
        type="button"
        onClick={() => router.back()}
        style={{ margin: "16px" }}
      >
        Back
      </button>
      <Text size={3}>{data?.name}</Text>
      {playlistImages && <PlaylistImage images={playlistImages} />}
    </div>
  );
}
