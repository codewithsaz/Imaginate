import React from "react";
import InputComponent from "../InputComponent/InputComponent";

const MainContent = () => {
  const initialImageArray = [];
  sessionStorage.setItem("recentImages", JSON.stringify(initialImageArray));
  return (
    <div className="w-full h-[calc(100%-5rem)]  flex justify-center p-2">
      <div className=" lg:w-3/5 h-full  flex flex-col items-center gap-10 p-2 ">
        <h1 className=" text-3xl lg:text-5xl ">Free AI Image Generator</h1>
        <p className="text-md lg:text-xl text-center">
          Convert words to images with Imagenate's free AI image generator.
          Watch your imagination transform into AI-generated images online. Free
          text to image AI generator, save time on creating or searching for the
          perfect image.
        </p>
        <div className=" h-full w-full  flex flex-col items-center gap-10 p-5">
          <InputComponent></InputComponent>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
