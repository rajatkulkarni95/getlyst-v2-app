import { NextPage } from "next";

export type AuthPageType = NextPage & {
  auth: boolean;
};
