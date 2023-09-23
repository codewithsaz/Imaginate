const express = require("express");
const app = express();
require("dotenv/config");
const cors = require("cors");

const AuthRoutes = require("./Routes/authentication");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);
app.use(express.json());
app.use(AuthRoutes);

app.listen(8080, () => console.log("Server running on port 8080"));
