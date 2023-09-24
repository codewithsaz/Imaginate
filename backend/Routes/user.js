const express = require("express");
const router = express.Router();

const userController = require("../Controllers/user");
const authenticator = require("../Middlewares/authenticator");

router.post("/user/signup", userController.addUser);

router.post("/user/login", userController.verifyUser);

router.get("/user/verify", authenticator.verifyUser);

// router.post("/user/updatePassword", userController.updatePassword);

module.exports = router;
