const {
  createTaskService,
  getAllTasksService,
  singleTaskService,
  updateTaskService,
  deleteTaskService,
  assignTaskService,
  kanbanService,
  taskAnalyticService,
} = require("../services/tasks.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

let createTaskController = asyncHandler(async (req, res) => {
  let task = await createTaskService(req.body, req.employee._id);

  res.status(201).json(new ApiResponse(201, "Task created successfully", task));
});

let getAllTasksController = asyncHandler(async (req, res) => {
  let result = await getAllTasksService(req.query, req.employee);

  res
    .status(200)
    .json(new ApiResponse(200, "Task fetched successfully", result));
});

let singleTaskController = asyncHandler(async (req, res) => {
  let task = await singleTaskService(req.params.taskId);

  res.status(200).json(new ApiResponse(200, "Task fetched successfully", task));
});

let updateTaskStatusController = asyncHandler(async (req, res) => {
  let { status } = req.body;

  let updatedTask = await updateTaskService(
    req.params.taskId,
    status,
    req.employee
  );
  res
    .status(200)
    .json(
      new ApiResponse(200, "Task status updated successfully", updatedTask)
    );
});

let deleteTaskController = asyncHandler(async (req, res) => {
  await deleteTaskService(req.params.taskId);

  res.status(200).json(new ApiResponse(200, "Task deleted successfully"));
});

let assignTaskController = asyncHandler(async (req, res) => {
  let { assignedTo } = req.body;

  let task = await assignTaskService(req.params.taskId, assignedTo);

  res
    .status(200)
    .json(new ApiResponse(200, "Task assigned successfully", task));
});

let kanbanController = asyncHandler(async (req, res) => {
  console.log("------------------debug reached--------------------------");

  let tasks = await kanbanService(req.employee);

  res.status(200).json(new ApiResponse(200, "Kanban tasks fetched", tasks));
});

let analyticsController = asyncHandler(async (req, res) => {
  let analytics = await taskAnalyticService(req.employee);

  res
    .status(200)
    .json(
      new ApiResponse(200, "Task analytics fetched successfully", analytics)
    );
});

module.exports = {
  createTaskController,
  getAllTasksController,
  singleTaskController,
  updateTaskStatusController,
  deleteTaskController,
  assignTaskController,
  kanbanController,
  analyticsController,
};
