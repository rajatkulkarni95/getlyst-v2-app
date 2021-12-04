export type TToken = {
  name: string;
  email: string;
  picture: string;
  sub: string;
  spotify: {
    accessToken: string;
    refreshToken: string;
  };
};
