// require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../Models/Users");
const sequelize = require("../Utils/database");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const email = jwt.verify(token, process.env.JWT_SECRET).email;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false });
  }
};

exports.verifyUser = async (req, res, next) => {
  try {
    console.log(req.header);
    const token = req.header("Authorization");
    const email = jwt.verify(token, process.env.JWT_SECRET).email;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      res.status(201).json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false });
  }
};

exports.findUserEmail = async (req, res, next) => {
  try {
    const requestID = req.params.requestID;
    const requestUser = await ForgotPasswordRequest.findByPk(requestID, {
      where: { isActive: true },
    });
    // console.log("requestUser", requestUser.userEmail);
    req.user = requestUser;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false });
  }
};
