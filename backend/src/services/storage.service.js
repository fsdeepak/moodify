const imageKit = require("@imagekit/nodejs").default;

const client = new imageKit({
  privateKey: process.env.IMAGEKIT_KEY,
});

async function uploadFile({ buffer, fileName, folder = "" }) {
  const file = await client.files.upload({
    file: await imageKit.toFile(Buffer.from(buffer)),
    fileName: fileName,
    folder,
  });

  return file;
}

module.exports = { uploadFile };
