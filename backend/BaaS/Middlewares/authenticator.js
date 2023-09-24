const jwt = require("jsonwebtoken");
const User = require("../Models/Users");
const sequelize = require("../Utils/database");

exports.authenticateUser = async (req, res, next) => {
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

exports.authenticateApi = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const email = jwt.verify(token, process.env.JWT_SECRET).email;
    const user = await User.findByPk(userId);

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false });
  }
};
