import { styled } from "../../stitches.config";

export const FlexColumn = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const Box = styled("div");

export const PageContainer = styled("div", {
  margin: "0 auto",
  width: "1000px",
  "@bp1": {
    width: "90%",
  },
});
