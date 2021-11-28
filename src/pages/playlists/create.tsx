import { Button } from "@components/Common/Button";
import { Header, Text } from "@components/Common/Text";
import { GenreSelect } from "@components/Playlist/GenreSelect";
import { getWithToken } from "@utils/fetcher";
import { NextPage } from "next";
import { useState } from "react";
import { FlexColumn } from "styles";
import useSWR from "swr";

type DataType = {
  genres: string[];
};

const CreatePlaylist: NextPage = () => {
  const { data, error } = useSWR<DataType, Error>(
    "https://api.spotify.com/v1/recommendations/available-genre-seeds",
    getWithToken
  );

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleGenreAddition = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      const updatedGenres = selectedGenres.filter((g) => g !== genre);
      setSelectedGenres(updatedGenres);
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  if (error) {
    return <Text size="4">Oops! Something went wrong</Text>;
  }

  return (
    <FlexColumn>
      <Text size="2" css={{ margin: "16px 0", color: "$secondaryText" }}>
        Step 1
      </Text>
      <Header size="2" css={{ marginBottom: "24px", color: "$primaryText" }}>
        Select Genres
      </Header>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data?.genres?.map((genre: string) => {
          const isSelected = selectedGenres.includes(genre);
          return (
            <GenreSelect
              onClick={() => handleGenreAddition(genre)}
              key={genre}
              selected={isSelected}
              css={{ fontSize: "14px" }}
            >
              {genre}
            </GenreSelect>
          );
        })}
      </div>
      <Button
        type="primary"
        css={{
          margin: "24px 0",
          fontWeight: "bold",
          alignSelf: "center",
          padding: "12px",
        }}
      >
        Next Step
      </Button>
    </FlexColumn>
  );
};

export default CreatePlaylist;
