const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../Utils/database");
// Replace with the path to your Sequelize configuration
// const User = require("../../Models/Users");
// Import the User model

const ApiKey = sequelize.define("ApiKey", {
  apiName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apiKey: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apiDomain: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apiPurpose: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define the association between ApiKey and User

module.exports = ApiKey;
