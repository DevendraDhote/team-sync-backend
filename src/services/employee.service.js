const Employee = require("../models/employee.model");
const ApiError = require("../utils/ApiError");

let allEmployeeService = async (query) => {
  let page = Number(query.page) || 1;
  let limit = Number(query.limit) || 20;

  let skip = (page - 1) * limit;

  // FILTER VALUES
  let search = query.search || "";
  let role = query.role || "";
  let department = query.department || "";
  let status = query.status || "";

  // DYNAMIC FILTER OBJECT
  let filter = {};

  // SEARCH FILTER
  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }

  // ROLE FILTER
  if (role) {
    filter.role = role;
  }

  // DEPARTMENT FILTER
  if (department) {
    filter.department = department;
  }

  // STATUS FILTER
  if (status) {
    filter.status = status;
  }

  // FETCH EMPLOYEES
  let employees = await Employee.find(filter)
    .select("-password")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  // TOTAL COUNT
  let totalEmployees = await Employee.countDocuments(filter);

  return {
    employees,

    pagination: {
      total: totalEmployees,
      page,
      limit,
      totalPages: Math.ceil(totalEmployees / limit),
    },
  };
};

let singleEmployeeService = async (empId) => {
  if (!empId) throw new ApiError(404, "employee id not found");

  let employee = await Employee.findById(empId);

  if (!employee) throw new ApiError(404, "Employee not exists");

  return {
    employee,
  };
};

let createEmployeeService = async (data) => {
  if (!data) throw new ApiError(400, "all fields are required");

  let existingEmployee = await Employee.findOne({
    email: data.email,
  });

  if (existingEmployee)
    throw new ApiError(409, "Employee already exists with this email");

  let employee = await Employee.create(data);

  return {
    employee,
  };
};

let updateEmployeeService = async (empId, data) => {
  let employee = await Employee.findByIdAndUpdate(empId, data, {
    new: true,
  }).select("-password");

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  return {
    employee,
  };
};

let deleteEmployeeService = async (empId) => {
  let employee = await Employee.findByIdAndDelete(empId);

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  return null;
};

module.exports = {
  allEmployeeService,
  singleEmployeeService,
  createEmployeeService,
  updateEmployeeService,
  deleteEmployeeService,
};
