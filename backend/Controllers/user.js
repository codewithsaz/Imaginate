// require("dotenv").config();
const User = require("../Models/Users");
// const ForgotPasswordRequest = require("../models/forgotPasswordRequest");
const sequelize = require("../Utils/database");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

function generateAccessToken(email) {
  return jwt.sign({ email: email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}

exports.addUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const profilePic =
    "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png";
  try {
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (hash) {
        try {
          const userAdded = await User.create({
            name: name,
            email: email,
            password: hash,
            profilePic: profilePic,
          });
          if (userAdded) {
            res.status(201).json({
              message: "Signup was successful",
              user: {
                firstName: name,
                picture: profilePic,
                email: email,
                token: generateAccessToken(email),
              },
            });
          }
        } catch (error) {
          console.log(error);
          res.status(404).json({
            success: false,
            message: "User already exists",
          });
        }
      } else {
        throw new Error(err);
      }
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Cant register at the moment",
    });
  }
};

exports.verifyUser = (req, res) => {
  // console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  User.findAll({
    where: {
      email: email,
    },
  })
    .then((user) => {
      // console.log(user[0]);
      bcrypt.compare(password, user[0].password, function (err, result) {
        if (result)
          res.status(201).json({
            message: "Login was successful",
            user: {
              firstName: user[0].name,
              picture: user[0].profilePic,
              email: user[0].email,
              token: generateAccessToken(email),
            },
          });
        else
          res.status(401).json({
            success: false,
            message: "Invalid Credentials",
          });
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    });
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({});
    // console.log(users);
    res.status(201).json({ users: users });
  } catch (err) {
    res.status(201).json({ isValid: false });
  }
};

// exports.updatePassword = async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const t = await sequelize.transaction();
//   try {
//     let FRP_UUID_validate = await ForgotPasswordRequest.findOne({
//       where: { userEmail: email, isActive: true },
//     });
//     // console.log("FRP_UUID_validate ", FRP_UUID_validate);
//     if (FRP_UUID_validate != null) {
//       const user = await User.findOne({ where: { email: email } });
//       // console.log(user);
//       if (user !== null) {
//         bcrypt.hash(password, saltRounds, async function (err, hash) {
//           try {
//             await user.update({ password: hash }, { transaction: t });
//             const FPR_status = await ForgotPasswordRequest.findOne({
//               where: { userEmail: email },
//             });
//             await FPR_status.update({ isActive: false }, { transaction: t });
//             await t.commit();
//             res.status(201).json({ message: "Password Updated" });
//           } catch (err) {
//             console.log(err);
//             await t.rollback();
//             res.status(500).json({
//               success: false,
//               message: "Password updation failed",
//             });
//           }
//         });
//       }
//     } else {
//       res.status(500).json({
//         success: false,
//         message: "Link has expired",
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "User not found",
//     });
//   }
// };
