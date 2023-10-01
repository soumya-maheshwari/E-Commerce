const Attendance = require("../models/attendanceModel");
const { ErrorHandler } = require("../middlewares/ErrorHandler");

const logAttendance = async (req, res, next) => {
  try {
    const { userId, photoPath } = req.body;

    if (!userId) {
      return next(new ErrorHandler(404, "Login or Signup to continue"));
    }

    if (!photoPath) {
      return next(new ErrorHandler(404, "profile photo not found"));
    }
    // Create a new attendance record
    const attendanceRecord = new Attendance({
      userId,
      datetime: new Date(),
      photoPath,
    });
    await attendanceRecord.save();

    console.log(attendanceRecord);

    return res.status(200).json({
      attendanceRecord,
      success: true,
      msg: "Attendance logged successfully",
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAttendance = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Find all attendance records for the specified user
    const attendanceRecords = await Attendance.find({ userId });

    console.log(attendanceRecords);

    return res.status(200).json({
      attendanceRecords,
      success: true,
      msg: "Displaying all attendance for a user",
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  logAttendance,
  getAttendance,
};
