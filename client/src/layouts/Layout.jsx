import React, { useEffect, useState } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
// import MainContent from "../components/mainContent/mainContent";
// import ErrorPage from "../pages/Error/ErrorPage";
// import SimpleImgGenerator from "../pages/SimpleImgGenerator/SimpleImgGenerator";
// import AdvancedIMgGenerator from "../pages/AdvancedIMgGenerator/AdvancedIMgGenerator";
// import HomePage from "../pages/HomePage/HomePage";
// import DocsPages from "../pages/documentPage/DocsPages";
// import ApiPage from "../pages/ApiPage/ApiPage";
import {
  Home,
  Signup,
  DocsPage,
  SimpleImgGenPage,
  AdvancesImgGenPage,
  ErrorPage,
  Login,
  ApiPage,
  Landing,
} from "../pages";

const Layout = () => {
  const initialImageArray = [];
  sessionStorage.setItem("recentImages", JSON.stringify(initialImageArray));
  const [user, setUser] = useState({});
  useEffect(() => {
    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      setUser(JSON.parse(theUser));
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/simple" element={<SimpleImgGenPage />} />
        <Route path="/" element={<Landing />} />

        <Route
          path="/advanced"
          element={
            user?.email ? <AdvancesImgGenPage /> : <Navigate to="/simple" />
          }
        />
        <Route
          path="/docs"
          element={user?.email ? <Navigate to="/" /> : <DocsPage />}
        />
        <Route path="/API" element={<ApiPage />} />
        <Route
          path="/home"
          element={user?.email ? <Home user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={user?.email ? <Navigate to="/home" /> : <Signup />}
        />
        <Route
          path="/login"
          element={user?.email ? <Navigate to="/home" /> : <Login />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default Layout;
