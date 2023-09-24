import React from "react";

const LoadingAnimation = () => {
  return (
    <div className="w-max h-40 flex flex-col justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink" // Update xmlns:xlink to xmlnsXlink
        style={{
          margin: "auto",
          background: "rgb(255, 255, 255)",
          display: "block",
          shapeRendering: "auto",
        }} // Replace style attribute with JSX style object
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          r="32"
          strokeWidth="8" // Change stroke-width to strokeWidth
          stroke="#1d0e0b"
          strokeDasharray="50.26548245743669 50.26548245743669" // Change stroke-dasharray to strokeDasharray
          fill="none"
          strokeLinecap="round" // Change stroke-linecap to strokeLinecap
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="0 50 50;360 50 50"
          ></animateTransform>
        </circle>
        <circle
          cx="50"
          cy="50"
          r="23"
          strokeWidth="8" // Change stroke-width to strokeWidth
          stroke="#ff5800"
          strokeDasharray="36.12831551628262 36.12831551628262" // Change stroke-dasharray to strokeDasharray
          fill="none"
          strokeLinecap="round" // Change stroke-linecap to strokeLinecap
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="0 50 50;-360 50 50"
          ></animateTransform>
        </circle>
        {/* [ldio] generated by https://loading.io/ */}
      </svg>
    </div>
  );
};

export default LoadingAnimation;