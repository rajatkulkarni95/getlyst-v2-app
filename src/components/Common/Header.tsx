import { styled } from "@stitches/react";
import { Box } from "styles";
import { Text } from "@components/Common/Text";
import useStore from "store/useStore";
import { useEffect } from "react";
import { fetchUserFromDatabase } from "services/user";
import { useUser } from "@hooks/useUser";
import { TUserProfileData } from "types/user";

const Navigation = styled("nav", {
  display: "flex",
  alignItems: "center",
});

const Header: React.FC = () => {
  const { user, mutate, loggedOut } = useUser();
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    async function fetchUser() {
      if (user) {
        const userData = await fetchUserFromDatabase(user.email);
        setUser(userData);
      }
    }
    fetchUser();
  }, [user]);

  return (
    <Box
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 0",
        marginBottom: "24px",
      }}
    >
      <Text size="3" css={{ color: "$primaryText" }}>
        GetLyst
      </Text>
      <Text size="2" css={{ color: "$primaryText" }}>
        {user?.id}
      </Text>
    </Box>
  );
};

export default Header;
