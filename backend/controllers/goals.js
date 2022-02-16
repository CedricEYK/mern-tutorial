const asyncHandler = require("express-async-handler");
const Goal = require("../models/goal");

//* desc Create goal
//* route POST /
//* access Private to user
exports.createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("add a text field");
  }

  const goal = await Goal.create({ text: req.body.text });
  res.status(200).json(goal);
});

//* desc Get all goals
//* route GET /api/goals
//* access Private to user
exports.readGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find().lean();
  res.status(200).json(goals);
});

//* desc Get one goal
//* route GET /api/goals/:id
//* access Private to user
exports.readGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  res.status(200).json(goal);
});

//* desc Update one goal
//* route PUT /api/goals/:id
//* access Private to user
exports.updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateGoal);
});

//* desc Delete one goal
//* route DELETE /api/goals/:id
//* access Private to user
exports.deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  } else {
    await goal.remove();
  }

  res.status(200).json({
    id: req.params.id,
  });
});
