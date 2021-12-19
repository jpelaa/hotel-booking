import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./ButtonStyles";

export const customTheme = extendTheme({
  colors: {
    primary: "#2B41A1",
    secondary: "#E95186",
    highlight: "#6DBAA1",
    warning: "#FFBC58",
    danger: "#980525",
    switchPrimary: "#C4C3FF",
  },
  components: {
    Button, // Has to match to the name of the component
  },
});
