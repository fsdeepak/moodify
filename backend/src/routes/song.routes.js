const { Router } = require("express");
const upload = require("../middleware/upload.middleware");
const { uploadSong, getSong } = require("../controller/song.controller");

const songRoute = Router();

songRoute.post("/", upload.single("song"), uploadSong);

songRoute.get("/", getSong);

module.exports = songRoute;
