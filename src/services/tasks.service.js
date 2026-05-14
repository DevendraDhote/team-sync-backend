const Task = require("../models/task.model");
const ApiError = require("../utils/ApiError");

let createTaskService = async (data, empId) => {
  let task = await Task.create({
    ...data,
    createdBy: empId,
  });
  return task;
};

let getAllTasksService = async (query, employee) => {
  let page = Number(query.page) || 1;
  let limit = Number(query.limit) || 10;
  let skip = (page - 1) * limit;

  let search = query.search || "";

  let status = query.status || "";

  let priority = query.priority || "";

  let assignedTo = query.assignedTo || "";

  let filter = {};

  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (status) {
    filter.status = status;
  }

  if (employee.role === "employee") {
    filter.assignedTo = employee._id;
  }

  if (priority) {
    filter.priority = priority;
  }

  if (assignedTo) {
    filter.assignedTo = assignedTo;
  }

  let tasks = await Task.find(filter)
    .populate("assignedTo", "name email role")
    .populate("createdBy", "name email")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  let totalTasks = await Task.countDocuments(filter);

  return {
    tasks,
    pagination: {
      total: totalTasks,
      page,
      limit,
      totalPages: Math.ceil(totalTasks / limit),
    },
  };
};

let singleTaskService = async (taskId) => {
  let task = await Task.findById(taskId);

  return task;
};

let updateTaskService = async (taskId, status, employee) => {
  let task = await Task.findById(taskId);

  if (!task) throw new ApiError(404, "Task not found");

  if (
    employee.role === "employee" &&
    task.assignedTo.toString() !== employee._id.toString()
  )
    throw new ApiError(403, "you can only update your assigned tasks");

  task.status = status;
  await task.save();

  return task;
};

let deleteTaskService = async (taskId) => {
  await Task.findByIdAndDelete(taskId);
  return null;
};

let assignTaskService = async (taskId, assignedTo) => {
  let task = await Task.findById(taskId);

  if (!task) throw new ApiError(404, "Task not found");

  task.assignedTo = assignedTo;

  await task.save();
  return task;
};

let kanbanService = async (employee) => {
  console.log("wertqwascbasry8457239rhqwiry2345892679o");
  let filter = {};

  if (employee.role === "employee") {
    filter.assignedTo = employee._id;
  }

  let tasks = await Task.find(filter)
    .populate("assignedTo", "name email")
    .sort({ createdAt: -1 });

  return {
    todo: tasks.filter((task) => task.status === "todo"),
    inProgress: tasks.filter((task) => task.status === "in-progress"),
    completed: tasks.filter((task) => task.status === "completed"),
  };
};

let taskAnalyticService = async (employee) => {
  let matchStage = {};

  if (employee.role === "employee") {
    matchStage.assignedTo = employee._id;
  }

  let analytics = await Task.aggregate([
    {
      $match: matchStage,
    },

    {
      $facet: {
        totalTasks: [
          {
            $count: "count",
          },
        ],

        tasksByStatus: [
          {
            $group: {
              _id: "$status",

              count: {
                $sum: 1,
              },
            },
          },
        ],

        tasksByPriority: [
          {
            $group: {
              _id: "$priority",

              count: {
                $sum: 1,
              },
            },
          },
        ],

        // Completed Tasks

        completedTasks: [
          {
            $match: {
              status: "completed",
            },
          },

          {
            $count: "count",
          },
        ],

        // Pending Tasks

        pendingTasks: [
          {
            $match: {
              status: {
                $ne: "completed",
              },
            },
          },

          {
            $count: "count",
          },
        ],
      },
    },
  ]);

  return analytics[0];
};

module.exports = {
  createTaskService,
  getAllTasksService,
  singleTaskService,
  updateTaskService,
  deleteTaskService,
  assignTaskService,
  kanbanService,
  taskAnalyticService,
};
