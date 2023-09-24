const Router = require("express").Router();

//controller
const googleAuthController = require("../Controllers/googleauthentication");

Router.post("/signup", googleAuthController.handleSignup);

Router.post("/login", googleAuthController.handleLogin);

module.exports = Router;
