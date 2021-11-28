import { SliceStateCreator } from "./useStore";

export interface PlaylistCommon {
  stepNumber: number;
}

export type TGenres = string[];

export interface PlaylistSlice {
  selectedGenres: TGenres;
  name: string;
  setGenres: (genres: string[]) => void;
  //   onNextStep: () => void;
  //   onBack: () => void;
}

const createPlaylistSlice: SliceStateCreator<PlaylistSlice, PlaylistCommon> = (
  set,
  get,
  api
): PlaylistSlice => ({
  name: "GetLyst 1729 - Summer Playlist",
  selectedGenres: [],
  setGenres: (genres: string[]) => {
    set({ selectedGenres: genres });
  },
  //   onNextStep: () => {
  //     set((prev) => ({ stepNumber: prev.stepNumber + 1 }));
  //   },
  //   onBack: () => {
  //     set((prev) => ({ stepNumber: prev.stepNumber - 1 }));
  //   },
});

export default createPlaylistSlice;
