import { extendTheme } from "@chakra-ui/react";
import { BLUE, GREEN, LIGHT_GREY, PRIMARY, WHITE } from "../static/styles";
import { ButtonStyles as Button } from "./ButtonStyles";

export const customTheme = extendTheme({
  colors: {
    transparent: "transparent",
    black: "#1F2223",
    white: WHITE,
    primary: PRIMARY,
    blue: BLUE,
    purple: "#908DFF",
    secondary: "#F99136",
    green: GREEN,
    lightBlue: "#E6F5FB",
    lightOrange: "#FFEFE2",
    lightGreen: "#EBFDEE",
    lightPurple: "#725DFF",
    lightGrey: LIGHT_GREY,
    lightGrey1: "#CBCED1",
  },
  components: {
    Button,
    // Input,
  },
});
