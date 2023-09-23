import React from "react";
import axios from "axios";
import { Input, Button, Textarea, Spinner } from "@material-tailwind/react";

const SimpleImgGenerator = () => {
  const recentImages = JSON.parse(sessionStorage.getItem("recentImages"));
  const reversedImages = [...recentImages].reverse();
  const [loading, setLoading] = React.useState(false);

  const [prompt, setPrompt] = React.useState("cute baby portrait");
  const [negativePrompt, setnegativePrompt] = React.useState("");
  const [seed, setSeed] = React.useState("-1");
  const [data, setData] = React.useState("");
  const onPromptChange = ({ target }) => setPrompt(target.value);
  const onSeedChange = ({ target }) => setSeed(target.value);
  const onNegativePromptChange = ({ target }) =>
    setnegativePrompt(target.value);
  const handleClick = async (e) => {
    setLoading(true);
    const response = await axios.post(
      "http://127.0.0.1:7860/sdapi/v1/txt2img",
      // '{\n    "prompt": "maltese puppy",\n    "steps": 5\n}',
      {
        prompt: prompt,
        seed: -1,
        sampler_name: "DPM++ 2M Karras",
        steps: 20,
        cfg_scale: 7,
        sampler_index: "DPM++ 2M Karras",
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    setData(response.data.images[0]);
    setLoading(false);
    recentImages.push(response.data.images[0]);
    sessionStorage.setItem("recentImages", JSON.stringify(recentImages));
  };
  return (
    <div className="w-full h-[calc(100%-5rem)]  flex justify-center p-2">
      <div className=" lg:w-3/5 h-full flex flex-col items-center gap-10 p-2 ">
        <h1 className=" text-3xl lg:text-5xl ">Free AI Image Generator</h1>
        <p className="w-3/4 h-full text-center">
          Convert words to images with Fotor's free AI image generator. Watch
          your imagination transform into AI-generated images online. Free text
          to image AI generator, save time on creating or searching for the
          perfect image.
        </p>

        <div className=" h-full w-full  flex flex-col items-center gap-10 p-5">
          <div className="w-full h-max max-w-[70rem] flex-col md:flex  gap-5 justify-center items-center p-2 text-white ">
            <div className="flex w-full h-max max-w-[48rem]  text-white flex-col gap-4 justify-center items-center">
              <Textarea
                size="lg"
                label="Enter your prompt"
                value={prompt}
                onChange={onPromptChange}
                className="  text-white whitespace-normal "
                success
              />
              <Button
                size="lg"
                // color={prompt ? "green" : "blue"}
                disabled={!prompt}
                className=" rounded cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                onClick={handleClick}
              >
                Generate
              </Button>
            </div>

            <div className="generated-images">
              {loading ? (
                <div className="h-96 w-full rounded-lg  flex justify-center items-center bg-gray-800 shadow-inner">
                  <Spinner color="pink" className="h-12 w-96" />
                </div>
              ) : (
                <img
                  className="h-96 w-full rounded-lg object-contain object-center"
                  src={
                    data
                      ? `data:image/jpeg;base64,${data}`
                      : "https://images.unsplash.com/photo-1617331140180-e8262094733a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=512&h=512&q=80"
                  }
                  alt="nature image"
                />
              )}
            </div>

            <div className="recent-images mt-5">
              <h2 className="text-center">Recent Images</h2>
              <div className="image-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentImages ? (
                  reversedImages.map((imageData, index) => (
                    <img
                      className="h-max w-auto  rounded-lg object-contain object-center "
                      key={index}
                      src={`data:image/jpeg;base64,${imageData}`}
                      alt={`Image ${index}`}
                    />
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleImgGenerator;
