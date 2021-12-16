import { darken, mode, whiten } from "@chakra-ui/theme-tools";

export const ButtonStyles = {
    // style object for base or default style
    baseStyle: {},
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
        secondaryOutline: (props) => ({
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
    defaultProps: {},
  };
