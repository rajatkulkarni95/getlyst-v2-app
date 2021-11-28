import { styled } from "../../../stitches.config";

export const GenreSelect = styled("div", {
  borderRadius: "12px",
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "$accent",
  color: "$background",
  padding: "4px 12px",
  margin: "8px",
  cursor: "pointer",

  "&:hover": {
    filter: "brightness(80%)",
  },

  variants: {
    selected: {
      true: {
        background: "$primary",
        color: "$primaryText",
      },
    },
  },
});
