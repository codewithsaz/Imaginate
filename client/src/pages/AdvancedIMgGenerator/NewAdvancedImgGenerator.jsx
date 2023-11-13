import React, { useState, useEffect } from "react";
import { Radio, Spinner } from "@material-tailwind/react";
import axios from "axios";
import NavbarComponent from "../../components/navbarComponent/navbarComponent";
axios.defaults.withCredentials = true;
const NewAdvancedImgGenerator = () => {
  const recentImages = JSON.parse(sessionStorage.getItem("recentImages"));
  const reversedImages = [...recentImages].reverse();
  const [loading, setLoading] = React.useState(false);
  const [prompt, setPrompt] = React.useState("");
  const [negativePrompt, setnegativePrompt] = React.useState("");
  const [seed, setSeed] = React.useState("-1");
  const [data, setData] = React.useState("");
  const [aspectRatio, setAspectRatio] = React.useState(3);
  const [styles, setStyles] = React.useState([
    "3D Character",
    "Adorable",
    "CyberPunk",
    "3D Character",
  ]);
  const [steps, setSteps] = React.useState(20);
  const [sampler, setSampler] = React.useState("DPM++ 2M SDE Karras");
  const [samplersList, setSamplerList] = React.useState([]);
  const onPromptChange = ({ target }) => setPrompt(target.value);
  const onAspectRatioChange = ({ target }) => {
    setAspectRatio(Number(target.value));
  };
  const onSeedChange = ({ target }) => setSeed(target.value);
  const onNegativePromptChange = ({ target }) =>
    setnegativePrompt(target.value);

  function handleSamplerChange(e) {
    setSampler(e.currentTarget.value);
  }
  function handleStepsChange(e) {
    setSteps(Number(e.currentTarget.value));
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
        aspectRatio: aspectRatio,
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
  const [isStyleMenuOpen, setisStyleMenuOpen] = useState(false);
  function openStyleMenu() {
    setisStyleMenuOpen(!isStyleMenuOpen);
  }
  return (
    <>
      <NavbarComponent />
      <div className="w-full min-h-[90vh] p-2">
        <header className="text-2xl font-semibold px-2">
          Advance Image Generator
        </header>
        <main className="w-full flex flex-col gap-2  min-h-full ">
          <section className="  flex flex-col lg:flex-row items-center justify-start lg:h-[80vh] gap-2">
            {/* Image Generator */}
            <div className="w-full lg:max-w-lg h-full justify-start  p-1 flex flex-col gap-2 overflow-y-auto ">
              <div className="w-full bg-gray-800 p-4  rounded-md flex flex-col gap-2">
                <div>
                  <label htmlFor="positivePrompt">Prompt</label>
                  <textarea
                    type="text"
                    name="positivePrompt"
                    id="positivePrompt"
                    value={prompt}
                    rows="4"
                    onChange={onPromptChange}
                    className="w-full bg-gray-700 p-2 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="negativePrompt">Negative Prompt</label>
                  <textarea
                    type="text"
                    name="negativePrompt"
                    id="negativePrompt"
                    rows="4"
                    value={negativePrompt}
                    onChange={onNegativePromptChange}
                    className="w-full bg-gray-700 p-2 rounded-md text-sm"
                  />
                </div>
              </div>
              <button
                className="w-full px-5 py-2 bg-white text-black rounded-lg disabled:bg-white/70"
                disabled={!prompt}
                onClick={handleClick}
              >
                Generate
              </button>
              <div className="w-full bg-gray-800 p-4 rounded-md flex flex-col gap-4">
                <div className="w-full flex justify-between items-center">
                  <h4>Styles</h4>
                  <button
                    className=" px-2 bg-gray-700 rounded-md"
                    onClick={openStyleMenu}
                  >
                    +
                  </button>
                </div>
                <div className="w-full flex flex-wrap gap-1">
                  {styles.map((item, index) => (
                    <div className="px-1 py-1 text-sm bg-gray-600 rounded-md flex gap-1">
                      <p key={index}>{item}</p>
                      <button className="px-1 rounded-md bg-red-600">X</button>
                    </div>
                  ))}
                </div>

                <div
                  className={
                    isStyleMenuOpen
                      ? "w-full flex flex-wrap justify-center gap-2 transition-all ease-in-out duration-500"
                      : "w-full  hidden transition-all ease-in-out duration-700"
                  }
                >
                  <button
                    value="Cyperpunk"
                    onClick={(e) => {
                      console.log(e.currentTarget.value);
                    }}
                  >
                    <img
                      className="h-16 w-16 rounded-md object-cover"
                      src="https://i.ibb.co/WzzK7XB/potrait-normal.png"
                      alt="Image 1"
                      loading="lazy"
                    />
                  </button>
                </div>
              </div>
              <div className="w-full bg-gray-800 p-4 rounded-md flex flex-col gap-2">
                Aspect Ratio
                <div className="flex flex-wrap justify-center items-center w-full gap-4 text-white">
                  <Radio
                    name="aspectRatio"
                    color="green"
                    label="16:9"
                    value="1"
                    onClick={onAspectRatioChange}
                  />
                  <Radio
                    name="aspectRatio"
                    color="green"
                    label="4:3"
                    value="2"
                    onClick={onAspectRatioChange}
                  />
                  <Radio
                    name="aspectRatio"
                    color="green"
                    defaultChecked
                    label="1:1"
                    value="3"
                    onClick={onAspectRatioChange}
                  />
                  <Radio
                    name="aspectRatio"
                    color="green"
                    label="3:4"
                    value="4"
                    onClick={onAspectRatioChange}
                  />
                  <Radio
                    name="aspectRatio"
                    color="green"
                    label="9:16"
                    value="5"
                    onClick={onAspectRatioChange}
                  />
                </div>
              </div>
              <div className="w-full bg-gray-800 p-4 rounded-md flex flex-row gap-4 justify-around">
                <div>
                  <label htmlFor="sampler">Sampler</label>
                  <select
                    name="sampler"
                    id="sampler"
                    className="w-full bg-gray-700 p-2  rounded-md"
                    onChange={handleSamplerChange}
                  >
                    {samplersList.map((samplers, index) => (
                      <option key={index} value={samplers.name}>
                        {samplers.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="steps">Steps</label>
                  <select
                    value={steps.toString()}
                    name="steps"
                    id="steps"
                    className="w-full bg-gray-700 p-2  rounded-md"
                    onChange={handleStepsChange}
                  >
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="positivePrompt">Seed</label>
                  <input
                    type="text"
                    name="seed"
                    id="seed"
                    value={seed}
                    onChange={onSeedChange}
                    className="w-full bg-gray-700 p-2 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-full p-2">
              {loading ? (
                <div className="h-96 lg:h-full w-full max-h-full flex justify-center items-center bg-gray-800 shadow-inner rounded-lg">
                  <Spinner color="pink" className="h-12 w-96" />
                </div>
              ) : (
                <div className=" w-full h-full rounded-lg p-2  flex justify-center items-center bg-gray-800 shadow-inner">
                  <img
                    className="h-full w-full object-contain"
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
          </section>
          {recentImages.length > 0 && (
            <section className=" bg-gray-900 rounded-lg p-2">
              <h2 className="">Recent Images</h2>

              <div className="image-container columns-2 md:columns-4 lg:columns-5 mx-auto space-y-4">
                {recentImages ? (
                  reversedImages.map((imageData, index) => (
                    <img
                      className="h-auto w-96  rounded-lg object-contain object-center "
                      key={index}
                      src={`data:image/jpeg;base64,${imageData}`}
                      alt={`Image ${index}`}
                    />
                  ))
                ) : (
                  <></>
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  );
};

export default NewAdvancedImgGenerator;
