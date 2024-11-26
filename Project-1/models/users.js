const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema(
    {
      first_name: {
        type: String,
        required: true,
      },
      last_name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
      },
      JobTitle: {
        type: String,
      },
      Gender: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

  const User = mongoose.model("user", userSchema);

  module.exports = User;