import React from "react";

import { Routes, Route } from "react-router-dom";
import MainContent from "../components/mainContent/mainContent";
import ErrorPage from "../pages/Error/ErrorPage";
import SimpleImgGenerator from "../pages/SimpleImgGenerator/SimpleImgGenerator";
import AdvancedIMgGenerator from "../pages/AdvancedIMgGenerator/AdvancedIMgGenerator";
import HomePage from "../pages/HomePage/HomePage";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/simple" element={<SimpleImgGenerator />} />
        <Route path="/advanced" element={<AdvancedIMgGenerator />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default Layout;
