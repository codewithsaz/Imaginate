const router = require("express").Router();

const apikeyController = require("../Controllers/api");
const authenticator = require("../../Middlewares/authenticator");

router.post(
  "/api/create",
  authenticator.authenticate,
  apikeyController.createApiKey
);

router.get("/api/get", authenticator.authenticate, apikeyController.getApiKey);

router.delete(
  "/api/delete",
  authenticator.authenticate,
  apikeyController.deleteApiKey
);

module.exports = router;
