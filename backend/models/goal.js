const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema(
  {
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
