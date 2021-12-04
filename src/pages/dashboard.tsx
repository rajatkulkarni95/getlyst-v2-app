import Head from "next/head";
import Link from "next/link";
import { AuthPageType } from "types/protectedPage";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@components/Common/Button";
import { Heading } from "@components/Common/Text";

const Dashboard: AuthPageType = () => {
  const { data: session } = useSession();

  return (
    <div>
      <Head>
        <title>Dashboard - GetLyst</title>
      </Head>
      {session?.user && (
        <div>
          <Heading>Welcome, {session.user.sub}</Heading>{" "}
          <Link href="/playlists">Playlists</Link>
          <Button type="secondary" onClick={() => signOut()}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

Dashboard.auth = true;
