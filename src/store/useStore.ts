import create, { GetState, SetState, State, StoreApi } from "zustand";

import createPlaylistSlice, {
  PlaylistSlice,
  PlaylistCommon,
} from "./playlistSlice";

export type SliceStateCreator<
  S extends State,
  C extends State = { PlaylistSlice: any }, // The common part accessible by the slice
  T extends S = S & C,
  CustomSetState = SetState<T>
> = (set: CustomSetState, get: GetState<T>, api: StoreApi<T>) => S;

interface IStore extends PlaylistSlice {}

const useStore = create<IStore>(
  (set, get, api): IStore => ({
    ...createPlaylistSlice(
      set as unknown as SetState<PlaylistSlice & PlaylistCommon>,
      get as unknown as GetState<PlaylistSlice & PlaylistCommon>,
      api as unknown as StoreApi<PlaylistSlice & PlaylistCommon>
    ),
    // ...createFishSlice(
    //   set as unknown as SetState<FishSlice & FishCommon>,
    //   get as unknown as GetState<FishSlice & FishCommon>,
    //   api as unknown as StoreApi<FishSlice & FishCommon>
    // ),
  })
);

export default useStore;
