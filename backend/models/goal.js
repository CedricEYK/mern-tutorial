const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goals", GoalSchema);
