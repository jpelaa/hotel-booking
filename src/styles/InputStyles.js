import { darken, mode, whiten } from "@chakra-ui/theme-tools";

export const InputStyles = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: (props) => ({
      color: "primary",
      borderColor: "primary",
      bg: "white",
      _hover: {
        bg: mode(whiten("primary", 20), darken("primary", 20))(props),
        boxShadow: "md",
      },
      _focus: {
        borderColor: "primary",
      },
    }),
    secondary: (props) => ({
      bg: "secondary",
      color: "white",
      _hover: {
        bg: mode(whiten("secondary", 20), darken("secondary", 20))(props),
        boxShadow: "md",
      },
    }),
    primaryOutline: (props) => ({
      bg: "transparent",
      border: "1px solid",
      borderColor: "secondary",
      color: "secondary",
      transition: "all 200ms ease",
      _hover: {
        boxShadow: "md",
        transform: "scale(1.02)",
      },
    }),
  },
  // default values for `size` and `variant`
  defaultProps: {
    variant: "primary",
  },
};
