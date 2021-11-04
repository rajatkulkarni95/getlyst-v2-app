import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { removeHashParamsFromUrl } from "../utils/hashParams";
import { clearAccessTokens, getAccessToken } from "../utils/spotify";

const Home: NextPage = () => {
  const [accessToken, setAccessToken] = useState<string>("");

  const handleClearLocalStorage = () => {
    clearAccessTokens();
    setAccessToken("");
  };

  useEffect(() => {
    const token = getAccessToken();
    setAccessToken(token);
    removeHashParamsFromUrl();
  }, []);

  return (
    <div>
      <h1>GetLyst - Better Playlist Creation</h1>
      {accessToken ? (
        <div>
          <h2>Logged in</h2>
          <button onClick={handleClearLocalStorage}>Logout</button>
        </div>
      ) : (
        <a href="http://localhost:8080/api/v1/login?service=spotify">
          Login to Spotify
        </a>
      )}
    </div>
  );
};

export default Home;
