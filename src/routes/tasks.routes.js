let express = require("express");
const {
  createTaskController,
  getAllTasksController,
  singleTaskController,
  updateTaskStatusController,
  deleteTaskController,
  assignTaskController,
  kanbanController,
  analyticsController,
} = require("../controllers/tasks.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

let router = express.Router();

// 1. Create Task
// 2. Get All Tasks
// 3. Get Single Task
// 4. Update Task
// 5. Delete Task
// 6. Assign Employee
// 7. Update Task Status
// 8. Filter Tasks
// 9. Task Analytics
// 10. Kanban Board Data

router.post(
  "/create",
  authMiddleware,
  roleMiddleware("admin"),
  createTaskController
);

router.get("/kanban", authMiddleware, kanbanController);
router.get("/analytics", authMiddleware, analyticsController);

router.get("/", authMiddleware, getAllTasksController);
router.get("/:taskId", authMiddleware, singleTaskController);
router.patch("/status/:taskId", authMiddleware, updateTaskStatusController);
router.delete("/delete/:taskId", authMiddleware, deleteTaskController);
router.patch(
  "/assign/:taskId",
  authMiddleware,
  roleMiddleware("admin"),
  assignTaskController
);


module.exports = router;
