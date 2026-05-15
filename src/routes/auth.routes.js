let express = require("express");
const {
  registerController,
  loginController,
  getAccessTokenController,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "loggedIn user",
    user: req.employee,
  });
});

router.get("/get-accessToken", getAccessTokenController);

router.post("/register", registerController);

router.post("/login", loginController);

module.exports = router;
