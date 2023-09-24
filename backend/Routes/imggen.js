const Router = require("express").Router();

//controllers
const imgGenController = require("../Controllers/imggen");
const authenticator = require("../Middlewares/authenticator");

//routes

Router.post("/imggen/simple", imgGenController.simpleImgGenerator);
Router.post(
  "/imggen/advanced",
  authenticator.authenticate,
  imgGenController.advanceImgGenerator
);
Router.get("/imggen/samplers", imgGenController.getSamplerList);

module.exports = Router;
