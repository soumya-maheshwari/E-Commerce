const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  datetime: {
    type: Date,
  },
  photoPath: {
    type: String,
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
