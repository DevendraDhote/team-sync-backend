let Imagekit = require("imagekit");

let storageInstance = new Imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_END,
});

let sendFiles = async (file, fileName) => {
  let options = {
    file,
    fileName,
    folder: "teamSync",
  };

  return await storageInstance.upload(options);
};

module.exports = sendFiles;
