import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { config } from "config";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: config.spotifyClientID,
      clientSecret: config.spotifyClientSecret,
    }),
    // ...add more providers here
  ],
});
