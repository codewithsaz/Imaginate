const { json } = require("sequelize");
const User = require("../../Models/Users");
const ApiKey = require("../Models/ApiKey");
const crypto = require("crypto");

exports.createApiKey = async (req, res) => {
  try {
    const { apiName, apiPurpose, apiDomain } = req.body;
    const UserId = req.user.id;
    // Generate a unique API key
    const buffer = crypto.randomBytes(32);

    // Convert the buffer to a hexadecimal string
    const apiKey = buffer.toString("hex");

    // Create a new API key record associated with the user
    const newApiKey = await ApiKey.create({
      apiName: apiName,
      apiPurpose: apiPurpose,
      apiDomain: apiDomain,
      apiKey: apiKey,
      UserId,
    });

    if (newApiKey) {
      res.status(201).json({
        success: true,
        api: {
          name: newApiKey.apiName,
          domain: newApiKey.apiDomain,
          key: newApiKey.apiKey,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Api creation failed",
      });
    }
  } catch (error) {
    console.error("Error generating API key:", error);
    res.status(401).json({
      success: false,
      message: "Api creation failed",
    });
  }
};

exports.getApiKey = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }

    // Retrieve API keys associated with the user
    const apiKeys = await user.getApiKeys();
    const extractedApiKeys = apiKeys.map((apiKey) => ({
      apiName: apiKey.apiName,
      apiDomain: apiKey.apiDomain,
      apiKey: apiKey.apiKey,
    }));
    if (apiKeys) {
      res.status(201).json({
        success: true,
        apiKeys: extractedApiKeys,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Api creation failed",
      });
    }
  } catch (error) {
    console.error("Error generating API key:", error);
    res.status(401).json({
      success: false,
      message: "Api creation failed",
    });
  }
};

exports.deleteApiKey = async (req, res) => {
  try {
    const { apiKey } = req.body;
    console.log(apiKey);
    // Check if apiKey is provided in the request body
    if (!apiKey) {
      return res
        .status(400)
        .json({ error: "API key is required in the request body" });
    }

    // Find the API key by apiKey and delete it
    const deletedApiKey = await ApiKey.findOne({ where: { apiKey } });

    if (!deletedApiKey) {
      res.status(404).json({ success: false, error: "API key not found" });
    }

    await deletedApiKey.destroy();
    res
      .status(200)
      .json({ success: true, message: "API key deleted successfully" });
  } catch (error) {
    console.error("Error deleting API key:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
