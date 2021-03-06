import { darken, mode, whiten } from "@chakra-ui/theme-tools";

export const ButtonStyles = {
  // style object for base or default style
  baseStyle: {
    borderRadius: "2xl",
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: (props) => ({
      bg: "primary",
      color: "white",
      _hover: {
        bg: mode(whiten("primary", 20), darken("primary", 20))(props),
        boxShadow: "md",
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
      bg: "white",
      border: "1px solid",
      borderColor: "primary",
      color: "primary",
      transition: "all 200ms ease",
      _hover: {
        boxShadow: "md",
        transform: "scale(1.02)",
      },
    }),
    icon: (props) => ({
      bg: "lightGrey1",
      borderColor: "primary",
      color: "primary",
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
