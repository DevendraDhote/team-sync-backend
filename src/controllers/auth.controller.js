const {
  registerService,
  loginService,
  accessTokenService,
} = require("../services/auth.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const registerController = asyncHandler(async (req, res) => {
  const { employee, accessToken, refreshToken } = await registerService(
    req.body
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Employee registered successfully", employee));
});

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { employee, accessToken, refreshToken } = await loginService(
    email,
    password
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json(new ApiResponse(200, "Employee loggedIn", employee));
});

const getAccessTokenController = asyncHandler(async (req, res) => {
  let refreshToken = req.cookies.refreshToken;

  const { newAccessToken } = await accessTokenService(refreshToken);

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
  });

  res.status(200).json(new ApiResponse(200, "accessToken generated"));
});

module.exports = {
  registerController,
  loginController,
  getAccessTokenController,
};
