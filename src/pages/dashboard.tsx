import { NextPage } from "next";
import { useUser } from "../hooks/useUser";
import Head from "next/head";
import { useEffect } from "react";
import Router from "next/router";
import { clearAccessTokens } from "../utils/localStorage";

const Dashboard: NextPage = () => {
  const { user, mutate, loggedOut } = useUser();

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
          <h1>Welcome, {user.id}</h1>{" "}
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