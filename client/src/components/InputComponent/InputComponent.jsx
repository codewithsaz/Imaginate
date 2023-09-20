import React from "react";
import axios from "axios";
import { Input, Button, Textarea } from "@material-tailwind/react";

const InputComponent = () => {
  const recentImages = JSON.parse(sessionStorage.getItem("recentImages"));
  const reversedImages = [...recentImages].reverse();
  const [prompt, setPrompt] = React.useState("");
  const [negativePrompt, setnegativePrompt] = React.useState("");
  const [seed, setSeed] = React.useState("-1");
  const [data, setData] = React.useState("");
  const onPromptChange = ({ target }) => setPrompt(target.value);
  const onSeedChange = ({ target }) => setSeed(target.value);
  const onNegativePromptChange = ({ target }) =>
    setnegativePrompt(target.value);
  const handleClick = async (e) => {
    console.log(prompt);
    const response = await axios.post(
      "http://127.0.0.1:7860/sdapi/v1/txt2img",
      // '{\n    "prompt": "maltese puppy",\n    "steps": 5\n}',
      {
        prompt: prompt,
        negative_prompt: negativePrompt,
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
    recentImages.push(response.data.images[0]);
    sessionStorage.setItem("recentImages", JSON.stringify(recentImages));
    console.log(response.data.images[0]);
  };
  return (
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
        {/* <Input
          label="Enter your prompt"
          value={prompt}
          onChange={onPromptChange}
          className=" text-white whitespace-normal  "
          color="white"
        /> */}

        <Textarea
          size="lg"
          label="Enter your negative prompt"
          value={negativePrompt}
          onChange={onNegativePromptChange}
          className="  text-white whitespace-normal bg-gray-800 "
          success
        />
        {/* <Input
          label="Enter your negative prompt"
          value={seed}
          onChange={onSeedChange}
          className="  text-white whitespace-normal "
          color="white"
        /> */}
        <Button
          size="xl"
          // color={prompt ? "green" : "blue"}
          disabled={!prompt}
          className=" rounded cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          onClick={handleClick}
        >
          Generate
        </Button>
      </div>
      {/* <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 ">
          Personal Information
        </h2>
        <p className="mt-1 text-sm leading-6 ">
          Use a permanent address where you can receive mail.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 "
            >
              First name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 "
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Country
            </label>
            <div className="mt-2">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Street address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="street-address"
                id="street-address"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              City
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="city"
                id="city"
                autoComplete="address-level2"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="region"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              State / Province
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="region"
                id="region"
                autoComplete="address-level1"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="postal-code"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              ZIP / Postal code
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="postal-code"
                id="postal-code"
                autoComplete="postal-code"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div> */}
      <div className="generated-images">
        <img
          className="h-96 w-full rounded-lg object-contain object-center"
          src={
            data
              ? `data:image/jpeg;base64,${data}`
              : "https://images.unsplash.com/photo-1684369585053-2b35888b3ae8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1928&q=80"
          }
          alt="nature image"
        />
      </div>

      <div className="recent-images mt-5">
        <h2 className="text-center">Recent Images</h2>
        <div className="image-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reversedImages.map((imageData, index) => (
            <img
              className="h-max w-auto  rounded-lg object-contain object-center "
              key={index}
              src={`data:image/jpeg;base64,${imageData}`}
              alt={`Image ${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputComponent;
