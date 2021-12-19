import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import NavBar from "../components/NavBar";
import AddGuest from "../layouts/addguest";
import Home from "../layouts/home";

export default function App() {
  return (
    <Router>
      <Box px="10">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guest/add" element={<AddGuest />} />
        </Routes>
      </Box>
    </Router>
  );
}
