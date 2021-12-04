import Head from "next/head";
import Link from "next/link";
import { AuthPageType } from "types/protectedPage";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@components/Common/Button";
import { Heading } from "@components/Common/Text";
import { styled } from "../../stitches.config";
import { PageContainer } from "styles";

const StyledText = styled("p", {
  margin: "8px",
  padding: "8px",
  color: "$primaryText",
  textDecoration: "inherit",
  cursor: "pointer",
  background: "none",
  maxWidth: "200px",
  borderRadius: "4px",

  "&:hover": {
    background: "$primary",
  },
});

const Dashboard: AuthPageType = () => {
  const { data: session } = useSession();

  return (
    <PageContainer>
      <Head>
        <title>Dashboard - GetLyst</title>
      </Head>
      {session?.user && (
        <div>
          <Heading>Welcome, {session.user.sub}</Heading>{" "}
          <Link href="/playlists">
            <StyledText>Playlists</StyledText>
          </Link>
          <Link href="/playlists/create/genre">
            <StyledText>Create new playlist</StyledText>
          </Link>
          <Button type="secondary" onClick={() => signOut()}>
            Logout
          </Button>
        </div>
      )}
    </PageContainer>
  );
};

export default Dashboard;

Dashboard.auth = true;
