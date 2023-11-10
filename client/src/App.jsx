import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavbarComponent from "./components/navbarComponent/navbarComponent";
import MainContent from "./components/mainContent/mainContent";
import Layout from "./layouts/Layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className=" w-full min-h-screen scroll-smooth">
        {/* <NavbarComponent /> */}
        <Layout />
      </div>
    </>
  );
}

export default App;
