const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const dotevn = require("dotenv");
dotevn.config();
const cookieParser = require("cookie-parser");
const express = require("express");
const authRoute = require("./routes/auth.routes");
const songRoute = require("./routes/song.routes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRoute);

app.use("/api/songs", songRoute);

module.exports = app;
