const express = require("express");
const router = express.Router();
const { authVerifyToken } = require("../middlewares/authVerifyToken");
const { attendanceController } = require("../controllers");

router.post("/log", authVerifyToken, attendanceController.logAttendance);
router.get(
  "/getAttendance",
  authVerifyToken,
  attendanceController.getAttendance
);
module.exports = router;
