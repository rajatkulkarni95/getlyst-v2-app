import create, { GetState, SetState, State, StoreApi } from "zustand";

import createPlaylistSlice, {
  PlaylistSlice,
  PlaylistCommon,
} from "./playlistSlice";

import createUserSlice, { UserCommon, UserSlice } from "./userSlice";

export type SliceStateCreator<
  S extends State,
  C extends State = { PlaylistSlice: any; UserSlice: any }, // The common part accessible by the slice
  T extends S = S & C,
  CustomSetState = SetState<T>
> = (set: CustomSetState, get: GetState<T>, api: StoreApi<T>) => S;

interface IStore extends PlaylistSlice, UserSlice {}

const useStore = create<IStore>(
  (set, get, api): IStore => ({
    ...createPlaylistSlice(
      set as unknown as SetState<PlaylistSlice & PlaylistCommon>,
      get as unknown as GetState<PlaylistSlice & PlaylistCommon>,
      api as unknown as StoreApi<PlaylistSlice & PlaylistCommon>
    ),
    ...createUserSlice(
      set as unknown as SetState<UserSlice & UserCommon>,
      get as unknown as GetState<UserSlice & UserCommon>,
      api as unknown as StoreApi<UserSlice & UserCommon>
    ),
  })
);

export default useStore;
