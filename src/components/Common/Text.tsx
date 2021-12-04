import { styled } from "../../../stitches.config";

export const Text = styled("p", {
  color: "$primaryText",
  variants: {
    size: {
      1: {
        fontSize: "$1",
        fontWeight: 400,
      },
      2: {
        fontSize: "$2",
        fontWeight: 400,
      },
      3: {
        fontSize: "$3",
        fontWeight: 500,
      },
      4: {
        fontSize: "$4",
        fontWeight: 500,
      },
      5: {
        fontSize: "$5",
        fontWeight: 700,
      },
    },
    color: {
      secondary: {
        color: "$secondaryText",
      },
    },
  },
});

export const Heading = styled("h1", {
  color: "$primaryText",
  variants: {
    size: {
      1: {
        fontSize: "$7",
        fontWeight: 700,
      },
      2: {
        fontSize: "$8",
        fontWeight: 700,
      },
      3: {
        fontSize: "$9",
        fontWeight: 700,
      },
    },
    color: {
      secondary: {
        color: "$secondaryText",
      },
    },
  },
});
