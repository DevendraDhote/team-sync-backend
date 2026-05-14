const {
  allEmployeeService,
  singleEmployeeService,
  createEmployeeService,
  updateEmployeeService,
  deleteEmployeeService,
} = require("../services/employee.service");
const uploadFileService = require("../services/fileUpload.service");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

// all employee controller
let getAllEmployeeController = asyncHandler(async (req, res) => {
  let result = await allEmployeeService(req.query);

  res
    .status(200)
    .json(new ApiResponse(200, "Employees fetched successfully", result));
});

// upload employee profile avatar
let uploadProfileController = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "file is required");

  let result = await uploadFileService(req.file);

  req.employee.avatar = result.url;
  await req.employee.save();

  res
    .status(200)
    .json(new ApiResponse(200, "profile uploaded", { avatar: result.url }));
});

// get single employee controller
let getSingleEmployeeController = asyncHandler(async (req, res) => {
  let { employee } = await singleEmployeeService(req.params.empId);

  res
    .status(200)
    .json(new ApiResponse(200, "Employee fetched successfully", employee));
});

// create employee controller
let createEmployeeController = asyncHandler(async (req, res) => {
  let { employee } = await createEmployeeService(req.body);

  res
    .status(201)
    .json(new ApiResponse(201, "Employee created successfully", employee));
});

// update employee
let updateEmployeeController = asyncHandler(async (req, res) => {
  let { employee } = await updateEmployeeService(req.params.empId, req.body);

  res.status(200).json(new ApiResponse(200, "employee updated", employee));
});

// delete employee
let deleteEmployeeController = asyncHandler(async (req, res) => {
  await deleteEmployeeService(req.params.empId);

  res.status(200).json(new ApiResponse(200, "employee deleted"));
});

module.exports = {
  getAllEmployeeController,
  getSingleEmployeeController,
  createEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
  uploadProfileController,
};
