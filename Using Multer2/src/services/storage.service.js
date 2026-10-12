const ImageKit = require("imagekit");
require("dotenv").config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(buffer) {
  try {
    const result = await imagekit.upload({
      file: buffer.toString("base64"),
      fileName: "image.jpg"
    });

    return result;
  } catch (error) {
    console.log("Image upload error:", error);
  }
}

module.exports = uploadFile;
