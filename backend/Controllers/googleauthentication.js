const User = require("../Models/Users");
const sequelize = require("../Utils/database");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}

exports.handleSignup = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log({ verified: verifyGoogleToken(req.body.credential) });
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;
      console.log("profile", profile);
      console.log(profile.name, profile.email);
      const name = profile.name;
      const email = profile.email;
      const password = profile.jti;
      const profilePic = profile.picture;
      try {
        bcrypt.hash(password, saltRounds, async function (err, hash) {
          if (hash) {
            try {
              const userAdded = await User.create({
                name: name,
                email: email,
                password: hash,
                profilePic: profilePic,
                authType: "google",
              });
              if (userAdded) {
                res.status(201).json({
                  message: "Signup was successful",
                  user: {
                    firstName: profile?.given_name,
                    picture: profile?.picture,
                    email: profile?.email,
                    token: jwt.sign(
                      { email: profile?.email },
                      process.env.JWT_SECRET,
                      {
                        expiresIn: "1d",
                      }
                    ),
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
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred. Registration failed.",
    });
  }
};

exports.handleLogin = async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      const existsInDB = await User.findOne({
        where: { email: profile.email },
      });
      console.log(existsInDB);
      if (!existsInDB) {
        return res.status(400).json({
          message: "You are not registered. Please sign up",
        });
      }

      res.status(201).json({
        message: "Login was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          }),
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error?.message || error,
    });
  }
};
