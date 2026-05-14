let jwt = require("jsonwebtoken");

const generateAccessToken = (empId) => {
  return jwt.sign({ empId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (empId) => {
  return jwt.sign({ empId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
