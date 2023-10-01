const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    faceImageURL: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
