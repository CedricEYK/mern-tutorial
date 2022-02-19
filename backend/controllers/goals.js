const asyncHandler = require("express-async-handler");
const Goal = require("../models/goal");
const User = require("../models/user");

//* desc Create goal
//* route POST /api/goals
//* access Private to user
exports.createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("add a text field");
  }

  const goal = await Goal.create({ user: req.user._id, text: req.body.text });
  res.status(200).json(goal);
});

//* desc Get all goals
//* route GET /api/goals
//* access Private to user
exports.readGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user._id });
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

  console.log(req.user);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  //* Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //* Match goal user with logged in user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unauthorized user");
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
  }

  //* Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //* Match goal user with logged in user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unauthorized user");
  }

  await goal.remove();

  res.status(200).json({
    id: req.params.id,
  });
});
