const songModel = require("../models/song.model");
const id3 = require("node-id3");
const storageService = require("../services/storage.service");

async function uploadSong(req, res) {
  const { mood } = req.body;

  const songBuffer = req.file.buffer;
  const tags = id3.read(songBuffer);

  //   const songFile = await storageService.uploadFile({
  //     buffer: songBuffer,
  //     fileName: tags.title + ".mp3",
  //     folder: "moodify/songs",
  //   });

  //   const posterFile = await storageService.uploadFile({
  //     buffer: tags.image.imageBuffer,
  //     fileName: tags.title + ".jpeg",
  //     folder: "moodify/poster",
  //   });

  const [songFile, posterFile] = await Promise.all([
    storageService.uploadFile({
      buffer: songBuffer,
      fileName: tags.title + ".mp3",
      folder: "moodify/songs",
    }),

    storageService.uploadFile({
      buffer: tags.image.imageBuffer,
      fileName: tags.title + ".jpeg",
      folder: "moodify/poster",
    }),
  ]);

  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    postImage: posterFile.url,
    mood: mood,
  });

  return res.status(201).json({
    message: "Song create successfully",
    song,
  });
}

async function getSong(req, res) {
  const { mood } = req.query;
  const song = await songModel.findOne({ mood });

  return res.status(200).json({
    message: "Song Fetched Successfully",
    song,
  });
}

module.exports = {
  uploadSong,
  getSong,
};
