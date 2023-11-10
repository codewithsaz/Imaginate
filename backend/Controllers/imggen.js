const axios = require("axios");

const sampler_list = [
  {
    name: "Euler a",

    aliases: ["k_euler_a", "k_euler_ancestral"],

    options: { uses_ensd: "True" },
  },

  { name: "Euler", aliases: ["k_euler"], options: {} },

  { name: "LMS", aliases: ["k_lms"], options: {} },

  {
    name: "Heun",

    aliases: ["k_heun"],

    options: { second_order: "True" },
  },

  {
    name: "DPM2",

    aliases: ["k_dpm_2"],

    options: { discard_next_to_last_sigma: "True" },
  },

  {
    name: "DPM2 a",

    aliases: ["k_dpm_2_a"],

    options: { discard_next_to_last_sigma: "True", uses_ensd: "True" },
  },

  {
    name: "DPM++ 2S a",

    aliases: ["k_dpmpp_2s_a"],

    options: { uses_ensd: "True", second_order: "True" },
  },

  { name: "DPM++ 2M", aliases: ["k_dpmpp_2m"], options: {} },

  {
    name: "DPM++ SDE",

    aliases: ["k_dpmpp_sde"],

    options: { second_order: "True", brownian_noise: "True" },
  },

  {
    name: "DPM++ 2M SDE",

    aliases: ["k_dpmpp_2m_sde_ka"],

    options: { brownian_noise: "True" },
  },

  {
    name: "DPM fast",

    aliases: ["k_dpm_fast"],

    options: { uses_ensd: "True" },
  },

  {
    name: "DPM adaptive",

    aliases: ["k_dpm_ad"],

    options: { uses_ensd: "True" },
  },

  {
    name: "LMS Karras",

    aliases: ["k_lms_ka"],

    options: { scheduler: "karras" },
  },

  {
    name: "DPM2 Karras",

    aliases: ["k_dpm_2_ka"],

    options: {
      scheduler: "karras",

      discard_next_to_last_sigma: "True",

      uses_ensd: "True",

      second_order: "True",
    },
  },

  {
    name: "DPM2 a Karras",

    aliases: ["k_dpm_2_a_ka"],

    options: {
      scheduler: "karras",

      discard_next_to_last_sigma: "True",

      uses_ensd: "True",

      second_order: "True",
    },
  },

  {
    name: "DPM++ 2S a Karras",

    aliases: ["k_dpmpp_2s_a_ka"],

    options: {
      scheduler: "karras",

      uses_ensd: "True",

      second_order: "True",
    },
  },

  {
    name: "DPM++ 2M Karras",

    aliases: ["k_dpmpp_2m_ka"],

    options: { scheduler: "karras" },
  },

  {
    name: "DPM++ SDE Karras",

    aliases: ["k_dpmpp_sde_ka"],

    options: {
      scheduler: "karras",

      second_order: "True",

      brownian_noise: "True",
    },
  },

  {
    name: "DPM++ 2M SDE Karras",

    aliases: ["k_dpmpp_2m_sde_ka"],

    options: { scheduler: "karras", brownian_noise: "True" },
  },

  {
    name: "DDIM",

    aliases: [],

    options: { default_eta_is_0: "True", uses_ensd: "True" },
  },

  { name: "PLMS", aliases: [], options: {} },

  { name: "UniPC", aliases: [], options: {} },
];

exports.simpleImgGenerator = async (req, res) => {
  const { prompt } = req.body;
  try {
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
    if (response)
      res.status(200).json({
        success: true,
        message: "Image generation success",
        images: response.data.images,
      });
    else
      res.status(400).json({
        success: false,
        message: "Image generation failed",
      });
  } catch (error) {
    console.log(error);
  }
};

exports.advanceImgGenerator = async (req, res) => {
  const { prompt, negative_prompt, seed, sampler_name, steps, aspectRatio } =
    req.body;
  let width,
    height = 0;
  switch (aspectRatio) {
    case 1:
      {
        (width = 640), (height = 360);
      }
      break;
    case 2:
      {
        (width = 640), (height = 480);
      }
      break;
    case 3:
      {
        (width = 512), (height = 512);
      }
      break;
    case 4:
      {
        (width = 480), (height = 640);
      }
      break;
    case 5:
      {
        (width = 360), (height = 640);
      }
      break;
    default: {
      (width = 512), (height = 512);
    }
  }
  try {
    const response = await axios.post(
      "http://127.0.0.1:7860/sdapi/v1/txt2img",
      // '{\n    "prompt": "maltese puppy",\n    "steps": 5\n}',
      {
        prompt: prompt,
        negative_prompt: negative_prompt,
        seed: seed,
        sampler_name: sampler_name,
        steps: steps,
        cfg_scale: 7,
        sampler_index: sampler_name,
        width: width,
        height: height,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (response)
      res.status(200).json({
        success: true,
        message: "Image generation success",
        images: response.data.images,
      });
    else
      res.status(400).json({
        success: false,
        message: "Image generation failed",
      });
  } catch (error) {
    console.log(error);
  }
};

exports.getSamplerList = async (req, res) => {
  if (sampler_list)
    res.status(200).json({
      success: true,
      samplers: sampler_list,
    });
  else
    res.status(400).json({
      success: false,
      message: "Samplers not found",
    });
};
