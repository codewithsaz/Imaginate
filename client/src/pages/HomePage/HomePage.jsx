import React from "react";

const HomePage = ({ user }) => {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div className=" w-full flex flex-col justify-center items-center">
      <div className=" flex flex-col justify-center items-center gap-2 ">
        <h1 className="text-6xl">
          Unleash your{" "}
          <span className=" text-green-600 font-bold"> Creativity</span>
        </h1>
        <h1 className="text-6xl">with our</h1>
        <h1 className="text-6xl">
          <span className=" text-green-600 font-bold">AI Image </span>
          Generator
        </h1>
      </div>
    </div>
    // <div
    //   style={{ textAlign: "center", margin: "3rem" }}
    //   className="flex flex-col justify-center items-center"
    // >
    //   <h1>Dear {user?.email}</h1>
    //   <img
    //     className=" w-16"
    //     style={{ borderRadius: "50px" }}
    //     src={user?.picture}
    //     alt=""
    //   />

    //   <p>
    //     You are viewing this page because you are logged in or you just signed
    //     up
    //   </p>

    //   <div>
    //     <button
    //       onClick={logout}
    //       style={{
    //         color: "red",
    //         border: "1px solid gray",
    //         backgroundColor: "white",
    //         padding: "0.5rem 1rem",
    //         cursor: "pointer",
    //       }}
    //     >
    //       Logout
    //     </button>
    //   </div>
    // </div>
  );
};

export default HomePage;
