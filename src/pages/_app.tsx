import { globalCss } from "@stitches/react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Auth from "@components/Common/Auth";
import { AuthPageType } from "types/protectedPage";

const globalStyles = globalCss({
  "*": { margin: 0, padding: 0 },
  body: {
    height: "100vh",
    width: "80%",
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
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

export default App;
