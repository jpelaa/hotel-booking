import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "./styles/theme";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={customTheme}>
      <Routes />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
