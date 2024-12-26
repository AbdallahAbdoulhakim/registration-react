const express = require("express");
const {
  createUser,
  loginUser,
  getUsers,
  refreshToken,
  logoutUser,
} = require("../controller/userControl");

const {
  loginMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all", loginMiddleware, adminMiddleware, getUsers);
router.get("/refresh", refreshToken);
router.get("/logout", logoutUser);

module.exports = router;
