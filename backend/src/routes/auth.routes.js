const { Router } = require("express");
const {
  registerUser,
  loginUser,
  getMeUser,
  logOutUser,
} = require("../controller/auth.controller");

const authUser = require("../middleware/auth.middleware");

const authRoute = Router();

authRoute.post("/register", registerUser);

authRoute.post("/login", loginUser);

authRoute.get("/get-me", authUser, getMeUser);

authRoute.get("/logout", authUser, logOutUser);

module.exports = authRoute;
