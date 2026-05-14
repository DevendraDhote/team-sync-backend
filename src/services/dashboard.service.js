const Task = require("../models/task.model");

let dashboardStatsService = async (employee) => {
  let taskMatchStage = {};

  if (employee.role === "employee") {
    taskMatchStage.assignedTo = employee._id;
  }

  let totalEmployees = await Task.countDocuments();

  let totalTasks = await Task.countDocuments(taskMatchStage);

  let completedTask = await Task.countDocuments({
    ...taskMatchStage,
    status: "completed",
  });

  let pendingTask = await Task.countDocuments({
    ...taskMatchStage,
    status: {
      $ne: "completed",
    },
  });

  let recentTasks = await Task.find(taskMatchStage)
    .populate("assignedTo", "name email")
    .sort({ createdAt: -1 })
    .limit(5);

  return {
    totalEmployees,
    totalTasks,
    completedTask,
    pendingTask,
    recentTasks,
  };
};

module.exports = {
  dashboardStatsService,
};
