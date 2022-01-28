import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "./styles/theme";
import { HotelProvider } from "./contexts/hotel-context";
import { detect } from 'detect-browser';

  const browser = detect();

  // handle the case where we don't detect the browser
  if (browser) {
    console.log(browser.name);
    console.log(browser.version);
    console.log(browser.os);
  }
  console.log(browser, ' browser details ');
  alert(JSON.stringify(browser));

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
