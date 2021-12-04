import { globalCss } from "@stitches/react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Auth from "@components/Common/Auth";
import { AuthPageType } from "types/protectedPage";
import Header from "@components/Common/Header";
import React from "react";

const globalStyles = globalCss({
  "*": { margin: 0, padding: 0 },
  body: {
    height: "100vh",
    display: "block",
    margin: "0 auto",
    fontFamily: "$sans",
    background: "$background",
  },
});

interface AuthAppProps extends AppProps {
  Component: AuthPageType;
}

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AuthAppProps) {
  globalStyles();
  return (
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
    <SessionProvider session={session} refetchInterval={5 * 60}>
      {Component.auth ? (
        <React.Fragment>
          <Header />
          <Auth>
            <Component {...pageProps} />
          </Auth>
        </React.Fragment>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

export default App;
