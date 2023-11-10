import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import LoadingPage from "../Loading/LoadingPage";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
const images = [
  "https://i.ibb.co/ngdJcNM/download-1.png",
  "https://i.ibb.co/dG4r2PV/03910-1821852725.jpg",
  "https://i.ibb.co/HDrPH1G/download-2.png",
  "https://i.ibb.co/9Z7yqDq/download.png",
  "https://i.ibb.co/b7dBYtD/00104-1202360539.jpg",
  "https://i.ibb.co/Mnns12t/download-8.png",
  "https://i.ibb.co/T4rGs89/00240-3057536294.jpg",
  "https://i.ibb.co/xMzbHrj/download-7.png",
  "https://i.ibb.co/pnWypnk/Mind-Blowing-Dream-Shaper4.webp",
  "https://i.ibb.co/9ThKHbB/download-4.png",
  "https://i.ibb.co/JsTp4dr/prompthero-prompt-85549f5b550.webp",
  "https://i.ibb.co/zPV3fkS/download-9.png",
  "https://i.ibb.co/Sdt1BSp/download-11.png",
  "https://i.ibb.co/g9gJdSD/00241-4149706620.jpg",
  "https://i.ibb.co/cQDbWPB/download-10.png",
  "https://i.ibb.co/TgqWTKr/00237-4018104241.jpg",
  "https://i.ibb.co/YRZwS50/download-3.png",
  "https://i.ibb.co/GCs18Pp/03101-3036513099-Masterpiece-best-quality-edg-Quality-smug-smirk-standing-posing-for-a-picture-cowbo.jpg",
];

const images2 = [
  "https://i.ibb.co/6shtVPZ/3d-art.webp",
  "https://i.ibb.co/1JGpWYw/potrait-3.webp",
  "https://i.ibb.co/W32yHKy/potraint-2.webp",
  "https://i.ibb.co/Ycr8WJJ/potrait-artistic.webp",
  "https://i.ibb.co/SQfyWgq/shingai.webp",
  "https://i.ibb.co/dDcpQfr/10750-1396645560-lora-Black-Monkey-King-v1-0-5-black-monkey-king-solo-highres-rebecca-cyberpunk-rain.jpg",
  "https://i.ibb.co/hcH78XH/breakingbad.webp",
  "https://i.ibb.co/YhVYCWW/batman.webp",
  "https://i.ibb.co/BqtfJ2Z/anime1.webp",
  "https://i.ibb.co/hZvb7b2/02226-3444321594-fantasy-location-abandoned-1-1-overgrown-1-2-giant-rusty-1-1-stormtrooper-helmet-in.jpg",
  "https://i.ibb.co/7K3fb9v/onepiece.webp",
  "https://i.ibb.co/5hzZmMp/fox-women.webp",
  "https://i.ibb.co/52xjSk5/IMG-1468.jpg",
  "https://i.ibb.co/PrYjYT0/00207-2913295982.jpg",
  "https://i.ibb.co/6wzDHNn/Michael-Jordan-Cyberpunk-Basketball-Player.png",
];
2;

