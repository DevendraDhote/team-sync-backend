const Department = require("../models/department.model");
const ApiError = require("../utils/ApiError");

const createDepartmentService = async (data) => {
  let existingDepartment = await Department.findOne({ name: data.name });
  if (existingDepartment) throw new ApiError(409, "department already exists");
  let department = await Department.create(data);

  return department;
};

const getDepartmentsService = async () => {
  let departments = await Department.find()
    .populate("manager", "name email")
    .populate("employees", "name email role")
    .sort({ createdAt: -1 });

  return departments;
};

const assignEmployeesService = async (departmentId, employees) => {
  let department = await Department.findByIdAndUpdate(
    departmentId,
    {
      $addToSet: {
        employees: {
          $each: employees,
        },
      },
    },
    {
      new: true,
    }
  );

  if (!department) throw new ApiError(404, "Department not found");

  return department;
};

const getDepartmentAnalyticsService = async () => {
  const analytics = await Department.aggregate([
    // Join Employees

    {
      $lookup: {
        from: "employees",

        localField: "employees",

        foreignField: "_id",

        as: "employeeDetails",
      },
    },

    // Join Manager

    {
      $lookup: {
        from: "employees",

        localField: "manager",

        foreignField: "_id",

        as: "managerDetails",
      },
    },

    // Add Counts

    {
      $addFields: {
        totalEmployees: {
          $size: "$employees",
        },

        manager: {
          $arrayElemAt: ["$managerDetails", 0],
        },
      },
    },

    // Clean Response

    {
      $project: {
        name: 1,

        description: 1,

        totalEmployees: 1,

        "manager.name": 1,

        "manager.email": 1,
      },
    },
  ]);

  return analytics;
};

module.exports = {
  createDepartmentService,
  getDepartmentsService,
  assignEmployeesService,
  getDepartmentAnalyticsService,
};
