const Employee = require("../models/employee.model");
const ApiError = require("../utils/ApiError");
let { generateAccessToken, generateRefreshToken } = require("../utils/token");
let jwt = require("jsonwebtoken");

const registerService = async (data) => {
  const existingEmployee = await Employee.findOne({
    email: data.email,
  });

  if (existingEmployee) {
    throw new ApiError(409, "Employee already exists");
  }

  const employee = await Employee.create(data);

  const accessToken = generateAccessToken(employee._id);

  const refreshToken = generateRefreshToken(employee._id);

  employee.refreshToken = refreshToken;

  await employee.save();

  return {
    employee,
    accessToken,
    refreshToken,
  };
};

const loginService = async (email, password) => {
  const employee = await Employee.findOne({ email });

  if (!employee) {
    throw new ApiError(404, "employee not found");
  }

  const isMatch = await employee.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = generateAccessToken(employee._id);

  const refreshToken = generateRefreshToken(employee._id);

  employee.refreshToken = refreshToken;

  await employee.save();

  return {
    employee,
    accessToken,
    refreshToken,
  };
};

const accessTokenService = async (refreshToken) => {
  if (!refreshToken) throw new ApiError(400, "refreshToken not found");

  let decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  let employee = await Employee.findById(decode.empId);

  if (!refreshToken === employee.refreshToken)
    throw new ApiError(401, "invalid refresh token");

  let newAccessToken = generateAccessToken(employee._id);

  return {
    newAccessToken,
  };
};

module.exports = {
  registerService,
  loginService,
  accessTokenService,
};
