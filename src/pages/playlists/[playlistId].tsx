import { styled } from "../../../stitches.config";
import { useRouter } from "next/router";

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

export default function Playlist() {
  const router = useRouter();
  const { playlistId } = router.query;
  return (
    <Text as="h1" size="3">
      Hello, from Stitches. Playlist ID is {playlistId}
    </Text>
  );
}
