import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import LoadingPage from "../pages/Loading/LoadingPage";
import axios from "axios";

const Layout = () => {
  const initialImageArray = [];
  sessionStorage.setItem("recentImages", JSON.stringify(initialImageArray));
  const [user, setUser] = useState({});
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      let theUserObj = JSON.parse(theUser);
      async function fetchData() {
        const res = await axios.get("http://localhost:8080/user/verify", {
          headers: {
            Authorization: theUserObj.token,
            accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (res.data.success) setUser(JSON.parse(theUser));
        else {
          localStorage.removeItem("user");
        }
      }
      fetchData();
    }
    setTimeout(() => {
      setloading(false);
    }, 500);
  }, []);
  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <Routes>
          <Route path="/simple" element={<SimpleImgGenPage />} />
          <Route path="/" element={<Landing />} />

          <Route
            path="/advanced"
            element={
              user?.email ? <AdvancesImgGenPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/docs"
            element={user?.email ? <DocsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/API"
            element={user?.email ? <ApiPage /> : <Navigate to="/login" />}
          />
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
      )}
    </>
  );
};

export default Layout;
