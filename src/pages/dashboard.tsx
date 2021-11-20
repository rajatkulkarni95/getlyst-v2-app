import { NextPage } from "next";
import { useUser } from "../hooks/useUser";
import Head from "next/head";
import { useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import { clearAccessTokens } from "../utils/localStorage";
import { fetchUserFromDatabase } from "../services/user";

const Dashboard: NextPage = () => {
  const { user, mutate, loggedOut } = useUser();

  useEffect(() => {
    async function fetchUser() {
      if (user) {
        const userData = await fetchUserFromDatabase(user.email);
        return userData;
      }
    }

    console.log(fetchUser());
  }, [user]);

  useEffect(() => {
    if (loggedOut) {
      mutate(null, false).then(() => Router.replace("/"));
    }
  }, [loggedOut]);

  return (
    <div>
      <Head>
        <title>Dashboard - GetLyst</title>
      </Head>
      {user && (
        <div>
          <h1>Welcome, {user.id}</h1> <Link href="/playlists">Playlists</Link>
          <button
            onClick={async () => {
              clearAccessTokens();
              await mutate(null); // optimistically update the data and revalidate
              Router.replace("/");
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
