import { SliceStateCreator } from "./useStore";

export interface UserCommon {
  user: object;
}

export interface UserSlice {
  setUser: (user: object) => void;
}

const createUserSlice: SliceStateCreator<UserSlice, UserCommon> = (
  set,
  get,
  api
): UserSlice => ({
  setUser: (user: object) => {
    set({ user });
  },
});

export default createUserSlice;
