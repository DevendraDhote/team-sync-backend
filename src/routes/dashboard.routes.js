let express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getDashboardStatsController,
} = require("../controllers/dashboard.controller");

let router = express.Router();

router.get("/stats", authMiddleware, getDashboardStatsController);

module.exports = router;
