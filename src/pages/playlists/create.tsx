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

  return (
    <FlexColumn>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data?.genres?.map((genre: string) => {
          const isSelected = selectedGenres.includes(genre);
          return (
            <GenreSelect
              onClick={() => handleGenreAddition(genre)}
              key={genre}
              selected={isSelected}
            >
              {genre}
            </GenreSelect>
          );
        })}
      </div>
    </FlexColumn>
  );
};

export default CreatePlaylist;
