import type { NextPage } from "next";
import Router from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { Button } from "@components/Common/Button";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Heading } from "@components/Common/Text";
import router from "next/router";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  if (isUser) {
    router.push("/dashboard");
  }

  return (
    <div>
      <Head>
        <title>Getlyst - Playlist Generator</title>
      </Head>
      <Heading>GetLyst - Better Playlist Creation</Heading>

      <Button type="primary" onClick={() => signIn("spotify")}>
        Log in with Spotify
      </Button>
    </div>
  );
};

export default Home;
