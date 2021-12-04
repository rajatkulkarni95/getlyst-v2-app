import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { styled } from "../../../stitches.config";
import { AuthPageType } from "types/protectedPage";
import { PageContainer } from "styles";

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
  data: { items: [] };
};

const Playlists: AuthPageType = () => {
  const [playlists, setPlaylists] = useState<DataType>();

  useEffect(() => {
    async function fetchPlaylists() {
      const result = await fetch("/api/spotify/playlists");
      const response = await result.json();
      setPlaylists(response);
    }

    fetchPlaylists();
  }, []);

  return (
    <PageContainer>
      <Container>
        <Head>
          <title>GetLyst - Playlists</title>
        </Head>
        {playlists?.data?.items?.map((playlist: PlaylistType) => (
          <PlaylistLink href={`/playlists/${playlist.id}`}>
            {playlist.name}
          </PlaylistLink>
        ))}
      </Container>
    </PageContainer>
  );
};

export default Playlists;

Playlists.auth = true;
