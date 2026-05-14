let express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  createDepartmentController,
  getDepartmentsController,
  assignEmployeesController,
  getDepartmentAnalyticsController,
} = require("../controllers/department.controller");

let router = express.Router();

router.post(
  "/create",
  authMiddleware,
  roleMiddleware("admin"),
  createDepartmentController
);

router.get("/", authMiddleware, getDepartmentsController);

router.patch(
  "/assign/:id",
  authMiddleware,
  roleMiddleware("admin"),
  assignEmployeesController
);

router.get(
  "/analytics",
  authMiddleware,
  roleMiddleware("admin"),
  getDepartmentAnalyticsController
);

module.exports = router;
