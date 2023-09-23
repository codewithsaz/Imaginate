import React from "react";

const DocsPages = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-5 gap-5">
      <section
        id="Prompts"
        className="w-full p-2 lg:w-3/5 flex flex-col gap-2 text-justify"
      >
        <h1 className="text-4xl mb-5 ">How to build a good prompt?</h1>
        <p className=" leading-7">
          There’s a lot to learn to craft a good prompt. But the basic is to
          describe your subject in as much detail as possible. Make sure to
          include powerful keywords to define the style. Using a prompt
          generator is a great way to learn a step-by-step process and important
          keywords.{" "}
        </p>
        <p className=" leading-7">
          It is essential for beginners to learn a set of powerful keywords and
          their expected effects. This is like learning vocabulary for a new
          language. You can also find a short list of keywords and notes here. A
          shortcut to generating high-quality images is to reuse existing
          prompts. Head to the prompt collection, pick an image you like, and
          steal the prompt! The downside is that you may not understand why it
          generates high-quality images.
        </p>
        <p className=" leading-7">
          Read the notes and change the prompt to see the effect. Alternatively,
          use image collection sites like PlaygroundAI. Pick an image you like
          and remix the prompt. But it could be like finding a needle in a
          haystack for a high-quality prompt. Treat the prompt as a starting
          point. Modify to suit your needs.
        </p>
      </section>
      <section id="Prompts" className="w-full p-2 lg:w-3/5 flex flex-col gap-2">
        <h1 className="text-4xl mb-5 ">
          What are those parameters, and should I change them?
        </h1>
        <ul className="list-inside list-disc">
          <li>
            Image size: The size of the output image. The standard size is
            512×512 pixels.
          </li>
          <li>
            Sampling steps: Use at least 20 steps. Increase if you see a blurry
            image.
          </li>
          <li>
            CFG scale: Typical value is 7. Increase if you want the image to
            follow the prompt more.
          </li>
          <li>
            Seed value: -1 generates a random image. Specify a value if you want
            the same image.
          </li>
          <li>
            Negative prompts: You put what you want to see in the prompt. You
            put what you don’t want to see in the negative prompt.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default DocsPages;
