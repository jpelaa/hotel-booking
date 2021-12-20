import { extendTheme } from "@chakra-ui/react";
import { BLUE, PRIMARY, WHITE } from "../static/styles";
import { ButtonStyles as Button } from "./ButtonStyles";
import { InputStyles as Input } from "./InputStyles";

export const customTheme = extendTheme({
  colors: {
    transparent: "transparent",
    black: "#1F2223",
    white: WHITE,
    primary: PRIMARY,
    blue: BLUE,
    purple: "#908DFF",
    secondary: "#F99136",
    green: "#80CB86",
    lightBlue: "#E6F5FB",
    lightOrange: "#FFEFE2",
    lightGreen: "#EBFDEE",
    lightPurple: "#725DFF",
    lightGrey: "#EAEBED",
    lightGrey1: "#CBCED1",
  },
  components: {
    Button,
    // Input,
  },
});
