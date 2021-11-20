import { globalCss } from "@stitches/react";
import type { AppProps } from "next/app";

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

function App({ Component, pageProps }: AppProps) {
  globalStyles();
  return <Component {...pageProps} />;
}

export default App;
