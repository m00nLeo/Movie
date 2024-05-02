import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";
import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";
import axios from "axios";
import { SkeletonTheme } from "react-loading-skeleton";

require("dotenv").config();

function App() {
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN_KEY;

  const apiUrl = "https://movie-2a6b.onrender.com";

  const authAxios = axios.create({
    baseURL: apiUrl,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return (
    <SkeletonTheme baseColor="#473a39" highlightColor="#ce9e9e">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<Browse authAxios={authAxios} accessToken={accessToken} />}
          />
          <Route
            path="/search"
            element={<Search accessToken={accessToken} />}
          />
          <Route
            path="*"
            element={<NotFound />}
            render={() => <Navigate to="/error" />}
          />
        </Routes>
      </BrowserRouter>
    </SkeletonTheme>
  );
}

export default App;
