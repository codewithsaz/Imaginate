import React, { useEffect } from "react";
import axios from "axios";
import {
  Input,
  Button,
  Textarea,
  Select,
  Option,
  Spinner,
} from "@material-tailwind/react";

const AdvancedIMgGenerator = () => {
  const recentImages = JSON.parse(sessionStorage.getItem("recentImages"));
  const reversedImages = [...recentImages].reverse();
  const [loading, setLoading] = React.useState(false);
  const [prompt, setPrompt] = React.useState("");
  const [negativePrompt, setnegativePrompt] = React.useState("");
  const [seed, setSeed] = React.useState("-1");
  const [data, setData] = React.useState("");
  const [steps, setSteps] = React.useState(20);
  const [sampler, setSampler] = React.useState("DPM++ 2M SDE Karras");
  const [samplersList, setSamplerList] = React.useState([]);
  const onPromptChange = ({ target }) => setPrompt(target.value);
  const onSeedChange = ({ target }) => setSeed(target.value);
  const onNegativePromptChange = ({ target }) =>
    setnegativePrompt(target.value);
  function handleSamplerChange(e) {
    setSampler(e);
  }
  function handleStepsChange(e) {
    setSteps(Number(e));
  }
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:8080/imggen/samplers",
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      setSamplerList(response.data.samplers);
    }
    fetchData();
  }, []);
  const handleClick = async (e) => {
    setLoading(true);
    const theUser = localStorage.getItem("user");
    let theUserObj = JSON.parse(theUser);
    const response = await axios.post(
      "http://localhost:8080/imggen/advanced",
      // '{\n    "prompt": "maltese puppy",\n    "steps": 5\n}',
      {
        prompt: prompt,
        negative_prompt: negativePrompt,
        seed: seed,
        sampler_name: sampler,
        steps: steps,
      },
      {
        headers: {
          Authorization: theUserObj.token,
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
      <div className=" lg:w-3/5 h-full  flex flex-col items-center gap-10 p-2 ">
        <h1 className=" text-3xl lg:text-5xl text-center">
          Advanced AI Image Generator
        </h1>

        <div className=" h-full w-full  flex flex-col items-center gap-10 p-5">
          <div className="w-full h-max max-w-[70rem] flex-col flex gap-5 justify-center items-center p-2 text-white ">
            <div className="flex w-full h-max max-w-[48rem]  text-white flex-col gap-4 justify-center items-center">
              <Textarea
                size="lg"
                label="Enter your prompt"
                value={prompt}
                onChange={onPromptChange}
                className="  text-white whitespace-normal bg-gray-800 "
                success
              />

              <Textarea
                size="lg"
                label="Enter your negative prompt"
                value={negativePrompt}
                onChange={onNegativePromptChange}
                className="  text-white whitespace-normal bg-gray-800 "
                success
              />
              <div className=" w-full h-max grid grid-cols-1 md:w-max md:grid-cols-3 gap-5">
                <Input
                  label="Seed"
                  value={seed}
                  onChange={onSeedChange}
                  className="  text-white whitespace-normal "
                  color="white"
                />
                <Select
                  value={steps.toString()}
                  className="bg-grey-900 text-white"
                  label="Steps"
                  onChange={handleStepsChange}
                >
                  <Option value="10">10</Option>
                  <Option value="15">15</Option>
                  <Option value="20">20</Option>
                  <Option value="25">25</Option>
                  <Option value="30">30</Option>
                  <Option value="35">35</Option>
                  <Option value="40">40</Option>
                </Select>
                <Select
                  color="blue"
                  className="bg-grey-900 text-white"
                  label="Select Sampler"
                  onChange={handleSamplerChange}
                >
                  {samplersList.map((samplers, index) => (
                    <Option key={index} value={samplers.name}>
                      {samplers.name}
                    </Option>
                  ))}
                </Select>
              </div>
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
                <div className="h-96 md:w-[32rem] md:h-[32rem] max-w-lg rounded-lg  flex justify-center items-center bg-gray-800 shadow-inner">
                  <Spinner color="pink" className="h-12 w-96" />
                </div>
              ) : (
                <div className="h-auto w-full max-w-lg rounded-lg  flex justify-center items-center bg-gray-800 shadow-inner">
                  <img
                    className="h-auto w-full rounded-lg object-contain object-center"
                    src={
                      data
                        ? `data:image/jpeg;base64,${data}`
                        : "https://cdn.pixabay.com/photo/2023/04/18/10/19/ai-generated-7934798_960_720.jpg"
                    }
                    alt="nature image"
                  />
                </div>
              )}
            </div>

            <div className="recent-images mt-5">
              {recentImages.length > 0 && (
                <h2 className="text-center">Recent Images</h2>
              )}
              <div className="image-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentImages ? (
                  reversedImages.map((imageData, index) => (
                    <img
                      className="h-max w-96   rounded-lg object-contain object-center "
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

export default AdvancedIMgGenerator;
