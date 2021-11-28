import { styled } from "../../../stitches.config";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getWithToken } from "@utils/fetcher";
import { PlaylistData } from "types/playlist";
import PlaylistImage from "@components/Playlist/PlaylistImage";
import { Text } from "@components/Common/Text";

const Container = styled("div", {
  display: "flex",
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
      <Text size={3} color="primary">
        {data?.name}
      </Text>
      {playlistImages && <PlaylistImage images={playlistImages} />}
    </div>
  );
}
