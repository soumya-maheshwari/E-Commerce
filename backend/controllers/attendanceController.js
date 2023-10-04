const Attendance = require("../models/attendanceModel");
const { ErrorHandler } = require("../middlewares/ErrorHandler");

const logAttendance = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);
    const userId = user._id;

    console.log(user);

    const { photoPath } = req.body;

    if (!userId) {
      return next(new ErrorHandler(404, "Login or Signup to continue"));
    }

    // Create a new attendance record
    const attendanceRecord = new Attendance({
      userId,
      date: new Date(),

      // photoPath,
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
    const user = req.user;
    console.log(user);
    const userId = user._id;

    console.log(user);

    const { photoPath } = req.body;

    if (!userId) {
      return next(new ErrorHandler(404, "Login or Signup to continue"));
    }

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
