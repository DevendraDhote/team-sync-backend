const {
  createDepartmentService,
  getDepartmentsService,
  assignEmployeesService,
  getDepartmentAnalyticsService,
} = require("../services/department.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

let createDepartmentController = asyncHandler(async (req, res) => {
  let department = await createDepartmentService(req.body);

  res
    .status(201)
    .json(new ApiResponse(201, "Department created successfully", department));
});

let getDepartmentsController = asyncHandler(async (req, res) => {
  let departments = await getDepartmentsService();

  res
    .status(200)
    .json(new ApiResponse(200, "Department fetched successfully", departments));
});

let assignEmployeesController = asyncHandler(async (req, res) => {
  let { employees } = req.body;

  let department = await assignEmployeesService(req.params.id, employees);
  res
    .status(200)
    .json(new ApiResponse(200, "Employee assigned to task", department));
});

const getDepartmentAnalyticsController = asyncHandler(async (req, res) => {
  const analytics = await getDepartmentAnalyticsService();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Department analytics fetched successfully",
        analytics
      )
    );
});

module.exports = {
  createDepartmentController,
  getDepartmentsController,
  assignEmployeesController,
  getDepartmentAnalyticsController,
};
