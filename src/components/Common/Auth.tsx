import { useSession } from "next-auth/react";
import router from "next/router";
import { useEffect } from "react";

interface Props {
  children: JSX.Element;
}

const Auth: React.FC<Props> = ({ children }): JSX.Element => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!isUser) {
      router.push("/");
    } // If not authenticated, force log in
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
};

export default Auth;
