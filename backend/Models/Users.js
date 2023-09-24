const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Utils/database");
const ApiKey = require("../BaaS/Models/ApiKey");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  profilePic: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  authType: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "imaginate",
  },
});

module.exports = User;
