import { styled } from "../../../stitches.config";

export const GenreSelect = styled("div", {
  borderRadius: "12px",
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "$accent",
  color: "$background",
  padding: "6px 12px",
  margin: "8px",
  cursor: "pointer",
  fontSize: "$2",

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
