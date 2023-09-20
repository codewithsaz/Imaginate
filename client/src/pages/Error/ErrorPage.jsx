import React from "react";

const ErrorPage = () => {
  return (
    <div className="w-full h-[calc(100%-5rem)]  flex justify-center p-2">
      <div className=" lg:w-3/5 h-full  flex flex-col items-center gap-10 p-2 ">
        <h1 className=" text-3xl lg:text-5xl ">No Page</h1>
      </div>
    </div>
  );
};

export default ErrorPage;
