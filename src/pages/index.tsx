import type { NextPage } from "next";
import Router from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { removeHashParamsFromUrl } from "../utils/hashParams";
import { clearAccessTokens } from "../utils/localStorage";

const Home: NextPage = () => {
  const { user } = useUser();

  // if logged in, redirect to the dashboard
  useEffect(() => {
    if (user) {
      Router.replace("/dashboard");
    }
  }, [user]);

  return (
    <div>
      <Head>
        <title>Getlyst - Playlist Generator</title>
      </Head>
      <h1>GetLyst - Better Playlist Creation</h1>

      <a href="http://localhost:8080/api/v1/login?service=spotify">
        Login to Spotify
      </a>
    </div>
  );
};

export default Home;
