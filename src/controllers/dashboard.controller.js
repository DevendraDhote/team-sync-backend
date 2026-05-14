const { dashboardStatsService } = require("../services/dashboard.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

let getDashboardStatsController = asyncHandler(async (req, res) => {
  let stats = await dashboardStatsService(req.employee);

  res.status(200).json(new ApiResponse(200, "Dashboard stats fetched", stats));
});

module.exports = {
  getDashboardStatsController,
};