const LandingPage = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center  items-center gap-4 pb-10 ">
      <header className=" w-full h-full bg-[url('https://i.ibb.co/C09thv9/use-midjourney-ai-to-create-stunning-ai-artwork-based-on-your-desired-words.jpg')] overflow-hidden">
        <section className="flex flex-col justify-center items-center gap-2 pt-2 h-full w-full bg-gradient-to-b from-black/60  to-gray-900 backdrop-filter backdrop-blur-sm bg-opacity-80">
          <nav className="w-full flex justify-between items-center px-4 py-2 pb-10">
            <h1 className="mr-4 cursor-pointer  font-extrabold text-3xl font-sans">
              <Link to={"/"}>Imaginate</Link>
            </h1>
            <Link
              to="/login"
              className=" hidden lg:inline-block rounded-lg bg-pink-700 px-4 py-1 hover:bg-pink-900"
            >
              Login
            </Link>
          </nav>
          <h1 className="text-3xl md:text-5xl lg:text-6xl">
            Unleash your{" "}
            <span
              className=" text-pink-600 font-bold "
              // style={{ textShadow: "5px 0px 50px pink" }}
            >
              {" "}
              Creativity
            </span>
          </h1>
          <h1 className="text-3xl md:text-5xl lg:text-6xl">
            with{" "}
            <span className="underline decoration-pink-900"> Imaginate's</span>
          </h1>
          <h1 className="text-3xl md:text-5xl lg:text-6xl">
            <span className=" text-pink-600 font-bold">AI Image </span>
            Generator
          </h1>
          <div className="w-full h-max flex flex-col justify-center items-center pt-10 ">
            <div
              className=" w-max  h-max  flex flex-col md:flex-row text-pink-500 font-semibold  justify-center items-center gap-4 bg-black/50 backdrop-blur-md rounded-lg p-2 hover:scale-105 transition duration-300 ease-in-out "
              // style={{ boxShadow: "0px 0px 30px #f209ac" }}
            >
              <h1 className="text-xl md:text-2xl lg:text-3xl px-5 py-1 ">
                <Link to="/simple">Start generating images</Link>
              </h1>
              {/* <button className="px-4 py-2  rounded-lg bg-pink-700 hover:bg-pink-900  text-xl  font-bold  w-full md:w-max  ">
                <Link to="/simple">Generate Images</Link>
              </button> */}
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 py-16 -rotate-3 scale-105  ">
            <Marquee
              autoFill
              gradient
              gradientColor="#212121"
              gradientWidth={150}
              className=" z-0"
            >
              {images.map((imageUrl, index) => (
                <img
                  className=" max-w-md h-40 lg:h-56 rounded-lg mx-2"
                  key={index}
                  src={imageUrl}
                  alt={`Image ${index}`}
                />
              ))}
            </Marquee>
            <Marquee
              autoFill
              gradient
              gradientColor="#212121"
              gradientWidth={50}
              direction="right"
              className=" z-0"
            >
              {images2.map((imageUrl, index) => (
                <img
                  className=" max-w-md h-40 lg:h-56 rounded-lg mx-2 object-center"
                  key={index}
                  src={imageUrl}
                  alt={`Image ${index}`}
                />
              ))}
            </Marquee>
          </div>
        </section>
      </header>
      <main className="w-full h-full flex flex-col  items-center  gap-4 p-4 ">
        <section className="w-full  flex flex-col lg:flex-row  justify-center items-center gap-4   px-4 py-10 ">
          <div className="w-auto max-w-xl space-y-4 text-center lg:text-start">
            <h1 className="text-3xl md:text-4xl lg:text-5xl">
              Advance Image Generator
            </h1>
            <p className="text-sm md:text-md lg:text-lg text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
              dolores corporis eligendi omnis nesciunt, nobis consectetur
              similique, vero necessitatibus reprehenderit minus repellendus aut
              id quis? Distinctio eaque facere, sed unde minus magnam quisquam
              neque id esse accusamus officiis quaerat necessitatibus fugiat!
              Eius, quibusdam sed tempora quisquam nesciunt architecto iure et
              accusamus illum ab fuga alias deleniti esse ipsum fugit voluptate
              sequi nemo inventore maxime magni?
            </p>
          </div>
          <div className="w-max z-0 ">
            <img
              className=" max-w-xs md:max-w-md  p-2"
              src="https://i.ibb.co/j6hrqfL/ai-img-clg.webp"
              alt="Image 1"
              loading="lazy"
              style={{ filter: "drop-shadow(0px 0px 10px #f209ac)" }}
            />
          </div>
        </section>
        <section className="w-full  flex flex-col-reverse lg:flex-row  justify-center items-center gap-4   px-4 py-10  ">
          <div className="w-max ">
            <img
              className=" max-w-xs md:max-w-md   p-2"
              src="https://i.ibb.co/rQYsyYL/file.jpg"
              alt="Image 1"
              loading="lazy"
              style={{ filter: "drop-shadow(0px 0px 10px #f209ac)" }}
            />
          </div>
          <div className="w-auto max-w-xl space-y-4  text-center lg:text-start ">
            <h1 className="text-3xl md:text-4xl lg:text-5xl">
              Save your Creation
            </h1>
            <p className="text-sm md:text-md lg:text-lg text-justify">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro
              voluptates unde aspernatur amet voluptatum possimus atque magni
              optio fugiat. Explicabo hic dolore, id, doloremque laudantium sunt
              assumenda deserunt tempore placeat error illum dolorum delectus
              magni. Sequi dolor asperiores a quibusdam accusantium! Quod fugiat
              itaque sit natus eum unde explicabo corrupti distinctio,
              dignissimos ullam cum rerum eius. Sequi ipsa aliquam porro!
            </p>
          </div>
        </section>
        <section className="w-full  flex flex-col lg:flex-row  justify-center items-center gap-4   px-4 py-10 ">
          <div className="w-auto max-w-lg space-y-4 text-center lg:text-start">
            <h1 className="text-3xl md:text-4xl lg:text-5xl">
              Use our AI image API in your platform
            </h1>
            <p className="text-sm md:text-md lg:text-lg text-justify">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. In
              eligendi iusto molestiae! Alias explicabo in illo aliquam
              doloribus, eum optio, totam quia fugit qui blanditiis odio. Eos
              sequi neque, maxime necessitatibus in vitae non veniam excepturi
              quasi temporibus explicabo ratione facere blanditiis voluptatem
              perferendis corporis id. Molestiae laudantium blanditiis quas!
            </p>
          </div>
          <div className="w-max z-0 ">
            <img
              className=" max-w-xs md:max-w-md   p-2"
              src="https://i.ibb.co/PznMNXH/Developer-activity-amico.png"
              alt="Image 1"
              loading="lazy"
              // style={{ filter: "drop-shadow(0px 0px 10px #f209ac)" }}
            />
          </div>
        </section>
        <section className="w-full  flex flex-col-reverse lg:flex-row  justify-center items-center gap-4   px-4 py-10  ">
          <div className=" w-full max-w-xs md:max-w-md  p-2 ">
            <ReactCompareSlider
              itemOne={
                <ReactCompareSliderImage src="https://i.ibb.co/WzzK7XB/potrait-normal.png" />
              }
              itemTwo={
                <ReactCompareSliderImage src="https://i.ibb.co/hFtZfBw/potrait-upscaled.png" />
              }
            />
          </div>
          <div className="w-auto max-w-xl space-y-4  text-center lg:text-start ">
            <h1 className="text-3xl md:text-4xl lg:text-5xl">
              Upscale Generated Images
            </h1>
            <p className="text-sm md:text-md lg:text-lg text-justify">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro
              voluptates unde aspernatur amet voluptatum possimus atque magni
              optio fugiat. Explicabo hic dolore, id, doloremque laudantium sunt
              assumenda deserunt tempore placeat error illum dolorum delectus
              magni. Sequi dolor asperiores a quibusdam accusantium! Quod fugiat
              itaque sit natus eum unde explicabo corrupti distinctio,
              dignissimos ullam cum rerum eius. Sequi ipsa aliquam porro!
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
