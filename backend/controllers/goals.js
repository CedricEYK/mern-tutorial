const asyncHandler = require("express-async-handler");

//* desc Create goal
//* route POST /
//* access Private to user
exports.createGoal = asyncHandler((req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("add a text field");
  }

  res.status(200).json({
    msg: "Set goals!",
  });
});

//* desc Get all goals
//* route GET /api/goals
//* access Private to user
exports.readGoals = asyncHandler((req, res) => {
  console.log(req.body);
  res.status(200).json({
    msg: "Get all goals!",
  });
});

//* desc Get one goal
//* route GET /api/goals/:id
//* access Private to user
exports.readGoal = asyncHandler((req, res) => {
  if (!req.body.id) {
    res.status(400);
    throw new Error("No id field");
  }

  res.status(200).json({
    msg: `Get one goal ${req.params.id}`,
  });
});

//* desc Update one goal
//* route PUT /api/goals/:id
//* access Private to user
exports.updateGoal = asyncHandler((req, res) => {
  if (!req.body.id) {
    res.status(400);
    throw new Error("No id field");
  }

  res.status(200).json({
    msg: `Update goal ${req.params.id}`,
  });
});

//* desc Delete one goal
//* route DELETE /api/goals/:id
//* access Private to user
exports.deleteGoal = asyncHandler((req, res) => {
  if (!req.body.id) {
    res.status(400);
    throw new Error("No id field");
  }

  res.status(200).json({
    msg: `Delete goal ${req.params.id}`,
  });
});
