import { Button } from "@components/Common/Button";
import { Heading, Text } from "@components/Common/Text";
import { Genre } from "@components/Playlist/Genre";
import { popularGenres, restGenres } from "data/genreSeeds";
import { NextPage } from "next";
import router from "next/router";
import Image from "next/image";
import { useState } from "react";
import useStore from "store/useStore";
import { Box, FlexColumn } from "styles";

const SelectGenres: NextPage = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [localPopularGenres, setLocalPopularGenres] =
    useState<string[]>(popularGenres);
  const [localRestGenres, setLocalRestGenres] = useState<string[]>(restGenres);

  const setGenres = useStore((state) => state.setGenres);

  const handleGenreAddition = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      const updatedGenres = selectedGenres.filter((g) => g !== genre);
      setSelectedGenres(updatedGenres);
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const onNextStep = () => {
    setGenres(selectedGenres);
    router.push("/playlists/create/length");
  };

  const onClickBack = () => {
    router.push("/dashboard");
  };

  const blankBoxes = [1, 2, 3, 4, 5];

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
      <Heading size="2" css={{ marginBottom: "24px", color: "$primaryText" }}>
        Select Genres
      </Heading>
      <Text size="2" css={{ margin: "8px 0", color: "$primaryText" }}>
        Popular Genres
      </Text>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {popularGenres.map((genre: string) => {
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
      <Text size="2" css={{ margin: "8px 0", color: "$primaryText" }}>
        The Rest
      </Text>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {restGenres.map((genre: string) => {
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
      <Box css={{ margin: "24px", display: "flex", justifyContent: "center" }}>
        {blankBoxes.map((box) => (
          <Box
            css={{
              width: "150px",
              height: "150px",
              border: `1px solid $secondaryText`,
              borderRadius: "4px",
              margin: "0 16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "$2",
              color: "$secondaryText",
            }}
          >
            {selectedGenres[box] ? selectedGenres[box] : "+"}
          </Box>
        ))}
      </Box>
    </FlexColumn>
  );
};

export default SelectGenres;
