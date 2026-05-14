const sendFiles = require("../config/imagekit");
const ApiError = require("../utils/ApiError");

let uploadFileService = async (file) => {
  if (!file) throw new ApiError(404, "file not found");

  let uploadedFile = await sendFiles(file.buffer, file.originalname);

  return uploadedFile;
};

module.exports = uploadFileService;
