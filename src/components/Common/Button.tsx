import { styled } from "@stitches/react";

export const Button = styled("button", {
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  padding: "8px 16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "$font",
  minWidth: "150px",

  "&:hover": {
    filter: "brightness(80%)",
  },

  variants: {
    type: {
      primary: {
        background: "$primary",
        color: "$primaryText",
      },
      secondary: {
        background: "$primaryText",
        color: "$primary",
      },
    },
  },
});
