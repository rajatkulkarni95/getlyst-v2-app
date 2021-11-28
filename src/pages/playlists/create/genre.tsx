import { Button } from "@components/Common/Button";
import { Header, Text } from "@components/Common/Text";
import { Genre } from "@components/Playlist/Genre";
import { getWithToken } from "@utils/fetcher";
import { NextPage } from "next";
import router from "next/router";
import { useState } from "react";
import useStore from "store/useStore";
import { Box, FlexColumn } from "styles";
import useSWR from "swr";

type DataType = {
  genres: string[];
};

const SelectGenres: NextPage = () => {
  const { data, error } = useSWR<DataType, Error>(
    "https://api.spotify.com/v1/recommendations/available-genre-seeds",
    getWithToken
  );

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const setGenres = useStore((state) => state.setGenres);

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

  const onNextStep = () => {
    setGenres(selectedGenres);
    router.push("/playlists/create/length");
  };

  const onClickBack = () => {
    router.push("/dashboard");
  };

  return (
    <FlexColumn>
      <Box css={{ display: "flex", alignItems: "center" }}>
        <Button
          type="secondary"
          onClick={onClickBack}
          css={{ width: "70px", marginRight: "16px" }}
        >
          Back
        </Button>
        <Text size="2" css={{ margin: "16px 0", color: "$secondaryText" }}>
          Step 1
        </Text>
      </Box>
      <Header size="2" css={{ marginBottom: "24px", color: "$primaryText" }}>
        Select Genres
      </Header>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data?.genres?.map((genre: string) => {
          const isSelected = selectedGenres.includes(genre);
          return (
            <Genre
              onClick={() => handleGenreAddition(genre)}
              key={genre}
              selected={isSelected}
              css={{ fontSize: "14px" }}
            >
              {genre}
            </Genre>
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
        onClick={onNextStep}
      >
        Next Step
      </Button>
    </FlexColumn>
  );
};

export default SelectGenres;
