import React from "react";

const HomePage = ({ user }) => {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div
      style={{ textAlign: "center", margin: "3rem" }}
      className="flex flex-col justify-center items-center"
    >
      <h1>Dear {user?.email}</h1>
      <img style={{ borderRadius: "50px" }} src={user?.picture} alt="" />

      <p>
        You are viewing this page because you are logged in or you just signed
        up
      </p>

      <div>
        <button
          onClick={logout}
          style={{
            color: "red",
            border: "1px solid gray",
            backgroundColor: "white",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
