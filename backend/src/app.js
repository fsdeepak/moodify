const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const dotevn = require("dotenv");
dotevn.config();
const cookieParser = require("cookie-parser");
const express = require("express");
const authRoute = require("./routes/auth.routes");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

module.exports = app;
