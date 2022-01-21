import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "./styles/theme";
import { HotelProvider } from "./contexts/hotel-context";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={customTheme}>
      <HotelProvider>
        <Routes />
      </HotelProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
