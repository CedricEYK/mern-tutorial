const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Add a name"],
    },
    email: {
      type: String,
      required: [true, "Add a email"],
    },
    password: {
      type: String,
      required: [true, "Add a password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
