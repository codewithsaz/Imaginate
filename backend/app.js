require("dotenv/config");

const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./Utils/database");

const AuthRoutes = require("./Routes/authentication");
const userRoutes = require("./Routes/user");
const imgGenRoutes = require("./Routes/imggen");
const apiRoutes = require("./BaaS/Routes/Api");

const ApiKey = require("./BaaS/Models/ApiKey");
const User = require("./Models/Users");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeader: true,
    credentials: true,
  })
);
app.use(express.json());

app.use(AuthRoutes);
app.use(userRoutes);
app.use(imgGenRoutes);
app.use(apiRoutes);

User.hasMany(ApiKey);
ApiKey.belongsTo(User);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(8080, () => console.log("Server running on port 8080"));
  })
  .catch((error) => {
    console.log(error);
  });
