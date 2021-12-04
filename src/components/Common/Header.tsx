import { styled } from "@stitches/react";
import { Box, PageContainer } from "styles";
import { Text } from "@components/Common/Text";
import { TUserProfileData } from "types/user";
import { useSession } from "next-auth/react";

const Navigation = styled("nav", {
  display: "flex",
  alignItems: "center",
});

const Header: React.FC = () => {
  const { data: session } = useSession();
  return (
    <PageContainer>
      <Box
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 0",
          marginBottom: "24px",
        }}
      >
        <Text size="3">GetLyst</Text>
        <Text size="2">{session?.user.sub}</Text>
      </Box>
    </PageContainer>
  );
};

export default Header;
