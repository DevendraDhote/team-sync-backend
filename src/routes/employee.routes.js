let express = require("express");
const {
  getAllEmployeeController,
  getSingleEmployeeController,
  createEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
  uploadProfileController,
} = require("../controllers/employee.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");

let router = express.Router();

// 1. Get All Employees
// 2. Get Single Employee
// 3. Create Employee
// 4. Update Employee
// 5. Delete Employee
// 6. Search Employees
// 7. Pagination
// 8. Filtering

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAllEmployeeController
);
router.get("/:empId", authMiddleware, getSingleEmployeeController);

router.post(
  "/create",
  authMiddleware,
  roleMiddleware("admin"),
  createEmployeeController
);

router.post(
  "upload-profile",
  authMiddleware,
  upload.single("avatar"),
  uploadProfileController
);

router.patch(
  "/update/:empId",
  authMiddleware,
  roleMiddleware("admin"),
  updateEmployeeController
);

router.delete(
  "/delete/:empId",
  authMiddleware,
  roleMiddleware("admin"),
  deleteEmployeeController
);

module.exports = router;
