const { Router } = require("express");
const { registerUser, loginUser } = require("../controller/auth.controller");

const authRoute = Router();

authRoute.post("/register", registerUser);

authRoute.post("/login", loginUser);

module.exports = authRoute;
