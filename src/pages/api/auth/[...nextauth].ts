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
  session: {
    strategy: "jwt",
  },
  secret: config.spotifyClientSecret,
  callbacks: {
    async jwt({ token, user, account = {}, profile, isNewUser }) {
      if (account?.provider && !token[account.provider]) {
        token[account.provider] = {};
      }

      if (
        account?.provider &&
        token[account.provider] &&
        account?.access_token
      ) {
        token[account.provider].accessToken = account.access_token;
      }

      if (account?.refresh_token) {
        token[account.provider].refreshToken = account.refresh_token;
      }
      return token;
    },

    async session({ session, token, user }) {
      if (token?.sub) {
        session.user.sub = token.sub;
      }
      console.log("session", session);
      return session;
    },
  },
});
