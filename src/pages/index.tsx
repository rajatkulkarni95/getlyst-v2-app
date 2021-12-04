import type { NextPage } from "next";
import Head from "next/head";
import { Button } from "@components/Common/Button";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Heading } from "@components/Common/Text";
import router from "next/router";
import { PageContainer } from "styles";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  if (isUser) {
    router.push("/dashboard");
  }

  return (
    <PageContainer>
      <Head>
        <title>Getlyst - Playlist Generator</title>
      </Head>
      <Heading>GetLyst - Better Playlist Creation</Heading>

      <Button type="primary" onClick={() => signIn("spotify")}>
        Log in with Spotify
      </Button>
    </PageContainer>
  );
};

export default Home;
